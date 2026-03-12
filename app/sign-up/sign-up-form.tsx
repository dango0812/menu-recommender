'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Mail, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { RHFFormProvider, RHFInput } from '@/components/common/react-hook-form';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { type SignUpFormSchema, signUpSchema } from '@/constants/schemas';

import { signUpAction } from './action';

export function SignUpForm() {
  const router = useRouter();
  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignUpFormSchema) => {
    const result = await signUpAction(data);
    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success('이메일 확인 메일이 발송됐어요');
    router.push(`${ROUTES.AUTH.VERIFY_EMAIL}?email=${encodeURIComponent(data.email)}`);
  };

  return (
    <RHFFormProvider form={form} onSubmit={onSubmit} className="flex w-full flex-col gap-4">
      <RHFInput<SignUpFormSchema>
        name="name"
        type="text"
        placeholder="이름"
        autoComplete="name"
        fullWidth
        startDecorator={<User size={16} />}
      />
      <RHFInput<SignUpFormSchema>
        name="email"
        type="email"
        placeholder="이메일"
        autoComplete="email"
        fullWidth
        startDecorator={<Mail size={16} />}
      />
      <RHFInput<SignUpFormSchema>
        name="password"
        type="password"
        placeholder="비밀번호"
        autoComplete="new-password"
        fullWidth
        startDecorator={<Lock size={16} />}
      />
      <Button type="submit" fullWidth loading={form.formState.isSubmitting} className="mt-2">
        회원가입
      </Button>
    </RHFFormProvider>
  );
}
