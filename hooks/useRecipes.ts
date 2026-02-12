'use client';

import { useMutation } from '@tanstack/react-query';

import type { RecipeFilteredData } from '@/app/api/recipes/type';
import { queryKeys } from '@/constants/query-keys';
import { API_ROUTES } from '@/constants/routes';

interface UseRecipesParams {
  isSoupIncluded: boolean;
  sideDishCount: number;
}
interface RecipesResponse {
  success: boolean;
  data: RecipeFilteredData[];
  error?: string;
}

export function useRecipes({ isSoupIncluded, sideDishCount }: UseRecipesParams) {
  return useMutation({
    mutationKey: queryKeys.recipes.all,
    mutationFn: () => fetcher({ isSoupIncluded, sideDishCount }),
  });
}

async function fetcher(params: UseRecipesParams): Promise<RecipeFilteredData[]> {
  const searchParams = new URLSearchParams({
    soup: params.isSoupIncluded.toString(),
    sideDishCount: params.sideDishCount.toString(),
  });

  const response = await fetch(`${API_ROUTES.RECIPES.GET}?${searchParams}`);

  if (!response.ok) {
    throw new Error('레시피를 불러오는데 실패했습니다.');
  }

  const result: RecipesResponse = await response.json();

  if (!result.success) {
    throw new Error(result.error);
  }

  return result.data;
}
