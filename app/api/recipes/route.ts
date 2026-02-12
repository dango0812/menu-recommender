import { NextRequest, NextResponse } from 'next/server';

import { env } from '@/constants/env';
import { pickRandom } from '@/utils/random';

import type { Recipe, RecipeApiResponse } from './type';

const MAX_RECIPE_COUNTS = {
  SOUP: 103,
  SIDE_DISH: 574,
} as const;

/**
 * 식품의약품안전처 공공데이터 조리식품의 레시피 API 호출 함수
 *
 * @param type 레시피 유형 요리종류(ex) 반찬, 국, 후식 등)
 * @param start 시작 인덱스
 * @param end 종료 인덱스
 * @returns 레시피 목록
 */
async function fetchRecipes(type: string, start: number, end: number): Promise<Recipe[]> {
  const url = `${env.FOOD_SAFETY_API_BASE_URL}/${env.FOOD_SAFETY_API_KEY}/COOKRCP01/json/${start}/${end}?RCP_PAT2=${encodeURIComponent(type)}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 604800 }, // 데이터가 자주 변경되지 않으므로 7일 설정
    });

    if (!response.ok) {
      throw new Error('Failed to fetch API');
    }

    const data: RecipeApiResponse = await response.json();
    return data.COOKRCP01?.row || [];
  } catch (error) {
    return [];
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const isSoupIncluded = searchParams.get('soup') === 'true';
  const sideDishCount = Number(searchParams.get('sideDishCount') ?? 0);

  try {
    const [soupRows, sideRows] = await Promise.all([
      isSoupIncluded ? fetchRecipes('국', 1, MAX_RECIPE_COUNTS.SOUP) : Promise.resolve([]),
      sideDishCount > 0 ? fetchRecipes('반찬', 1, MAX_RECIPE_COUNTS.SIDE_DISH) : Promise.resolve([]),
    ]);

    const data: Recipe[] = [];

    if (isSoupIncluded && soupRows?.length > 0) {
      data.push(...pickRandom(soupRows, 1));
    }

    if (sideDishCount > 0 && sideRows?.length > 0) {
      data.push(...pickRandom(sideRows, sideDishCount));
    }

    const filteredData = data.map(item => ({
      menu: item.RCP_NM,
      tip: item.RCP_NA_TIP,
      thumbnail: item.ATT_FILE_NO_MAIN,
      detailImage: item.ATT_FILE_NO_MK,
      ingredients: item.RCP_PARTS_DTLS,
      nutrition: {
        calories: parseFloat(item.INFO_ENG) || 0,
        protein: parseFloat(item.INFO_PRO) || 0,
        fat: parseFloat(item.INFO_FAT) || 0,
        carbs: parseFloat(item.INFO_CAR) || 0,
        sodium: parseFloat(item.INFO_NA) || 0,
      },
      instructions: Array.from({ length: 20 }, (_, i) => {
        const n = i + 1;
        const num = n < 10 ? `0${n}` : n.toString();

        return {
          step: item[`MANUAL${num}` as keyof Recipe],
          img: item[`MANUAL_IMG${num}` as keyof Recipe],
        };
      }).filter(inst => inst.step),
    }));

    return NextResponse.json({
      success: true,
      data: filteredData,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch recipes' }, { status: 500 });
  }
}
