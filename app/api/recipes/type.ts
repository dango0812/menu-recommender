/**
 * URL
 * https://www.foodsafetykorea.go.kr/api/openApiInfo.do?menu_grp=MENU_GRP31&menu_no=661&show_cnt=10&start_idx=1&svc_no=COOKRCP01
 */

export interface Recipe {
  RCP_SEQ: string; // 일련번호
  RCP_NM: string; // 메뉴명
  RCP_WAY2: string; // 조리방법 (예: 끓이기, 굽기)
  RCP_PAT2: string; // 요리종류 (예: 국, 반찬)
  INFO_WGT: string; // 중량(1인분)
  INFO_ENG: string; // 열량
  INFO_CAR: string; // 탄수화물
  INFO_PRO: string; // 단백질
  INFO_FAT: string; // 지방
  INFO_NA: string; // 나트륨
  HASH_TAG: string; // 해쉬태그
  ATT_FILE_NO_MAIN: string; // 이미지경로(소)
  ATT_FILE_NO_MK: string; // 이미지경로(대)
  RCP_PARTS_DTLS: string; // 재료정보

  // 만드는 법 및 이미지 (1~20)
  MANUAL01: string;
  MANUAL_IMG01: string;
  MANUAL02: string;
  MANUAL_IMG02: string;
  MANUAL03: string;
  MANUAL_IMG03: string;
  MANUAL04: string;
  MANUAL_IMG04: string;
  MANUAL05: string;
  MANUAL_IMG05: string;
  MANUAL06: string;
  MANUAL_IMG06: string;
  MANUAL07: string;
  MANUAL_IMG07: string;
  MANUAL08: string;
  MANUAL_IMG08: string;
  MANUAL09: string;
  MANUAL_IMG09: string;
  MANUAL10: string;
  MANUAL_IMG10: string;
  MANUAL11: string;
  MANUAL_IMG11: string;
  MANUAL12: string;
  MANUAL_IMG12: string;
  MANUAL13: string;
  MANUAL_IMG13: string;
  MANUAL14: string;
  MANUAL_IMG14: string;
  MANUAL15: string;
  MANUAL_IMG15: string;
  MANUAL16: string;
  MANUAL_IMG16: string;
  MANUAL17: string;
  MANUAL_IMG17: string;
  MANUAL18: string;
  MANUAL_IMG18: string;
  MANUAL19: string;
  MANUAL_IMG19: string;
  MANUAL20: string;
  MANUAL_IMG20: string;

  RCP_NA_TIP: string; // 저감 조리법 TIP
}

/** Recipe Filtered Data */
export interface RecipeFilteredData {
  /** 메뉴 */
  menu: string;
  /** 조리법 팁 */
  tip: string;
  /** 썸네일 이미지 */
  thumbnail: string;
  /** 상세 이미지 */
  detailImage: string;
  /** 재료 정보 */
  ingredients: string;
  /** 영양 정보 */
  nutrition: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    sodium: number;
  };
  /** 조리 순서 */
  instructions: Array<{
    step: string;
    img: string;
  }>;
}

/** API 전체 응답 구조 타입 */
export interface RecipeApiResponse {
  COOKRCP01: {
    total_count: string;
    row: Recipe[];
    RESULT: {
      MSG: string;
      CODE: string;
    };
  };
}
