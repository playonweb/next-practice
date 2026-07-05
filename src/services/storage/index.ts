import { createStorage } from 'unstorage';
import fsDriver from 'unstorage/drivers/fs';
import vercelRuntimeCacheDriver from 'unstorage/drivers/vercel-runtime-cache';
import vercelBlobDriver from 'unstorage/drivers/vercel-blob';

// Setup KV storage (Key-Value)
export const kvStorage = createStorage({
  driver: process.env.NODE_ENV === 'production'
    ? vercelRuntimeCacheDriver({base: 'kv'})
    : fsDriver({ base: './.data/kv' })
});

// Setup Blob storage (Files/Binaries)
export const blobStorage = createStorage({
  driver: process.env.NODE_ENV === 'production'
    ? vercelBlobDriver({ access: 'private' as any, base: 'blobs' })
    : fsDriver({ base: './.data/blob' })
});
