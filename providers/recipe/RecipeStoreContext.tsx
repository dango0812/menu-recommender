'use client';

import { createContext, useContext } from 'react';

import { useStore } from 'zustand';

import type { RecipeStore } from '@/stores/recipe-store';

export type RecipeStoreApi = ReturnType<typeof import('@/stores/recipe-store').createRecipeStore>;

export const RecipeStoreContext = createContext<RecipeStoreApi | undefined>(undefined);

export const useRecipeStore = <T,>(selector: (store: RecipeStore) => T): T => {
  const context = useContext(RecipeStoreContext);
  if (!context) {
    throw new Error('useRecipeStore는 RecipeStoreProvider 컴포넌트 내부에서만 사용할 수 있어요.');
  }
  return useStore(context, selector);
};
