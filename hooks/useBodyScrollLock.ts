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

    // 모든 DOM 읽기 먼저 수행 (reflow 최소화)
    const scrollY = window.scrollY;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.cssText = `
      position: fixed; 
      top: -${scrollY}px;
      width: 100%;
      overflow-y: scroll;
      padding-right: ${scrollbarWidth}px;
    `;

    return () => {
      document.body.style.cssText = '';
      window.scrollTo(0, scrollY);
    };
  }, [isLocked]);
}
