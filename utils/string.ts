/**
 * Normalize a string by removing all whitespace and converting letters to lowercase.
 *
 * @param str - The input string to normalize
 * @returns The input with all whitespace removed and characters converted to lowercase
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