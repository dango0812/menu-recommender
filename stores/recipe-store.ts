import { createStore } from 'zustand';

import type { RecipeFilteredData } from '@/app/api/recipes/type';
import { FILTER_OPTIONS, type FilterType } from '@/app/recipes/_constants/filter-options';
import { normalizeString } from '@/utils/string';

export interface RecipeState {
  /** 원본 레시피 목록 */
  recipes: RecipeFilteredData[];
  /** 선택된 필터 */
  filter: FilterType;
  /** 검색 쿼리 */
  searchQuery: string;
}

export interface RecipeActions {
  setSearchQuery: (query: string) => void;
  setFilter: (filter: FilterType) => void;
}

export type RecipeStore = RecipeState & RecipeActions;

export const createRecipeStore = (initState: Partial<RecipeState>) => {
  const defaultState: RecipeState = {
    recipes: [],
    filter: FILTER_OPTIONS[0].value,
    searchQuery: '',
    ...initState,
  };

  return createStore<RecipeStore>()(set => ({
    ...defaultState,

    // 검색어 변경 시 실행
    setSearchQuery: (query: string) =>
      set(() => ({
        searchQuery: query,
      })),

    // 필터 변경 시 실행
    setFilter: (filter: FilterType) =>
      set(() => ({
        filter,
      })),
  }));
};

/**
 * 레시피 필터 함수
 * @param recipes 원본 레시피 목록
 * @param query 검색 쿼리
 * @param filter 선택된 필터
 * @returns 필터링된 레시피 목록
 */
export function applyFilters(recipes: RecipeFilteredData[], query: string, filter: FilterType): RecipeFilteredData[] {
  const normalizedQuery = normalizeString(query);

  return recipes.filter(recipe => {
    // 검색어 필터링 (띄어쓰기 제거하여 검색)
    const matchesSearch = normalizeString(recipe.menu).includes(normalizedQuery);

    // 레시피 필터
    const matchesFilter = (() => {
      switch (filter) {
        case 'all':
          return true;
        case 'soup':
          return recipe.type.includes(FILTER_OPTIONS[1].label);
        case 'side-dish':
          return recipe.type.includes(FILTER_OPTIONS[2].label);
        case 'dessert':
          return recipe.type.includes(FILTER_OPTIONS[3].label);
        case 'easy':
        case 'medium':
        case 'hard':
          return recipe.level === filter;
        default:
          return false;
      }
    })();

    return matchesSearch && matchesFilter;
  });
}
