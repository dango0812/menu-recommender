export type RecipeLevel = 'easy' | 'medium' | 'hard';

/**
 * Classifies a recipe's difficulty based on its number of steps.
 *
 * @param stepCount - Number of steps in the recipe
 * @returns `'easy'` if `stepCount` is less than or equal to 3, `'medium'` if `stepCount` is less than or equal to 5, `'hard'` otherwise
 */
export function getRecipeLevel(stepCount: number): RecipeLevel {
  if (stepCount <= 3) {
    return 'easy';
  }

  if (stepCount <= 5) {
    return 'medium';
  }

  return 'hard';
}