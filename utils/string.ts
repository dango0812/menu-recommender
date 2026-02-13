/**
 * 문자열 정규화 띄어쓰기 제거 + 소문자 변환
 * @param str 원본 문자열
 * @returns 정규화된 문자열
 *
 * @example
 * ```ts
 * normalizeString('두부 김치 찌개'); // '두부김치찌개'
 * normalizeString('  Dong gyu Kim '); // 'donggyukim'
 * ```
 */
export function normalizeString(str: string): string {
  return str.replace(/\s+/g, '').toLowerCase();
}
