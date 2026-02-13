import { Card, Flex } from '@/components/base';

/**
 * Render a responsive grid of six skeleton recipe cards.
 *
 * Each card contains an image placeholder and two stacked content placeholders and uses a pulse animation to indicate loading.
 *
 * @returns A JSX element containing the skeleton grid of recipe cards
 */
export function RecipeListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="animate-pulse">
          {/* 이미지 스켈레톤 */}
          <div className="aspect-square w-full bg-gray-200" />

          {/* 컨텐츠 스켈레톤 */}
          <Flex direction="column" className="mt-4 gap-3">
            <div className="h-7 w-3/4 rounded bg-gray-200" />
            <div className="h-12 w-full rounded bg-gray-200" />
          </Flex>
        </Card>
      ))}
    </div>
  );
}