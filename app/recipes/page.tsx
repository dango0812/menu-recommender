import { Flex } from '@/components/base';
import { RecipeStoreProvider } from '@/providers/recipe/RecipeStoreProvider';

import { fetchAllRecipes } from './_api/recipes';
import { RecipeFilter, RecipeList, RecipeSearch } from './_components';

export const dynamic = 'force-static';

/**
 * Render the recipes page and provide fetched recipes to the store provider.
 *
 * Fetches all recipes and initializes `RecipeStoreProvider` with them, then renders
 * the filter, search, and list UI inside a column Flex layout.
 *
 * @returns A React element that renders the recipes page populated with fetched recipes.
 */
export default async function RecipePage() {
  const recipes = await fetchAllRecipes();

  return (
    <RecipeStoreProvider initialRecipes={recipes}>
      <Flex direction="column" className="h-full px-5 pt-5 sm:px-6 sm:pt-10">
        <RecipeFilter />
        <RecipeSearch />
        <RecipeList />
      </Flex>
    </RecipeStoreProvider>
  );
}