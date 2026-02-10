import { BookOpen, Heart, Home, Settings, TextSearch } from 'lucide-react';

import { ROUTES } from '@/constants/routes';

import type { BottomNavigationItem } from './types';

/**
 * 네비게이션 구성
 */
export const NAVIGATION_CONFIG: BottomNavigationItem[] = [
  {
    label: '최저가 검색',
    href: ROUTES.BEST_DEAL,
    icon: <TextSearch />,
  },
  {
    label: '레시피',
    href: ROUTES.RECIPES,
    icon: <BookOpen />,
  },
  {
    label: '음식 추천',
    href: ROUTES.HOME,
    icon: <Home />,
  },
  {
    label: '추천 기록',
    href: ROUTES.HISTORY,
    icon: <Heart />,
  },
  {
    label: '입맛 설정',
    href: ROUTES.TASTE_SETTING,
    icon: <Settings />,
  },
];
