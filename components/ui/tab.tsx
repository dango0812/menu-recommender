'use client';

import { createContext, useCallback, useContext } from 'react';

import { cva } from 'class-variance-authority';

import { cn } from '@/lib/tailwind-merge';

const tabItemVariants = cva(
  'mb-[-1px] flex-1 border-b-2 py-3.5 text-center text-sm font-medium whitespace-nowrap transition-all duration-200',
  {
    variants: {
      selected: {
        true: 'border-primary text-primary',
        false: 'border-transparent text-slate-400',
      },
      disabled: {
        true: 'cursor-not-allowed opacity-50',
        false: 'cursor-pointer',
      },
    },
    defaultVariants: {
      selected: false,
      disabled: false,
    },
  }
);

interface TabContextValue {
  value: string;
  onChange: (value: string) => void;
}

const TabContext = createContext<TabContextValue | null>(null);

function useTabContext() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('Tab.Item은 Tab 컴포넌트 내부에서만 사용할 수 있어요.');
  }
  return context;
}

interface TabItemProps {
  children: React.ReactNode;
  value: string;
  disabled?: boolean;
  className?: string;
}

/**
 * Tab.Item 컴포넌트
 *
 * `Tab` 컴포넌트 내부에서만 사용할 수 있는 탭 아이템
 *
 * @example
 * ```tsx
 * <Tab.Item value="first">첫 번째</Tab.Item>
 * <Tab.Item value="second" disabled>두 번째 (비활성화)</Tab.Item>
 * ```
 */
function TabItem({ children, value, disabled = false, className }: TabItemProps) {
  const { value: selectedValue, onChange } = useTabContext();
  const selected = value === selectedValue;

  const handleClick = useCallback(() => {
    if (!disabled) {
      onChange(value);
    }
  }, [disabled, onChange, value]);

  return (
    <button
      role="tab"
      type="button"
      aria-selected={selected}
      aria-label={typeof children === 'string' ? children : undefined}
      tabIndex={selected ? 0 : -1}
      disabled={disabled}
      onClick={handleClick}
      className={cn(tabItemVariants({ selected, disabled }), className)}
    >
      {children}
    </button>
  );
}

interface TabProps {
  children: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

/**
 * Tab 컴포넌트
 *
 * @example
 * ```tsx
 * const [tab, setTab] = useState('first');
 *
 * <Tab value={tab} onChange={setTab}>
 *   <Tab.Item value="first">첫 번째</Tab.Item>
 *   <Tab.Item value="second">두 번째</Tab.Item>
 *   <Tab.Item value="third" disabled>세 번째</Tab.Item>
 * </Tab>
 * ```
 */
function Tab({ children, value, onChange, className }: TabProps) {
  return (
    <TabContext.Provider value={{ value, onChange }}>
      <div role="tablist" aria-label="탭 목록" className={cn('flex w-full border-b border-gray-200', className)}>
        {children}
      </div>
    </TabContext.Provider>
  );
}

export default Object.assign(Tab, {
  Item: TabItem,
});
