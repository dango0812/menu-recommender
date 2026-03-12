import { compare } from 'bcryptjs';
import NextAuth, { type NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import prisma from '@/lib/prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: '이메일', type: 'email' },
        password: { label: '비밀번호', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('이메일과 비밀번호를 입력해 주세요.');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        // 계정 존재를 유추할 수 없도록 같은 에러 반환
        if (!user || !user.password) {
          throw new Error('이메일 또는 비밀번호를 확인해 주세요.');
        }

        const isCorrectPassword = await compare(credentials.password as string, user.password);
        if (!isCorrectPassword) {
          throw new Error('비밀번호를 확인해 주세요.');
        }

        if (!user.emailVerified) {
          throw new Error('이메일 확인이 완료되지 않았어요.');
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, id: token.id ?? user?.id };
    },
    async session({ session, token }) {
      return { ...session, user: { ...session.user, id: token.id as string } };
    },
  },
} satisfies NextAuthConfig);
