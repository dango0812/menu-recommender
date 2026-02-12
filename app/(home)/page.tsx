import { Card, Flex, Text } from '@/components/base';

import { MenuRecommender } from './_components/MenuRecommender';

export default function Home() {
  return (
    <div className="px-5 pt-5 pb-6 sm:px-6 sm:pt-10">
      <Flex direction="column" alignItems="center" justifyContent="center" className="mb-5 gap-2">
        <Text as="h1" className="text-3xl font-bold tracking-tight text-gray-900">
          뭐 먹을지 고민 끝!
        </Text>
        <Text className="font-normal text-gray-500">어려운 메뉴 선택, 더 이상 고민하지 마세요</Text>
      </Flex>

      <Card round={'lg'} className="border-transparent">
        <MenuRecommender />
      </Card>
    </div>
  );
}
