'use client';

import { useState } from 'react';

import { UtensilsCrossed } from 'lucide-react';

import { Button, Card, Flex, Slider, Text } from '@/components/ui';

const MIN = 10000;
const MAX = 100000;
const STEP = 5000;

const formatBudget = (value: number) => (value >= MAX ? '100,000원+' : `${value.toLocaleString('ko-KR')}원`);

export function DeliveryTab() {
  const [budget, setBudget] = useState(50000);

  return (
    <Flex direction="column" className="gap-5">
      <Card className="flex flex-row items-center gap-6 py-5">
        <Flex direction="column" className="w-40 shrink-0 gap-1">
          <Text className="text-sm text-gray-400">오늘의 배달 예산</Text>
          <Text as="h3" className="text-2xl font-bold text-gray-800">
            {formatBudget(budget)}
          </Text>
        </Flex>

        <div className="h-12 w-px shrink-0 bg-gray-100" />

        <Flex direction="column" className="min-w-0 flex-1 gap-2">
          <Slider min={MIN} max={MAX} step={STEP} value={budget} onChange={setBudget} />
          <Flex justifyContent="space-between">
            <Text className="text-xs text-gray-400">10,000원</Text>
            <Text className="text-xs text-gray-400">100,000원+</Text>
          </Flex>
        </Flex>
      </Card>

      <Flex alignItems="center" justifyContent="center" className="mt-2.5">
        <Button fullWidth startDecorator={<UtensilsCrossed size={20} />} className="max-w-60">
          배달 메뉴 추천받기
        </Button>
      </Flex>
    </Flex>
  );
}
