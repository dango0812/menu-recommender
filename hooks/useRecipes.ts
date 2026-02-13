'use client';

import { useMemo } from 'react';

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
 * Hook that provides a mutation to fetch recommended recipes based on soup inclusion and side dish count.
 *
 * @param isSoupIncluded - Whether to include soups/stews in the recommended results
 * @param sideDishCount - Number of side dishes to request for the recommendations
 * @returns The mutation result object that triggers fetching recommended recipes and contains the request status and resulting recipe data
 */
export function useRecipes({ isSoupIncluded, sideDishCount }: UseRecipesParams) {
  return useMutation({
    mutationKey: queryKeys.recipes.all,
    mutationFn: () => fetcher({ isSoupIncluded, sideDishCount }),
  });
}

/**
 * Fetches recommended recipes from the API using the provided soup inclusion and side-dish count.
 *
 * @param params - Request parameters: `isSoupIncluded` indicates whether to include soups/stews; `sideDishCount` is the desired number of side dishes.
 * @returns The array of recipes (`RecipeFilteredData[]`) returned by the API that match the requested criteria.
 * @throws Error when the HTTP response is not OK or when the API responds with `success: false` (error message from the API).
 */
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
 * Return the store's recipes filtered by the current search query and filter criteria.
 *
 * @returns An array of recipes filtered according to the store's `searchQuery` and `filter`
 */
export function useFilteredRecipes() {
  const recipes = useRecipeStore(state => state.recipes);
  const searchQuery = useRecipeStore(state => state.searchQuery);
  const filter = useRecipeStore(state => state.filter);

  return useMemo(() => applyFilters(recipes, searchQuery, filter), [recipes, searchQuery, filter]);
}