/**
 * 라우팅 경로
 */
export const ROUTES = {
  HOME: '/',
  BEST_DEAL: '/best-deal',
  RECIPES: '/recipes',
  HISTORY: '/history',
  TASTE_SETTING: '/taste-setting',
} as const;

/**
 * API 경로
 */
export const API_ROUTES = {
  RECIPES: {
    GET: '/api/recipes',
  },
} as const;
