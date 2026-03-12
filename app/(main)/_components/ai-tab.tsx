'use client';

import { ArrowRight, Camera, ImageIcon, Sparkles } from 'lucide-react';

import { Button, Card, Chip, Flex, Input, Text } from '@/components/ui';

export function AiTab() {
  return (
    <Flex direction="column" className="gap-10 py-2.5">
      <Flex direction="column" alignItems="center" justifyContent="center" className="gap-2">
        <Text as="h2" className="flex items-center text-center text-2xl font-bold sm:text-3xl">
          <Text className="text-primary">AI&nbsp;</Text> 마스터 셰프
        </Text>
        <Text className="text-center text-sm whitespace-pre-line text-slate-500">
          {`먹고싶은 음식을 입력하거나, 냉장고 속 재료 사진을 찍어보세요.\nAI 마스터 셰프가 맛있는 메뉴를 추천해줄게요.`}
        </Text>
      </Flex>
      <Card className="p-0">
        <Flex alignItems="center" className="gap-2 px-3">
          <Input
            fullWidth
            startDecorator={<Sparkles size={18} className="text-primary" />}
            placeholder="어떤 음식을 찾으시나요? (예: 매콤하고 가벼운 저녁 메뉴 추천해줘)"
            className="h-14 border-none bg-transparent shadow-none"
          />
          <Button color="primary" className="h-8 w-8 shrink-0 rounded-full p-0" disabled>
            <ArrowRight size={16} />
          </Button>
        </Flex>

        <div className="h-px bg-gray-100" />

        <Flex alignItems="center" className="px-3 py-1.5">
          <Button color="light" size="sm" className="text-sm text-gray-500 hover:text-gray-700">
            <Camera size={16} />
            사진 촬영
          </Button>
          <Button color="light" size="sm" className="text-sm text-gray-500 hover:text-gray-700">
            <ImageIcon size={16} />
            이미지 업로드
          </Button>
        </Flex>
      </Card>
      <Flex alignItems="center" justifyContent="center" className="flex-wrap gap-2">
        {['다이어트 식단', '아이들 간식 추천', '15분 요리', '술 안주 추천', '저녁 추천', '닭가슴살 추천'].map(tag => (
          <Chip
            key={tag}
            size="sm"
            className="bg-slate-100 text-xs text-gray-500 hover:bg-slate-100 active:bg-slate-100"
          >
            #{tag}
          </Chip>
        ))}
      </Flex>
    </Flex>
  );
}
