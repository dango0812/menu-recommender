'use server';

import { AuthError } from 'next-auth';

import { signIn } from '@/auth';
import { type SignInFormSchema, signInSchema } from '@/constants/schemas/auth';

interface SignInResult {
  success?: boolean;
  error?: string;
}

export async function signInAction(data: SignInFormSchema): Promise<SignInResult> {
  // 서버 사이드 형식 검사
  const validatedFields = signInSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: '이메일 또는 비밀번호를 확인해 주세요.' };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    return { success: true };
  } catch (e) {
    if (e instanceof AuthError) {
      return { error: e.cause?.err?.message ?? '로그인에 실패했어요.' };
    }
    return { error: '로그인 중 문제가 발생했어요.' };
  }
}
