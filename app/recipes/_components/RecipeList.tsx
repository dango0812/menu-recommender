'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useVirtualizer } from '@tanstack/react-virtual';

import { Flex } from '@/components/base';
import { EmptyContent } from '@/components/common/EmptyContent';
import { useFilteredRecipes } from '@/hooks/useRecipes';

import { RecipeCard } from './RecipeCard';
import { RecipeListSkeleton } from './RecipeListSkeleton';

const BREAKPOINT = 390;
const GAP = 20;
const CONTENT_HEIGHT = 160;

interface Layout {
  columns: number;
  itemWidth: number;
  itemHeight: number;
}

export function RecipeList() {
  const parentRef = useRef<HTMLDivElement>(null);
  const filteredRecipes = useFilteredRecipes();
  const [layout, setLayout] = useState<Layout>({ columns: 2, itemWidth: 0, itemHeight: 0 });
  const isLayoutReady = layout.itemWidth > 0;

  // 너비 및 높이 계산 함수
  const updateLayout = useCallback(() => {
    if (!parentRef.current) {
      return;
    }

    // 현재 부모 컨테이너의 실제 너비 (스크롤바 제외)
    const containerWidth = parentRef.current.clientWidth;
    // 컬럼 수
    const columns = containerWidth < BREAKPOINT ? 1 : 2;

    // 아이템 너비 계산: (전체너비 - (간격 * (컬럼수 - 1))) / 컬럼수
    const itemWidth = (containerWidth - (columns - 1) * GAP) / columns;
    // 아이템 높이 계산
    const itemHeight = itemWidth + CONTENT_HEIGHT;

    setLayout({
      columns,
      itemWidth,
      itemHeight,
    });
  }, []);

  useEffect(() => {
    updateLayout();

    // 리사이즈 이벤트 등록
    window.addEventListener('resize', updateLayout);

    return () => {
      window.removeEventListener('resize', updateLayout);
    };
  }, [updateLayout]);

  // TanStack Virtualizer 설정
  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(filteredRecipes.length / layout.columns),
    getScrollElement: () => parentRef.current,
    estimateSize: () => layout.itemHeight + GAP,
    overscan: 4,
  });

  useEffect(() => {
    rowVirtualizer.measure();
  }, [layout.itemHeight, layout.columns, rowVirtualizer]);

  // 레이아웃 계산 전 스켈레톤 표시
  if (!isLayoutReady) {
    return (
      <div ref={parentRef} className="no-scrollbar min-h-0 w-full flex-1 overflow-y-auto">
        <RecipeListSkeleton />
      </div>
    );
  }

  if (filteredRecipes.length === 0) {
    return (
      <Flex alignItems="center" justifyContent="center" className="h-full">
        <EmptyContent
          title="검색 결과가 없어요"
          description={`단어의 철자를 다시 확인해주세요.\n또는 단어의 수를 줄이거나, 일반적인 검색어로 다시 검색해보세요.`}
        />
      </Flex>
    );
  }

  return (
    <div ref={parentRef} className="no-scrollbar min-h-0 w-full flex-1 overflow-y-auto">
      <div
        className="relative w-full"
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
        }}
      >
        {rowVirtualizer.getVirtualItems().map(virtualRow => {
          const startIdx = virtualRow.index * layout.columns;
          const items = filteredRecipes.slice(startIdx, startIdx + layout.columns);

          return (
            <div
              key={virtualRow.key}
              className="absolute top-0 left-0 flex w-full"
              style={{
                height: `${layout.itemHeight}px`,
                transform: `translateY(${virtualRow.start}px)`,
                gap: `${GAP}px`,
              }}
            >
              {items.map(item => (
                <RecipeCard
                  key={item.id}
                  recipe={item}
                  width={layout.itemWidth}
                  height={layout.itemHeight}
                  imageHeight={layout.itemWidth}
                  contentHeight={CONTENT_HEIGHT}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
