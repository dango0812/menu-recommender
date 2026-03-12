import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

import { SimpleHeader } from '@/components/layout';
import { Flex } from '@/components/ui';

export const metadata: Metadata = {
  title: '회원가입',
  description: '와구와규와 함께 맛있는 레시피를 나눠요.',
};

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Flex direction="column" className="h-screen">
      <SimpleHeader />
      {children}
    </Flex>
  );
}
