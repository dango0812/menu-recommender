import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';

import prisma from '@/lib/prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [], // Google, GitHub 등 추가
  session: {
    strategy: 'database',
  },
});
