import type { PropsWithChildren } from 'react';

import { MainHeader } from '@/components/layout';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <MainHeader />
      <main className="bg-background">{children}</main>
    </>
  );
}
