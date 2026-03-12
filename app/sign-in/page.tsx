import { Button, Card, Flex, Text } from '@/components/ui';
import { ROUTES } from '@/constants/routes';

import { SignInForm } from './sign-in-form';

export default function SignInPage() {
  return (
    <main className="flex flex-1 items-center justify-center bg-background p-6">
      <div className="w-full max-w-md">
        <Card>
          <Flex direction="column" justifyContent="center" className="mb-8 gap-2.5">
            <Text as="h1" className="text-3xl font-bold">
              로그인
            </Text>

            <Text className="text-slate-500">우리 함께 맛있는 레시피를 공유해요</Text>
          </Flex>

          <SignInForm />

          <Button href={ROUTES.AUTH.SIGN_UP} as="a" color={'gray'} fullWidth className="mt-4">
            와구와규에 합류하고 싶어요
          </Button>
        </Card>
      </div>
    </main>
  );
}
