import { RECIPE_CATEGORY, RECIPE_INGREDIENT_TYPE, RECIPE_LEVEL } from './schemas/recipe-post';

const RECIPE_CATEGORY_LABELS: Record<(typeof RECIPE_CATEGORY)[number], string> = {
  SOUP: '국',
  STEW: '찌개',
  SIDE: '반찬',
};

/**
 * 레시피 카테고리 옵션
 *
 * @example
 * [
 *   { id: 'SOUP', label: '국' },
 *   { id: 'STEW', label: '찌개' },
 *   { id: 'SIDE', label: '반찬' },
 * ]
 */
export const RECIPE_CATEGORY_OPTIONS = RECIPE_CATEGORY.map(
  id =>
    ({
      id,
      label: RECIPE_CATEGORY_LABELS[id],
    }) as const
);

// ----------------------------------------------------------------- //

const RECIPE_LEVEL_LABELS: Record<(typeof RECIPE_LEVEL)[number], string> = {
  EASY: '쉬움',
  MEDIUM: '보통',
  HARD: '어려움',
};

/**
 * 레시피 난이도 옵션
 *
 * @example
 * [
 *   { id: 'EASY', label: '쉬움' },
 *   { id: 'MEDIUM', label: '보통' },
 *   { id: 'HARD', label: '어려움' },
 * ]
 */
export const RECIPE_LEVEL_OPTIONS = RECIPE_LEVEL.map(
  id =>
    ({
      id,
      label: RECIPE_LEVEL_LABELS[id],
    }) as const
);

// ----------------------------------------------------------------- //

const RECIPE_INGREDIENT_LABELS: Record<(typeof RECIPE_INGREDIENT_TYPE)[number], string> = {
  MAIN: '주재료',
  SEASONING: '양념',
};

/**
 * 레시피 재료 옵션
 *
 * @example
 * [
 *  { id: 'MAIN', label: '주재료' },
 *  { id: 'SEASONING', label: '양념' },
 * ]
 */
export const RECIPE_INGREDIENT_OPTIONS = RECIPE_INGREDIENT_TYPE.map(
  id =>
    ({
      id,
      label: RECIPE_INGREDIENT_LABELS[id],
    }) as const
);
