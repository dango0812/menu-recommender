'use client';

import { useState } from 'react';

import { Soup, UtensilsCrossed } from 'lucide-react';

import { Button, Chip, Flex, Slider, Switch, Text } from '@/components/ui';

export function HomeMealTab() {
  const [sideDishCount, setSideDishCount] = useState(3);
  const [includeSoup, setIncludeSoup] = useState(true);

  return (
    <Flex direction="column" className="gap-5">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        className="gap-5 rounded-2xl border border-primary/5 bg-primary-light p-5"
      >
        <Flex alignItems="center" className="gap-3">
          <Flex
            alignItems="center"
            justifyContent="center"
            className="flex h-10 w-10 shrink-0 rounded-full bg-primary/10 max-[500px]:hidden"
          >
            <Soup size={20} className="text-primary" />
          </Flex>

          <Flex direction="column" className="gap-1">
            <Text className="font-semibold text-gray-700">국/찌개 포함</Text>
            <Text className="text-sm text-gray-500">맛있는 국이나 찌개를 추가할까요?</Text>
          </Flex>
        </Flex>
        <Switch checked={includeSoup} onCheckedChange={setIncludeSoup} />
      </Flex>
      <Flex direction="column" className="gap-3">
        <Flex alignItems="center" justifyContent="space-between">
          <Text className="font-semibold text-gray-700">희망 반찬 개수</Text>
          <Chip size={'sm'} className="bg-primary/10 text-xs font-bold text-primary">
            {sideDishCount}개
          </Chip>
        </Flex>
        <Slider min={1} max={5} step={1} value={sideDishCount} onChange={setSideDishCount} />
        <Flex alignItems="center" justifyContent="space-between">
          {[...Array(5)].map((_, idx) => (
            <Text key={idx} className="text-xs text-gray-500">
              {idx + 1}개
            </Text>
          ))}
        </Flex>
      </Flex>
      <Flex alignItems="center" justifyContent="center" className="mt-2.5">
        <Button fullWidth startDecorator={<UtensilsCrossed size={20} />} className="max-w-60">
          집밥 메뉴 추천받기
        </Button>
      </Flex>
    </Flex>
  );
}
