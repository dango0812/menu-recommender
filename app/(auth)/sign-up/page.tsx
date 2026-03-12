import type { Metadata } from 'next';

import { Button, Card, Flex, Text } from '@/components/ui';
import { ROUTES } from '@/constants/routes';

import { SignUpForm } from './sign-up-form';

export const metadata: Metadata = {
  title: '회원가입',
  description: '와구와규와 함께 맛있는 레시피를 나눠요.',
};

export default function SignUpPage() {
  return (
    <Card>
      <Flex direction="column" justifyContent="center" className="mb-8 gap-2.5">
        <Text as="h1" className="text-3xl font-bold">
          회원가입
        </Text>
        <Text className="text-slate-500">와구와규에서 함께 맛있는 레시피를 나눠요</Text>
      </Flex>

      <SignUpForm />
      <Button href={ROUTES.AUTH.SIGN_IN} as="a" color={'gray'} fullWidth className="mt-4">
        로그인을 진행하고 싶어요
      </Button>
    </Card>
  );
}
