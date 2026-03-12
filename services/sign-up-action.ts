'use server';

import { Prisma } from '@prisma/client';
import { hash } from 'bcryptjs';
import crypto from 'crypto';
import { Resend } from 'resend';

import { env } from '@/constants/env';
import { signUpSchema } from '@/constants/schemas';
import prisma from '@/lib/prisma';
import { verificationEmail } from '@/mail-template/sign-up-verification';

interface SignUpResult {
  success?: boolean;
  error?: string;
}

const resend = new Resend(env.RESEND_API_KEY);

export async function signUpAction(data: { name: string; email: string; password: string }): Promise<SignUpResult> {
  // 서버 사이드 형식 검사
  const validatedFields = signUpSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: '필드 형식이 올바르지 않아요.' };
  }

  const { email, password, name } = validatedFields.data;

  try {
    // 비밀번호 hash salt 후 사용자 생성
    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    // 만료된 토큰 먼저 삭제
    await prisma.emailVerificationToken.deleteMany({
      where: {
        userId: user.id,
        expires_at: { lt: new Date() },
      },
    });

    // 이메일 확인 토큰 생성
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1시간

    await prisma.emailVerificationToken.create({
      data: {
        userId: user.id,
        token,
        expires_at: expiresAt,
      },
    });

    // 인증 메일 발송
    await resend.emails.send({
      from: env.RESEND_FROM_EMAIL,
      to: email,
      subject: '[와구와규] 이메일 인증을 완료해 주세요',
      html: verificationEmail({
        name,
        verificationUrl: `${env.NEXT_PUBLIC_APP_URL}/api/auth/verify?token=${token}`,
      }),
    });

    return { success: true };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return { error: '이미 사용 중인 이메일이에요.' };
      }
    }

    return { error: '회원가입 중 오류가 발생했어요.' };
  }
}
