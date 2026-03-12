import { Flex, Text } from '@/components/ui';

import { MenuRecommender } from './_components/menu-recommender';

export default function MainPage() {
  return (
    <div className="container mx-auto max-w-7xl px-5">
      <Flex direction="column" className="gap-2.5 pt-20 pb-10">
        <Text as="h1" className="text-4xl font-bold">
          메뉴 추천 받기
        </Text>
        <Text className="text-lg text-slate-500">쉽고 빠르게 추천 메뉴를 받아보세요</Text>
      </Flex>

      <MenuRecommender />
    </div>
  );
}
