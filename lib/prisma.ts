import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

import { env } from '@/constants/env';

import 'server-only';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

// PrismaClient 인스턴스를 전역으로 관리하여 핫 리로드 시에도 동일한 인스턴스를 사용
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: new PrismaPg({ connectionString: env.DATABASE_URL }),
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
