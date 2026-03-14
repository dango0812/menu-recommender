import { Timer } from 'lucide-react';

import { RHFChipGroup, RHFInput, RHFTextarea } from '@/components/common/react-hook-form';
import { Card, Flex, Text } from '@/components/ui';
import { RECIPE_CATEGORY_OPTIONS, RECIPE_LEVEL_OPTIONS } from '@/constants/recipe';
import { type RecipePostFormSchema } from '@/constants/schemas/recipe-post';

import { CoverImageUpload } from './cover-image-upload';

export function BasicInfoSection() {
  return (
    <Card>
      <Flex direction="column" className="gap-6">
        <Text as="h2" className="text-lg font-bold text-gray-800">
          기본 정보
        </Text>

        <CoverImageUpload />

        <RHFInput<RecipePostFormSchema>
          name="title"
          label="레시피 제목"
          placeholder="레시피 제목을 입력해 주세요"
          fullWidth
        />

        <RHFTextarea<RecipePostFormSchema>
          name="description"
          label={
            <>
              레시피 설명
              <Text as="span" className="text-gray-400">
                (선택)
              </Text>
            </>
          }
          rows={3}
          placeholder="레시피에 대한 간단한 설명을 입력해 주세요"
        />

        <RHFChipGroup<RecipePostFormSchema> name="category" label="카테고리" options={RECIPE_CATEGORY_OPTIONS} />
        <RHFChipGroup<RecipePostFormSchema> name="level" label="난이도" options={RECIPE_LEVEL_OPTIONS} />

        <RHFInput<RecipePostFormSchema>
          name="cookingTime"
          type="number"
          label="조리 시간"
          placeholder="조리 시간을 입력해 주세요"
          startDecorator={<Timer size={20} className="text-gray-400" />}
          endDecorator={
            <Text as="span" className="text-sm text-gray-400">
              분
            </Text>
          }
          min={1}
          max={300}
          className="pr-8 text-right"
        />
      </Flex>
    </Card>
  );
}
