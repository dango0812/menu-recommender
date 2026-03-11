'use client';

import { createContext, useCallback, useContext } from 'react';

import { cva } from 'class-variance-authority';

import { cn } from '@/lib/tailwind-merge';

const tabItemVariants = cva(
  'relative flex-shrink-0 rounded-full px-8 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200',
  {
    variants: {
      selected: {
        true: 'bg-white text-primary shadow-sm',
        false: 'text-tab-unselected bg-transparent',
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
  fullWidth: boolean;
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

function TabItem({ children, value, disabled = false, className }: TabItemProps) {
  const { value: selectedValue, onChange, fullWidth } = useTabContext();
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
      className={cn(tabItemVariants({ selected, disabled }), { 'flex-1': fullWidth }, className)}
    >
      {children}
    </button>
  );
}

interface TabProps {
  children: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  fullWidth?: boolean;
  className?: string;
}

function Tab({ children, value, onChange, fullWidth = false, className }: TabProps) {
  return (
    <TabContext.Provider value={{ value, onChange, fullWidth }}>
      <div
        role="tablist"
        aria-label="탭 목록"
        className={cn(
          'bg-tab flex rounded-full p-1.5',
          {
            'w-full': fullWidth,
            'w-fit': !fullWidth,
          },
          className
        )}
      >
        {children}
      </div>
    </TabContext.Provider>
  );
}

export default Object.assign(Tab, {
  Item: TabItem,
});
