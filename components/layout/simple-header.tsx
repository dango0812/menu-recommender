import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/tailwind';

import { Flex } from '../ui';

interface SimpleHeaderProps {
  className?: string;
  rightContent?: ReactNode;
}

/**
 * 좌측 로고와 우측 컨텐츠를 가지는 간단한 헤더 컴포넌트
 *
 * @param className 스타일 확장
 * @param rightContent 우측에 표시할 컨텐츠
 *
 * @example
 * <SimpleHeader className="custom-class" />
 * <SimpleHeader rightContent={<Button>로그인</Button>} />
 */
export function SimpleHeader({ className, rightContent }: SimpleHeaderProps) {
  return (
    <header className={cn('h-15 w-full border-b border-slate-300 bg-background px-5', className)}>
      <Flex alignItems="center" justifyContent="space-between" className="h-full">
        <Link href={ROUTES.HOME} className="flex items-center">
          <Image src="/logo.svg" alt="와구와규 로고" width={140} height={40} priority />
        </Link>

        {rightContent}
      </Flex>
    </header>
  );
}
