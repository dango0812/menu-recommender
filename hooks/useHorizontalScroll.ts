import { useEffect, useRef } from 'react';

interface UseHorizontalScrollOptions {
  /**
   * 마우스 휠로 좌우 스크롤 활성화
   * @default true
   */
  enableWheelScroll?: boolean;
  /**
   * 드래그로 스크롤 활성화
   * @default true
   */
  enableDragScroll?: boolean;
}

/**
 * 좌우 스크롤 기능을 제공하는 커스텀 Hook
 *
 * @example
 * ```tsx
 * function Component() {
 *   const scrollRef = useHorizontalScroll();
 *
 *   return (
 *     <div ref={scrollRef} className="overflow-x-auto">
 *       {items.map(item => <Chip key={item.id}>{item.name}</Chip>)}
 *     </div>
 *   );
 * }
 * ```
 */
export function useHorizontalScroll<T extends HTMLElement = HTMLDivElement>(options: UseHorizontalScrollOptions = {}) {
  const { enableWheelScroll = true, enableDragScroll = true } = options;
  const scrollRef = useRef<T>(null);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) {
      return;
    }

    // 마우스 휠로 좌우 스크롤
    const handleWheel = (e: WheelEvent) => {
      if (!enableWheelScroll) {
        return;
      }

      // 수평 스크롤이 가능한 경우에만 처리
      if (element.scrollWidth > element.clientWidth) {
        e.preventDefault();
        element.scrollLeft += e.deltaY;
      }
    };

    // 드래그로 스크롤
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    const handleMouseDown = (e: MouseEvent) => {
      if (!enableDragScroll) {
        return;
      }

      isDragging = true;
      startX = e.pageX - element.offsetLeft;
      scrollLeft = element.scrollLeft;
      element.style.cursor = 'grabbing';
      element.style.userSelect = 'none';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !enableDragScroll) {
        return;
      }

      e.preventDefault();
      const x = e.pageX - element.offsetLeft;
      const walk = (x - startX) * 2; // 스크롤 속도
      element.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      if (!enableDragScroll) {
        return;
      }

      isDragging = false;
      element.style.cursor = 'grab';
      element.style.userSelect = '';
    };

    const handleMouseLeave = () => {
      if (!enableDragScroll) {
        return;
      }

      isDragging = false;
      element.style.cursor = 'grab';
      element.style.userSelect = '';
    };

    // 이벤트 리스너 등록
    if (enableWheelScroll) {
      element.addEventListener('wheel', handleWheel, { passive: false });
    }

    if (enableDragScroll) {
      element.style.cursor = 'grab';
      element.addEventListener('mousedown', handleMouseDown);
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseup', handleMouseUp);
      element.addEventListener('mouseleave', handleMouseLeave);
    }

    // 클린업
    return () => {
      if (enableWheelScroll) {
        element.removeEventListener('wheel', handleWheel);
      }

      if (enableDragScroll) {
        element.removeEventListener('mousedown', handleMouseDown);
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseup', handleMouseUp);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [enableWheelScroll, enableDragScroll]);

  return scrollRef;
}
