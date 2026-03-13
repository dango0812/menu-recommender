/**
 * 이미지 업로드 허용 MIME 타입
 */
export const ACCEPTED_IMAGE_TYPES = {
  'image/png': [],
  'image/jpg': [],
  'image/jpeg': [],
  'image/heic': [],
  'image/webp': [],
} as const;

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
