/**
 * 업로드 가능한 이미지 파일의 MIME 타입 정의
 */
export const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpg', 'image/jpeg', 'image/heic', 'image/webp'] as const;

/**
 * react-dropzone에서 사용되는 accept 옵션
 * 각 키는 MIME 타입이며, 값은 빈 배열로 설정 (react-dropzone 요구사항)
 *
 * @returns {Record<string, string[]>} react-dropzone에 전달할 accept 옵션 객체
 * @example
 * {
 *   'image/png': [],
 *   'image/jpg': [],
 *   'image/jpeg': [],
 *   'image/heic': [],
 *   'image/webp': [],
 * }
 */
export const DROPZONE_ACCEPT_IMAGE_TYPES = Object.fromEntries(ACCEPTED_IMAGE_TYPES.map(type => [type, []]));
/**
 * 파일 업로드 거부 사유에 따른 메시지
 *
 * 각 키는 react-dropzone에서 제공하는 파일 거부 코드와 일치
 */
export const FILE_REJECTION_MESSAGES: Record<string, string> = {
  'file-too-large': '이미지 크기는 5MB 이하여야 해요',
  'file-too-small': '유효하지 않은 파일이에요',
  'file-invalid-type': 'JPG, PNG, HEIC, WebP 형식만 업로드할 수 있어요',
  'too-many-files': '이미지는 1장만 업로드할 수 있어요',
} as const;
