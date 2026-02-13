import { Bookmark, Heart } from 'lucide-react';
import Image from 'next/image';

import type { RecipeFilteredData } from '@/app/api/recipes/type';
import { Button, Chip, Flex, Text } from '@/components/base';

const EMPTY_IMAGE_SRC = '/images/empty-image.png';
const LEVEL_LABEL: Record<Pick<RecipeFilteredData, 'level'>['level'], string> = {
  easy: '하',
  medium: '중',
  hard: '상',
};

interface RecipeCardProps {
  recipe: RecipeFilteredData;
  width: number;
  height: number;
  imageHeight: number;
  contentHeight: number;
}

/**
 * Render a recipe preview card with image, difficulty badge, overlay action buttons, title, tip, and a "레시피 보기" button.
 *
 * @param recipe - Data used to populate the card (image sources, menu title, tip text, and difficulty level).
 * @param width - Card width (CSS pixels).
 * @param height - Card height (CSS pixels).
 * @param imageHeight - Height of the image area (CSS pixels).
 * @param contentHeight - Height of the content area below the image (CSS pixels).
 * @returns The card as a JSX element.
 */
export function RecipeCard({ recipe, width, height, imageHeight, contentHeight }: RecipeCardProps) {
  return (
    <article
      className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition-shadow"
      style={{ width, height }}
    >
      {/* 이미지 영역 1:1 비율 */}
      <div className="relative shrink-0 overflow-hidden" style={{ width, height: imageHeight }}>
        <Image
          src={recipe.thumbnail || recipe.detailImage || EMPTY_IMAGE_SRC}
          alt={recipe.menu}
          fill
          sizes="(max-width: 600px) 100vw, 600px"
          className="object-cover transition-transform duration-500 hover:scale-105"
          onError={e => {
            (e.target as HTMLImageElement).src = EMPTY_IMAGE_SRC;
          }}
        />

        <Chip
          size="sm"
          className="absolute top-3 left-3 cursor-default rounded-full border border-white/20 bg-black/30 px-2.5 py-1
            text-sm font-medium text-white backdrop-blur-sm select-none hover:bg-black/30 active:bg-black/30"
        >
          난이도 {LEVEL_LABEL[recipe.level]}
        </Chip>

        <div className="absolute right-3 bottom-3 flex space-x-2.5">
          <button
            type="button"
            className="cursor-pointer rounded-full bg-black/30 p-2 text-white"
            aria-label="즐겨찾기"
          >
            <Bookmark size={22} />
          </button>
          <button type="button" className="cursor-pointer rounded-full bg-black/30 p-2 text-white" aria-label="좋아요">
            <Heart size={22} />
          </button>
        </div>
      </div>

      {/* 콘텐츠 영역 */}
      <Flex direction="column" justifyContent="space-between" className="grow p-4" style={{ height: contentHeight }}>
        <div className="flex flex-col gap-1">
          <Text as="h3" className="line-clamp-1 text-sm font-bold text-gray-900 sm:text-lg">
            {recipe.menu}
          </Text>
          <Text className="line-clamp-2 text-sm text-gray-600">{recipe.tip}</Text>
        </div>

        <Button color="gray" size="sm" className="mt-2 w-full text-sm hover:bg-primary hover:text-white">
          레시피 보기
        </Button>
      </Flex>
    </article>
  );
}