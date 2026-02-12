import { useEffect } from 'react';

/**
 * Body 스크롤 제어 Hook
 * Modal, BottomSheet, Drawer 등에서 재사용 가능
 *
 * - Body 스크롤 비활성화
 * - 스크롤바 너비 보정 (레이아웃 시프트 방지)
 * - 스크롤 위치 복원
 *
 * @param isLocked - true일 때 스크롤 잠금
 *
 * @example
 * ```tsx
 * function Modal({ isOpen, onClose, children }) {
 *   useBodyScrollLock(isOpen);
 *   return <div>...</div>
 * }
 * ```
 */
export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) {
      return;
    }

    const body = document.body;

    const orgPos = body.style.position;
    const orgTop = body.style.top;
    const orgWidth = body.style.width;
    const orgPaddingRight = body.style.paddingRight;

    const scrollY = window.scrollY;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.position = orgPos;
      body.style.top = orgTop;
      body.style.width = orgWidth;
      body.style.paddingRight = orgPaddingRight;
      window.scrollTo(0, scrollY);
    };
  }, [isLocked]);
}
