import type { PropsWithChildren } from 'react';

import { SimpleHeader } from '@/components/layout';
import { Flex } from '@/components/ui';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Flex direction="column" className="h-screen">
      <SimpleHeader />
      <main className="flex flex-1 items-center justify-center bg-background p-6">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </Flex>
  );
}
