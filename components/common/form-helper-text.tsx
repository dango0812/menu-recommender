import { type PropsWithChildren } from 'react';

import { Text } from '@/components/ui';

export function FormHelperText({ children }: PropsWithChildren) {
  return (
    <Text as="p" className="pl-1 text-xs text-error">
      {children}
    </Text>
  );
}
