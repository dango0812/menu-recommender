import type { Metadata } from 'next';

import { Flex, Text } from '@/components/ui';

import { RecipePostForm } from './recipe-post-form';

export const metadata: Metadata = {
  title: '레시피 만들기 | 와구와규',
  description: '맛있는 레시피의 재료와 조리 과정을 작성해 주세요.',
};

export default function RecipePostPage() {
  return (
    <div className="container mx-auto max-w-3xl px-5 py-15">
      <Flex direction="column" className="mb-5 gap-1.5">
        <Text as="h1" className="text-3xl font-bold text-gray-800">
          레시피 만들기
        </Text>
        <Text className="text-slate-500">맛있는 레시피의 재료와 조리 과정을 작성해 주세요.</Text>
      </Flex>

      <RecipePostForm />
    </div>
  );
}
