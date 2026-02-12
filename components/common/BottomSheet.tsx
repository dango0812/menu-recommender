'use client';

import { type ReactNode, useRef } from 'react';

import { AnimatePresence, m, type PanInfo, useMotionValue } from 'framer-motion';

import { useBodyScrollLock } from '@/hooks';
import { cn } from '@/lib/tailwind-merge';

import { Flex } from '../base';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  /**
   * 드래그로 닫기 비활성화
   * @default false
   */
  disableDragClose?: boolean;
  /**
   * 백드롭 클릭으로 닫기 비활성화
   * @default false
   */
  disableBackdropClose?: boolean;
  /**
   * 최대 높이 (vh 단위)
   * @default 80
   */
  maxHeight?: number;
  /**
   * 닫기 임계값 (px)
   * @default 100
   */
  closeThreshold?: number;
}

export function BottomSheet({
  isOpen,
  onClose,
  children,
  className,
  disableDragClose = false,
  disableBackdropClose = false,
  maxHeight = 80,
  closeThreshold = 100,
}: BottomSheetProps) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const offsetY = useMotionValue(0);

  useBodyScrollLock(isOpen);

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (disableDragClose) {
      return;
    }

    // 위로 드래그면 무시해서 시트가 올라가지 않도록 함
    if (info.offset.y < 0) {
      offsetY.set(0);
    }
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (disableDragClose) {
      return;
    }

    // 위로 드래그된 상태면 무시
    if (info.offset.y < 0) {
      return;
    }

    // 빠른 스와이프 (velocity > 700) 또는 임계값 초과 시 닫기
    if (info.velocity.y > 700 || info.offset.y > closeThreshold) {
      onCloseRef.current();
    }
  };

  const handleBackdropClick = () => {
    if (!disableBackdropClose) {
      onCloseRef.current();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleBackdropClick}
            className="fixed inset-0 z-40 bg-black/50"
          />

          {/* BottomSheet Container */}
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            <m.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{
                type: 'spring',
                damping: 30,
                stiffness: 300,
              }}
              drag={disableDragClose ? false : 'y'}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.5 }}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              style={{
                y: offsetY,
                maxHeight: `${maxHeight}vh`,
              }}
              className={cn(
                'pointer-events-auto w-full max-w-(--width-max-app) rounded-t-3xl bg-white shadow-lg',
                className
              )}
            >
              <Flex direction="column">
                {/* Drag Handle */}
                <Flex alignItems="center" justifyContent="center" className="py-3">
                  <div className="h-1.5 w-12 rounded-full bg-gray-300" />
                </Flex>

                {/* Content */}
                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-6">{children}</div>
              </Flex>
            </m.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
