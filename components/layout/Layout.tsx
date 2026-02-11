import type { PropsWithChildren } from 'react';

import { BottomNavigation, NAVIGATION_CONFIG } from './BottomNavigation';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="app-layout flex flex-col">
      <main className="flex-1 overflow-y-auto">{children}</main>

      <BottomNavigation items={NAVIGATION_CONFIG} />
    </div>
  );
}
