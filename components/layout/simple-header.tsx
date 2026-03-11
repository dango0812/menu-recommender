import type { ReactNode } from 'react';

import { cn } from '@/lib/tailwind-merge';

import { Flex, Text } from '../ui';

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
        {/* 로고 이미지로 대체 */}
        <Flex alignItems="center">
          <Text as="span" className="text-xl font-bold text-primary">
            와구
          </Text>
          <Text as="span" className="text-xl font-bold text-black">
            와규
          </Text>
        </Flex>

        {rightContent}
      </Flex>
    </header>
  );
}
