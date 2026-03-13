import Image from 'next/image';
import Link from 'next/link';

import { ROUTES } from '@/constants/routes';

import { Flex } from '../ui';

export function MainHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-white/80 backdrop-blur-md">
      <Flex alignItems="center" justifyContent="space-between" className="container mx-auto h-15 max-w-7xl px-5">
        <Link href={ROUTES.HOME} className="flex items-center">
          <Image src="/logo.svg" alt="와구와규 로고" width={140} height={40} priority />
        </Link>
      </Flex>
    </header>
  );
}
