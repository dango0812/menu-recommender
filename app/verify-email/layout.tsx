import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

import { SimpleHeader } from '@/components/layout';
import { Flex } from '@/components/ui';

export const metadata: Metadata = {
  title: '이메일 인증',
  description: '와구와규 회원가입을 위해 이메일 인증을 완료해주세요.',
};

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Flex direction="column" className="h-screen">
      <SimpleHeader />
      {children}
    </Flex>
  );
}
