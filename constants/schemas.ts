import { z } from 'zod';

export const emailSchema = z.email({ message: '올바른 이메일 형식이 아니에요' });

export const passwordSchema = z
  .string()
  .min(1, { message: '비밀번호를 입력해 주세요' })
  .min(8, { message: '8자 이상 입력해 주세요' })
  .regex(/[A-Za-z]/, { message: '영문자를 포함해야 해요' })
  .regex(/[0-9]/, { message: '숫자를 포함해야 해요' })
  .regex(/[^A-Za-z0-9]/, { message: '특수문자를 포함해야 해요' });

export const nameSchema = z
  .string()
  .min(1, { message: '이름을 입력해 주세요' })
  .min(2, { message: '이름은 2자 이상 입력해야 해요' });

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export type SignInFormSchema = z.infer<typeof signInSchema>;
export type SignUpFormSchema = z.infer<typeof signUpSchema>;
