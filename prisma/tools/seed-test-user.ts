import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

// DATABASE_URL 환경 변수 설정
const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL 환경 변수가 설정되지 않았습니다.');
  process.exit(1);
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: DATABASE_URL }),
});

const SEED_USERS = [
  { name: 'verified', email: 'test@test.com', emailVerified: new Date() as Date | null },
  { name: 'unverified', email: 'untest@test.com', emailVerified: null as Date | null },
];
const SEED_PASSWORD = 'test1234!';

async function main() {
  const hashedPassword = await hash(SEED_PASSWORD, 10);

  // 이미 존재하는 이메일 조회
  const existingUsers = await prisma.user.findMany({
    where: { email: { in: SEED_USERS.map(u => u.email) } },
    select: { email: true },
  });
  const existingEmails = new Set(existingUsers.map(u => u.email));

  const newUsers = SEED_USERS.filter(u => !existingEmails.has(u.email));
  if (newUsers.length === 0) {
    console.log('❌ 모든 테스트 유저가 이미 존재합니다.');
    return;
  }

  await prisma.user.createMany({
    data: newUsers.map(u => ({ ...u, password: hashedPassword })),
  });

  console.log(`✅ 생성: ${newUsers.length}명 / 스킵: ${existingEmails.size}명`);
  console.log(`✅ 비밀번호: ${SEED_PASSWORD}`);
}

main()
  .catch(e => {
    console.error('❌ 시드 실패:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
