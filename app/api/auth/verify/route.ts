import { NextRequest, NextResponse } from 'next/server';

import { ROUTES } from '@/constants/routes';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
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
      await prisma.emailVerificationToken.delete({ where: { token } });
      return NextResponse.redirect(new URL(`${ROUTES.AUTH.SIGN_IN}?error=expired`, req.url));
    }

    // 이메일 확인 업데이트 및 토큰 삭제 (트랜잭션)
    await prisma.$transaction([
      prisma.user.update({
        where: { id: verificationToken.userId },
        data: { emailVerified: new Date() },
      }),
      prisma.emailVerificationToken.delete({ where: { token } }),
    ]);

    return NextResponse.redirect(new URL(`${ROUTES.AUTH.SIGN_IN}?verified=true`, req.url));
  } catch (e) {
    return NextResponse.redirect(new URL(`${ROUTES.AUTH.SIGN_IN}?error=server`, req.url));
  }
}
