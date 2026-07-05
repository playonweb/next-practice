/**
 * Prisma client with adapter autodetection:
 *
 * - If DATABASE_URL points to a remote host (e.g. Neon) → @prisma/adapter-neon
 * - If DATABASE_URL is absent or localhost               → prisma-pglite (local file DB)
 *
 * Override autodetect with:
 *   DATABASE_DRIVER=neon   → always use Neon adapter
 *   DATABASE_DRIVER=pglite → always use PGlite adapter
 */

import { PrismaClient } from '../generated/prisma/client';
import path from 'node:path';

function isRemotePostgresUrl(url: string): boolean {
  try {
    const { hostname } = new URL(url);
    return (
      hostname !== 'localhost' &&
      hostname !== '127.0.0.1' &&
      hostname !== '::1'
    );
  } catch {
    return false;
  }
}

async function createAdapter() {
  const driver = process.env.DATABASE_DRIVER;
  const url = process.env.DATABASE_URL ?? '';

  const useNeon =
    driver === 'neon' ||
    (driver !== 'pglite' && isRemotePostgresUrl(url));

  if (useNeon) {
    const { PrismaNeonHttp } = await import('@prisma/adapter-neon');
    return new PrismaNeonHttp(url, { arrayMode: true, fullResults: true });
  } else {
    const { createPgliteAdapter } = await import('prisma-pglite');
    return createPgliteAdapter({
      dbParentDirPath: path.join(process.cwd(), 'pgdata'),
      prismaConfigPath: path.join(process.cwd(), 'prisma.config.ts'),
    });
  }
}

const adapter = await createAdapter();
const prisma = new PrismaClient({ adapter });

export default prisma;
