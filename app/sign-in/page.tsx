import { Card, Flex, Text } from '@/components/ui';

export default function SignInPage() {
  return (
    <main className="flex flex-1 items-center justify-center bg-background p-6">
      <div className="w-full max-w-md">
        <Card>
          <Flex direction="column" justifyContent="center" className="mb-8 gap-2.5">
            <Text as="h1" className="text-3xl font-bold">
              로그인
            </Text>
            <Text className="text-slate-500">우리와 함께 맛있는 레시피를 나눠요</Text>
          </Flex>
          SignInPage
        </Card>
      </div>
    </main>
  );
}
