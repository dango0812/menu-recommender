import { use } from 'react';

import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Card, Flex, Lottie, Text } from '@/components/ui';
import { ROUTES } from '@/constants/routes';

interface VerifyEmailPageProps {
  searchParams: Promise<{
    email?: string;
  }>;
}

export default function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
  const { email } = use(searchParams);

  if (!email) {
    redirect(ROUTES.AUTH.SIGN_UP);
  }
  return (
    <main className="flex h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-md">
        <Card>
          <Flex alignItems="center" justifyContent="center">
            <Lottie src="/lotties/email-successfully-sent.json" className="w-48" />
          </Flex>
          <Flex direction="column" alignItems="center" className="gap-4 text-center">
            <Text as="h1" className="text-2xl font-bold">
              메일을 확인해 주세요
            </Text>
            <Text className="text-slate-500">
              가입하신 이메일로 인증 메일을 발송했어요.
              <br />
              메일함을 확인하고 인증을 완료해 주세요.
            </Text>
            <Text className="text-sm text-slate-400">메일이 오지 않았다면 스팸 폴더를 확인해 주세요.</Text>
            <Link href={ROUTES.AUTH.SIGN_IN} className="mt-2 text-sm text-slate-500 underline underline-offset-4">
              로그인 페이지로 이동
            </Link>
          </Flex>
        </Card>
      </div>
    </main>
  );
}
