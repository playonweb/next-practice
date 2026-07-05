import { kv } from '@vercel/kv';
import { put, list, del } from '@vercel/blob';
import fs from 'fs/promises';
import path from 'path';

const IS_PROD = process.env.NODE_ENV === 'production';
const USE_VERCEL_KV = IS_PROD && !!process.env.KV_REST_API_URL && !!process.env.KV_REST_API_TOKEN;
const USE_VERCEL_BLOB = IS_PROD && !!process.env.BLOB_READ_WRITE_TOKEN;

const LOCAL_KV_PATH = path.join(process.cwd(), '.data', 'kv.json');
const LOCAL_BLOB_DIR = path.join(process.cwd(), '.data', 'blob');

// Helper to ensure local directories exist
async function ensureLocalDirs() {
  if (USE_VERCEL_KV && USE_VERCEL_BLOB) return;
  await fs.mkdir(LOCAL_BLOB_DIR, { recursive: true });
  try {
    await fs.access(LOCAL_KV_PATH);
  } catch {
    await fs.writeFile(LOCAL_KV_PATH, '{}', 'utf-8');
  }
}

export const kvStorage = {
  async getItem<T>(key: string): Promise<T | null> {
    if (USE_VERCEL_KV) {
      return await kv.get<T>(key);
    }
    await ensureLocalDirs();
    const data = JSON.parse(await fs.readFile(LOCAL_KV_PATH, 'utf-8'));
    return data[key] ?? null;
  },
  async setItem(key: string, value: any): Promise<void> {
    if (USE_VERCEL_KV) {
      await kv.set(key, value);
      return;
    }
    await ensureLocalDirs();
    const data = JSON.parse(await fs.readFile(LOCAL_KV_PATH, 'utf-8'));
    data[key] = value;
    await fs.writeFile(LOCAL_KV_PATH, JSON.stringify(data, null, 2), 'utf-8');
  },
  async removeItem(key: string): Promise<void> {
    if (USE_VERCEL_KV) {
      await kv.del(key);
      return;
    }
    await ensureLocalDirs();
    const data = JSON.parse(await fs.readFile(LOCAL_KV_PATH, 'utf-8'));
    delete data[key];
    await fs.writeFile(LOCAL_KV_PATH, JSON.stringify(data, null, 2), 'utf-8');
  }
};

export const blobStorage = {
  async setItem(key: string, value: string | Buffer): Promise<void> {
    if (USE_VERCEL_BLOB) {
      await put(`blobs/${key}`, value, { access: 'private', addRandomSuffix: false, allowOverwrite: true });
      return;
    }
    await ensureLocalDirs();
    await fs.writeFile(path.join(LOCAL_BLOB_DIR, key.replace(/\//g, '_')), value);
  },
  async getMeta(key: string) {
    if (USE_VERCEL_BLOB) {
      const { blobs } = await list({ prefix: `blobs/${key}`, limit: 1 });
      if (blobs.length > 0 && blobs[0].pathname === `blobs/${key}`) {
        return blobs[0];
      }
      return null;
    }
    await ensureLocalDirs();
    try {
      const stat = await fs.stat(path.join(LOCAL_BLOB_DIR, key.replace(/\//g, '_')));
      return { url: null, size: stat.size, pathname: key, downloadUrl: null };
    } catch {
      return null;
    }
  },
  async getItem(key: string): Promise<string | null> {
    if (USE_VERCEL_BLOB) {
      const meta = await this.getMeta(key);
      if (!meta || !meta.downloadUrl) return null;
      const res = await fetch(meta.downloadUrl);
      if (!res.ok) return null;
      return await res.text();
    }
    await ensureLocalDirs();
    try {
      return await fs.readFile(path.join(LOCAL_BLOB_DIR, key.replace(/\//g, '_')), 'utf-8');
    } catch {
      return null;
    }
  },
  async getItemRaw(key: string): Promise<Buffer | null> {
    if (USE_VERCEL_BLOB) {
      const meta = await this.getMeta(key);
      if (!meta || !meta.downloadUrl) return null;
      const res = await fetch(meta.downloadUrl);
      if (!res.ok) return null;
      return Buffer.from(await res.arrayBuffer());
    }
    await ensureLocalDirs();
    try {
      return await fs.readFile(path.join(LOCAL_BLOB_DIR, key.replace(/\//g, '_')));
    } catch {
      return null;
    }
  },
  async removeItem(key: string): Promise<void> {
    if (USE_VERCEL_BLOB) {
      const meta = await this.getMeta(key);
      if (meta && meta.url) {
        await del(meta.url);
      }
      return;
    }
    await ensureLocalDirs();
    try {
      await fs.unlink(path.join(LOCAL_BLOB_DIR, key.replace(/\//g, '_')));
    } catch {
      // ignore
    }
  }
};
