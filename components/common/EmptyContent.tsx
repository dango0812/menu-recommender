import { Flex, Lottie, Text } from '@/components/ui';

interface EmptyContentProps {
  height?: number;
  title: string;
  description?: string;
}

export function EmptyContent({ height = 260, title, description }: EmptyContentProps) {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: height }}
      className="w-full text-center"
    >
      <Lottie src="/lotties/empty-box.json" loop={false} className="h-60" />

      <Text className="mt-4 text-lg font-semibold text-gray-700">{title}</Text>
      {description && <Text className="mt-2 text-sm whitespace-pre-line text-gray-500">{description}</Text>}
    </Flex>
  );
}
