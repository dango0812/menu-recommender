import { z } from 'zod';

export const RECIPE_CATEGORY = ['SOUP', 'STEW', 'SIDE'] as const; // 레시피 카테고리 (국, 찌개, 반찬)
export const RECIPE_LEVEL = ['EASY', 'MEDIUM', 'HARD'] as const; // 레시피 난이도 (쉬움, 보통, 어려움)
export const RECIPE_INGREDIENT_TYPE = ['MAIN', 'SEASONING'] as const; // 재료 타입 (주재료, 양념)

export const recipePostSchema = z.object({
  title: z.string().min(2, '제목을 입력해 주세요').max(50, '제목은 50자 이하로 입력해 주세요.'),
  description: z.string().optional(),
  category: z.enum(RECIPE_CATEGORY, { message: '카테고리를 선택해 주세요' }),
  level: z.enum(RECIPE_LEVEL, { message: '난이도를 선택해 주세요' }),
  cookingTime: z.number().min(1, '1분 이상 입력해 주세요').max(300, '300분 이하로 입력해 주세요'),
  ingredients: z
    .array(
      z.object({
        name: z.string().min(1, '재료명을 입력해 주세요'),
        amount: z.string().min(1, '양을 입력해 주세요'),
        type: z.enum(RECIPE_INGREDIENT_TYPE, { message: '재료 타입을 선택해 주세요' }),
      })
    )
    .min(1, '재료를 1개 이상 추가해 주세요'),
  instructions: z
    .array(
      z.object({
        description: z.string().min(1, '조리 설명을 입력해 주세요'),
        subDescription: z.string().optional(),
      })
    )
    .min(1, '조리 순서를 1단계 이상 추가해 주세요'),
});

export type RecipePostFormSchema = z.infer<typeof recipePostSchema>;
