import { Bookmark, Home, UserCog, UtensilsCrossed } from 'lucide-react';

import { ROUTES } from '@/constants/routes';

import type { BottomNavigationItem } from './types';

/**
 * 네비게이션 구성
 */
export const NAVIGATION_CONFIG: BottomNavigationItem[] = [
  /*
  {
    label: '최저가 검색',
    href: ROUTES.BEST_DEAL,
    icon: <TextSearch />,
  },
  */
  {
    label: '음식 추천',
    href: ROUTES.HOME,
    icon: <Home />,
  },
  {
    label: '레시피',
    href: ROUTES.RECIPES,
    icon: <UtensilsCrossed />,
  },
  {
    label: '찜 목록',
    href: ROUTES.HISTORY,
    icon: <Bookmark />,
  },
  {
    label: '내 정보',
    href: ROUTES.TASTE_SETTING,
    icon: <UserCog />,
  },
];
