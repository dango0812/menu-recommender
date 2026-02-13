export type RecipeLevel = 'easy' | 'medium' | 'hard';

/**
 * 레시피 난이도 계산 함수 (단계 수에 따라 난이도를 분류)
 *
 * @param stepCount 레시피 단계 수
 * @returns 난이도 'easy' | 'medium' | 'hard'
 *
 * @example
 * getRecipeLevel(3); // 'easy'
 * getRecipeLevel(5); // 'medium'
 * getRecipeLevel(12); // 'hard'
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
