'use client';

import { Chip, Flex } from '@/components/base';
import { useRecipeStore } from '@/providers/recipe/RecipeStoreContext';

import { FILTER_OPTIONS } from '../_constants/filter-options';

/**
 * Render a horizontally scrollable row of filter chips for selecting the current recipe filter.
 *
 * Each chip represents an entry from `FILTER_OPTIONS`; the chip matching the current filter is styled
 * as `primary`, and clicking a chip updates the shared recipe filter in the store.
 *
 * @returns A JSX element containing the horizontally scrollable list of filter chips
 */
export function RecipeFilter() {
  const filter = useRecipeStore(state => state.filter);
  const setFilter = useRecipeStore(state => state.setFilter);

  return (
    <Flex className="no-scrollbar gap-2 overflow-x-auto py-2 sm:px-5">
      {FILTER_OPTIONS.map(option => (
        <Chip
          key={option.value}
          color={filter === option.value ? 'primary' : 'light'}
          onClick={() => setFilter(option.value)}
        >
          {option.label}
        </Chip>
      ))}
    </Flex>
  );
}