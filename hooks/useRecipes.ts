'use client';

import { useMutation } from '@tanstack/react-query';

import type { RecipeFilteredData } from '@/app/api/recipes/type';
import { queryKeys } from '@/constants/query-keys';
import { API_ROUTES } from '@/constants/routes';
import { useRecipeStore } from '@/providers/recipe/RecipeStoreContext';
import { applyFilters } from '@/stores/recipe-store';

interface UseRecipesParams {
  isSoupIncluded: boolean;
  sideDishCount: number;
}
interface RecipesResponse {
  success: boolean;
  data: RecipeFilteredData[];
  error?: string;
}

/**
 * 레시피 추천 API를 호출하는 Hook
 *
 * @param isSoupIncluded 국/찌개 포함 여부
 * @param sideDishCount 반찬 개수
 * @returns 레시피 목록을 가져오는 mutation
 *
 * @example
 * ```tsx
 * const { mutate, data, isPending } = useRecipes({
 *   isSoupIncluded: true,
 *   sideDishCount: 3
 * });
 *
 * // 레시피 추천 요청
 * mutate();
 * ```
 */
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

/**
 * 레시피 Store에서 현재 검색어와 필터를 적용한 목록을 반환하는 Hook
 *
 * @returns 필터링된 레시피 목록
 * @example
 * ```tsx
 * const filteredRecipes = useFilteredRecipes();
 * ```
 */
export const useFilteredRecipes = () =>
  useRecipeStore(state => applyFilters(state.recipes, state.searchQuery, state.filter));
