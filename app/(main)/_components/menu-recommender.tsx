'use client';

import { type PropsWithChildren, useState } from 'react';

import { Bike, ChefHat, Sparkles } from 'lucide-react';

import { Card, Tab } from '@/components/ui';

import { AiTab } from './ai-tab';
import { DeliveryTab } from './delivery-tab';
import { HomeMealTab } from './home-meal-tab';

const TABS = [
  { value: 'home-meal', label: '집밥', icon: ChefHat },
  { value: 'delivery', label: '배달', icon: Bike },
  { value: 'ai', label: 'AI 추천', icon: Sparkles },
] as const;

type TabValue = (typeof TABS)[number]['value'];

const TAB_CONTENT: Record<TabValue, React.ReactNode> = {
  'home-meal': <HomeMealTab />,
  delivery: <DeliveryTab />,
  ai: <AiTab />,
};

export function MenuRecommender() {
  const [tab, setTab] = useState<TabValue>('home-meal');

  const handleTabChange = (value: string) => {
    setTab(value as TabValue);
  };

  return (
    <Card className="p-0">
      <Tab value={tab} onChange={handleTabChange}>
        {TABS.map(({ value, label, icon: Icon }) => (
          <Tab.Item key={value} value={value}>
            <Icon size={14} />
            {label}
          </Tab.Item>
        ))}
      </Tab>

      <TabView>{TAB_CONTENT[tab]}</TabView>
    </Card>
  );
}

function TabView({ children }: PropsWithChildren) {
  return <div className="p-5">{children}</div>;
}
