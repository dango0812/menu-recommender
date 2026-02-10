'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Flex, Text } from '@/components/base';
import { cn } from '@/lib/tailwind-merge';

import type { BottomNavigationItem } from './types';

interface BottomNavigationProps {
  items: BottomNavigationItem[];
  className?: string;
}

/**
 * BottomNavigation 컴포넌트
 * @example
 * ```tsx
 * import { NAVIGATION_CONFIG } from './BottomNavigation/config';
 * <BottomNavigation items={NAVIGATION_CONFIG} />
 * ```
 */
export function BottomNavigation({ items, className }: BottomNavigationProps) {
  const pathname = usePathname();

  return (
    <nav className={cn('absolute right-0 bottom-0 left-0 z-50 bg-white shadow-outline-top', className)}>
      <Flex className="items-center justify-around">
        {items.map(item => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-1 flex-col items-center justify-center gap-1 py-2.5 transition-all duration-300 ease-in-out',
                {
                  'font-semibold text-primary': isActive,
                  'font-normal text-inactive hover:text-primary/90': !isActive,
                }
              )}
            >
              <Flex className="h-6 w-6 items-center justify-center [&_svg]:h-full [&_svg]:w-full">{item.icon}</Flex>
              <Text className="text-sm">{item.label}</Text>
            </Link>
          );
        })}
      </Flex>
    </nav>
  );
}
