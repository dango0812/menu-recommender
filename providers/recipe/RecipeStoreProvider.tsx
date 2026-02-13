'use client';

import { type ReactNode, useState } from 'react';

import type { RecipeFilteredData } from '@/app/api/recipes/type';
import { createRecipeStore } from '@/stores/recipe-store';

import { RecipeStoreContext } from './RecipeStoreContext';

export interface RecipeStoreProviderProps {
  children: ReactNode;
  initialRecipes: RecipeFilteredData[];
}

export const RecipeStoreProvider = ({ children, initialRecipes }: RecipeStoreProviderProps) => {
  // useState를 사용하여 클라이언트 사이드에서 스토어가 한 번만 생성되도록 함
  const [store] = useState(() =>
    createRecipeStore({
      recipes: initialRecipes,
      filteredRecipes: initialRecipes, // 초기 진입 시 전체 목록 노출
    })
  );

  return <RecipeStoreContext.Provider value={store}>{children}</RecipeStoreContext.Provider>;
};
