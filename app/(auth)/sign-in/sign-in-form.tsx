'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { FormHelperText } from '@/components/common/form-helper-text';
import { RHFFormProvider, RHFInput } from '@/components/common/react-hook-form';
import { Button } from '@/components/ui';
import { ROUTES } from '@/constants/routes';
import { type SignInFormSchema, signInSchema } from '@/constants/schemas/auth';

import { signInAction } from './action';

export function SignInForm() {
  const router = useRouter();

  const form = useForm<SignInFormSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { errors, isSubmitting } = form.formState;
  const rootError = errors.root;

  const onSubmit = async (data: SignInFormSchema) => {
    form.clearErrors('root');

    const result = await signInAction(data);
    if (!result.success) {
      form.setError('root', { message: result.error ?? '로그인에 실패했어요.' });
      return;
    }

    router.replace(ROUTES.HOME);
  };

  return (
    <RHFFormProvider
      form={form}
      onSubmit={onSubmit}
      className="flex w-full flex-col gap-4"
      onInput={() => form.clearErrors('root')}
    >
      <RHFInput<SignInFormSchema>
        name="email"
        type="email"
        placeholder="이메일"
        autoComplete="email"
        fullWidth
        startDecorator={<Mail size={16} />}
      />
      <RHFInput<SignInFormSchema>
        name="password"
        type="password"
        placeholder="비밀번호"
        autoComplete="current-password"
        fullWidth
        startDecorator={<Lock size={16} />}
      />

      {rootError && <FormHelperText>{rootError.message}</FormHelperText>}

      <Button type="submit" fullWidth loading={isSubmitting} className="mt-2">
        로그인
      </Button>
    </RHFFormProvider>
  );
}
