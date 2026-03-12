import Image from 'next/image';
import Link from 'next/link';

import { Chip, Flex, Text } from '@/components/ui';

import { MenuRecommender } from './_components/menu-recommender';

export default function MainPage() {
  return (
    <div className="container mx-auto max-w-7xl px-5 py-15">
      <Flex direction="column" className="mb-10 gap-2.5">
        <Text as="h1" className="flex items-center text-4xl font-bold">
          <Text className="text-primary">와구</Text>와규 서비스
        </Text>
        <Text className="text-lg text-slate-500">맛있게, 쉽고 간단하게!</Text>
      </Flex>
      <MenuRecommender />

      <Flex direction="column" className="gap-10">
        <Text as="h3" className="mt-10 text-3xl font-bold">
          오늘의 추천 메뉴
        </Text>

        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {[...Array(4)].map((_, idx) => (
            <Link key={idx} href="#">
              <Flex direction="column" className="gap-2.5">
                <div className="relative aspect-square overflow-hidden rounded-3xl sm:aspect-video">
                  <Image
                    src="/images/sample-food.png"
                    alt={`food-${idx + 1}`}
                    fill
                    loading="lazy"
                    className="object-cover"
                  />
                  {idx === 0 && (
                    <Chip
                      size={'sm'}
                      className="absolute top-2.5 right-3 cursor-default text-xs font-bold text-primary"
                      color={'light'}
                    >
                      TOP3
                    </Chip>
                  )}
                </div>
                <Flex direction="column" className="gap-1 px-1">
                  <Text className="font-semibold">한우 불고기 정식</Text>
                  <Text className="text-sm text-gray-500">간단한 설명이 들어가는 자리입니다.</Text>
                </Flex>
              </Flex>
            </Link>
          ))}
        </div>
      </Flex>
    </div>
  );
}
