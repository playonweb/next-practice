/**
 * Prisma client with adapter autodetection:
 *
 * - If DATABASE_URL is present                           → @prisma/adapter-neon
 * - If DATABASE_URL is absent                            → prisma-pglite (local file DB)
 */

import { PrismaClient } from '../generated/prisma/client';
import path from 'node:path';

async function createAdapter() {
  const url = process.env.DATABASE_URL;

  const useNeon = !!url;

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
