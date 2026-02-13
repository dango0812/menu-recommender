'use client';

import { Search } from 'lucide-react';

import { Flex, Input } from '@/components/base';
import { useRecipeStore } from '@/providers/recipe/RecipeStoreContext';

export function RecipeSearch() {
  const searchQuery = useRecipeStore(state => state.searchQuery);
  const setSearchQuery = useRecipeStore(state => state.setSearchQuery);

  return (
    <Flex className="mt-2 mb-6 sm:px-5" justifyContent="center">
      <Input
        type="search"
        placeholder="오늘은 어떤 요리를 해볼까요?"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        startDecorator={<Search size={20} className="font-bold text-primary" />}
        fullWidth
      />
    </Flex>
  );
}
