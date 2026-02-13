import { Flex } from '@/components/base';
import { RecipeStoreProvider } from '@/providers/recipe/RecipeStoreProvider';

import { fetchAllRecipes } from './_api/recipes';
import { RecipeFilter, RecipeList, RecipeSearch } from './_components';

export const dynamic = 'force-static';

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
