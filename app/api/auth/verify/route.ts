import { NextRequest, NextResponse } from 'next/server';

import { ROUTES } from '@/constants/routes';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.redirect(new URL(`${ROUTES.AUTH.SIGN_IN}?error=invalid`, req.url));
  }

  const verificationToken = await prisma.emailVerificationToken.findUnique({
    where: { token },
  });

  // 토큰 없음
  if (!verificationToken) {
    return NextResponse.redirect(new URL(`${ROUTES.AUTH.SIGN_IN}?error=invalid`, req.url));
  }

  // 토큰 만료
  if (verificationToken.expires_at < new Date()) {
    await prisma.emailVerificationToken.deleteMany({ where: { token } });
    return NextResponse.redirect(new URL(`${ROUTES.AUTH.SIGN_IN}?error=expired`, req.url));
  }

  // 이메일 확인 업데이트
  await prisma.user.update({
    where: { id: verificationToken.userId },
    data: { emailVerified: new Date() },
  });

  // 이메일 확인 토큰 삭제
  await prisma.emailVerificationToken.deleteMany({ where: { token } });

  return NextResponse.redirect(new URL(`${ROUTES.AUTH.SIGN_IN}?verified=true`, req.url));
}
