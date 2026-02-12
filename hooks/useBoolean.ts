'use client';

import { useCallback, useState } from 'react';

interface UseBooleanOptions {
  value: boolean;
  onTrue: () => void;
  onFalse: () => void;
  onToggle: () => void;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * boolean 상태를 쉽게 다루기 위한 Hook
 *
 * @param defaultValue 초기 boolean 값
 *
 * @example
 * ```tsx
 * const { value, onTrue, onFalse, onToggle } = useBoolean(false);
 *
 * return (
 *   <>
 *     <div>Value: {value.toString()}</div>
 *     <button onClick={onTrue}>Set True</button>
 *     <button onClick={onFalse}>Set False</button>
 *     <button onClick={onToggle}>Toggle</button>
 *   </>
 * );
 * ```
 */
export function useBoolean(defaultValue?: boolean): UseBooleanOptions {
  const [value, setValue] = useState(Boolean(defaultValue));

  const onTrue = useCallback(() => {
    setValue(true);
  }, []);

  const onFalse = useCallback(() => {
    setValue(false);
  }, []);

  const onToggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);

  return {
    value,
    onTrue,
    onFalse,
    onToggle,
    setValue,
  };
}
