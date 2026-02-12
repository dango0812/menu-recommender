import { Sparkles } from 'lucide-react';

import { Button, Card, Flex, Lottie, Text } from '@/components/base';

export function DeliveryFoodPanel() {
  return (
    <>
      <Flex direction="column" alignItems="center" justifyContent="center">
        <Lottie src="/lotties/motorcycle-delivery.json" className="h-40 w-40 sm:h-60 sm:w-60" />
      </Flex>

      <Flex direction="column" justifyContent="center" className="mt-4 w-full space-y-3">
        <Card className="border-transparent bg-gray-50">
          <Flex alignItems="center" justifyContent="space-between" className="flex-wrap gap-4">
            <Flex direction="column" alignItems="center" className="w-full gap-2.5 text-center">
              <Text as="span" className="font-semibold whitespace-pre-line text-gray-800">
                {`준비 중인 서비스예요!\n최대한 빠르게 완성해서 찾아뵐게요 :)`}
              </Text>
            </Flex>
          </Flex>
        </Card>

        <Flex direction="column" alignItems="center" justifyContent="center" className="mt-5 gap-2.5">
          <Button startDecorator={<Sparkles />} fullWidth size="lg" disabled>
            배달 음식 추천받기
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
