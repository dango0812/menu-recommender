import type { PropsWithChildren } from 'react';

import { BottomNavigation, NAVIGATION_CONFIG } from './BottomNavigation';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="app-layout relative">
      {children}

      <BottomNavigation items={NAVIGATION_CONFIG} />
    </div>
  );
}
