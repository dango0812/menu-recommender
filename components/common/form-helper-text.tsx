import { type PropsWithChildren } from 'react';

import { Text } from '@/components/ui';

export function FormHelperText({ children }: PropsWithChildren) {
  return (
    <Text as="p" role="alert" aria-live="polite" aria-atomic="true" className="pl-1 text-xs text-error">
      {children}
    </Text>
  );
}
