export type RecipeLevel = 'easy' | 'medium' | 'hard';

/**
 * 레시피 난이도 계산 함수 (단계 수에 따라 난이도를 분류)
 *
 * @param stepCount 레시피 단계 수
 * @returns 난이도 'easy' | 'medium' | 'hard'
 *
 * @example
 * getRecipeLevel(3); // 'easy'
 * getRecipeLevel(8); // 'medium'
 * getRecipeLevel(12); // 'hard'
 */
export function getRecipeLevel(stepCount: number): RecipeLevel {
  switch (true) {
    case stepCount <= 3:
      return 'easy';
    case stepCount <= 5:
      return 'medium';
    default:
      return 'hard';
  }
}
