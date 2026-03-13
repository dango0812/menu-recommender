import { z } from 'zod';

export const RECIPE_CATEGORY = ['SOUP', 'STEW', 'SIDE'] as const; // 레시피 카테고리 (국, 찌개, 반찬)
export const RECIPE_LEVEL = ['EASY', 'MEDIUM', 'HARD'] as const; // 레시피 난이도 (쉬움, 보통, 어려움)

const MAX_COVER_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpg', 'image/jpeg', 'image/heic', 'image/webp'] as const;

export const recipePostSchema = z.object({
  title: z.string().min(2, '제목을 입력해 주세요').max(50, '제목은 50자 이하로 입력해 주세요.'),
  description: z.string().optional(),
  coverImage: z
    .instanceof(File)
    .refine(file => file.size <= MAX_COVER_IMAGE_SIZE, '이미지 크기는 5MB 이하여야 해요')
    .refine(
      file => (ACCEPTED_IMAGE_TYPES as readonly string[]).includes(file.type),
      'JPG, PNG, HEIC, WebP 형식만 업로드할 수 있어요'
    )
    .optional(),
  category: z.enum(RECIPE_CATEGORY, { message: '카테고리를 선택해 주세요' }),
  level: z.enum(RECIPE_LEVEL, { message: '난이도를 선택해 주세요' }),
  cookingTime: z.number().min(1, '1분 이상 입력해 주세요').max(300, '300분 이하로 입력해 주세요'),
  mainIngredient: z.string().min(1, '주재료를 입력해 주세요'),
  seasonings: z
    .array(
      z.object({
        name: z.string().min(1, '양념을 입력해 주세요'),
        amount: z.string().min(1, '양을 입력해 주세요'),
      })
    )
    .min(1, '양념을 1개 이상 추가해 주세요'),
  cookingSteps: z
    .array(
      z.object({
        image: z
          .instanceof(File)
          .refine(file => file.size <= MAX_COVER_IMAGE_SIZE, '이미지 크기는 5MB 이하여야 해요')
          .refine(
            file => (ACCEPTED_IMAGE_TYPES as readonly string[]).includes(file.type),
            'JPG, PNG, HEIC, WebP 형식만 업로드할 수 있어요'
          )
          .optional(),
        description: z.string().min(1, '조리 설명을 입력해 주세요'),
        caption: z.string().optional(),
      })
    )
    .min(1, '조리 순서를 1단계 이상 추가해 주세요'),
});

export type RecipePostFormSchema = z.infer<typeof recipePostSchema>;
