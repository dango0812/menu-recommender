'use client';

import { useCallback, useState } from 'react';

import { EggFried, Soup, Sparkles } from 'lucide-react';
import dynamic from 'next/dynamic';

import { Button, Card, Flex, Lottie, NumericSpinner, Switch, Text } from '@/components/base';
import { useBoolean } from '@/hooks/useBoolean';
import { useRecipes } from '@/hooks/useRecipes';
import { cn } from '@/lib/tailwind-merge';

const RecipeResultSheet = dynamic(() => import('../RecipeResultSheet'), {
  ssr: false,
});

export function HomeFoodPanel() {
  const [isSoupIncluded, setIsSoupIncluded] = useState(true);
  const [sideDishCount, setSideDishCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { value: isRecipeSheetOpen, onTrue: openRecipeSheet, onFalse: closeRecipeSheet } = useBoolean(false);

  const { mutate, data, isPending, error } = useRecipes({
    isSoupIncluded,
    sideDishCount,
  });

  const handleSoupToggle = useCallback((checked: boolean) => {
    setIsSoupIncluded(checked);
  }, []);

  const handleSideDishChange = useCallback((count: number) => {
    setSideDishCount(count);
  }, []);

  const handleRecommend = () => {
    if (!isSoupIncluded && sideDishCount === 0) {
      setErrorMessage('국 또는 반찬은 최소 1개 이상 선택해야 해요.');
      return;
    }

    setErrorMessage(null);
    mutate();
    openRecipeSheet();
  };

  return (
    <>
      <Flex direction="column" alignItems="center" justifyContent="center" className="my-5 hidden sm:my-10 sm:flex">
        <Lottie src="/lotties/food-carousel.json" className="h-50 w-50" />
      </Flex>

      <Flex direction="column" justifyContent="center" className="mt-4 w-full space-y-3">
        <Card className="border-transparent bg-gray-50">
          <Flex alignItems="center" justifyContent="space-between">
            <Flex alignItems="center" className="gap-2.5">
              <Flex
                alignItems="center"
                justifyContent="center"
                className="size-10 rounded-xl bg-orange-100 text-primary"
              >
                <Soup size={24} />
              </Flex>
              <Text as="span" className="font-bold text-gray-800">
                국을 포함할까요 ?
              </Text>
            </Flex>
            <Switch checked={isSoupIncluded} onCheckedChange={handleSoupToggle} disabled={isPending} />
          </Flex>
        </Card>
        <Card className="border-transparent bg-gray-50">
          <Flex alignItems="center" justifyContent="space-between" className="flex-wrap gap-4">
            <Flex alignItems="center" className="gap-2.5">
              <Flex
                alignItems="center"
                justifyContent="center"
                className="size-10 rounded-xl bg-orange-100 text-primary"
              >
                <EggFried size={24} />
              </Flex>
              <Text as="span" className="font-bold text-gray-800">
                반찬 개수를 선택해 주세요
              </Text>
            </Flex>
            <NumericSpinner
              number={sideDishCount}
              onNumberChange={handleSideDishChange}
              minNumber={0}
              maxNumber={10}
              size="md"
              fullWidth
              className="sm:w-max"
              disabled={isPending}
            />
          </Flex>
        </Card>

        <Flex direction="column" alignItems="center" justifyContent="center" className="mt-5 gap-2.5">
          <Button onClick={handleRecommend} startDecorator={<Sparkles />} fullWidth size="lg" loading={isPending}>
            집밥 추천받기
          </Button>

          <Text
            className={cn('text-center text-sm text-gray-400', {
              'text-error': errorMessage || error,
            })}
          >
            {errorMessage || error?.message || '버튼을 누르면 추천 메뉴를 확인할 수 있어요'}
          </Text>
        </Flex>
      </Flex>

      <RecipeResultSheet recipeData={data} openRecipeSheet={isRecipeSheetOpen} onCloseRecipeSheet={closeRecipeSheet} />
    </>
  );
}
