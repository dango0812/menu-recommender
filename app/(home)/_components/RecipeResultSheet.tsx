'use client';

import { ArrowRight, RotateCw } from 'lucide-react';
import Image from 'next/image';

import type { RecipeFilteredData } from '@/app/api/recipes/type';
import { Button, Card, Flex, Text } from '@/components/base';
import { BottomSheet } from '@/components/common';

interface RecipeResultSheetProps {
  recipeData?: RecipeFilteredData[];
  openRecipeSheet: boolean;
  onCloseRecipeSheet: () => void;
}

export default function RecipeResultSheet({
  recipeData = [],
  openRecipeSheet,
  onCloseRecipeSheet,
}: RecipeResultSheetProps) {
  return (
    <BottomSheet isOpen={openRecipeSheet} onClose={onCloseRecipeSheet}>
      <Flex direction="column">
        <Text as="h2" className="mb-5 text-xl font-bold tracking-tight text-gray-900 sm:mb-10 sm:text-2xl">
          집밥 추천 결과
        </Text>

        {recipeData.length > 0 && (
          <Flex direction="column" className="mb-10 gap-3">
            {recipeData.map((recipe: RecipeFilteredData) => (
              <Card key={recipe.menu} className="border border-slate-100 bg-slate-50 p-3">
                <Flex alignItems="center" className="gap-3">
                  <Image
                    src={recipe.thumbnail}
                    alt={recipe.menu}
                    width={64}
                    height={64}
                    loading="lazy"
                    className="h-10 min-h-10 w-10 min-w-10 rounded-xl object-cover sm:h-16 sm:min-h-16 sm:w-16
                      sm:min-w-16 sm:rounded-2xl"
                  />
                  <Flex direction="column" justifyContent="center">
                    <Text as="span" className="text-sm font-semibold text-gray-800">
                      {recipe.menu}
                    </Text>
                    <Text className="line-clamp-2 text-xs text-gray-600">{recipe.tip}</Text>
                  </Flex>
                </Flex>
              </Card>
            ))}
          </Flex>
        )}

        <Flex alignItems="center" justifyContent="center" className="w-full gap-2.5 sm:gap-5">
          <Button onClick={onCloseRecipeSheet} color={'gray'} fullWidth startDecorator={<RotateCw size={20} />}>
            별로예요
          </Button>
          <Button endDecorator={<ArrowRight size={20} className="min-h-5 min-w-5" />} fullWidth>
            조리법 확인할래요
          </Button>
        </Flex>
      </Flex>
    </BottomSheet>
  );
}
