import { PrismaClient } from '../generated/prisma/client';
import { createPgliteAdapter } from 'prisma-pglite';

const adapter = await createPgliteAdapter({
  dbParentDirPath: './pgdata',
});

const prisma = new PrismaClient({ adapter });

export default prisma;
