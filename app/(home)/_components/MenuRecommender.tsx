'use client';

import { useState } from 'react';

import { Hamburger, Salad } from 'lucide-react';

import { Flex, Tab } from '@/components/base';

import { DeliveryFoodPanel, HomeFoodPanel } from './Panels';

const TAB_CONFIG = [
  { label: '집밥', value: 'home_food', icon: Salad },
  { label: '배달', value: 'delivery_food', icon: Hamburger },
];

export function MenuRecommender() {
  const [tab, setTab] = useState(TAB_CONFIG[0].value);

  return (
    <>
      <Tab value={tab} onChange={setTab} fullWidth>
        {TAB_CONFIG.map(({ label, value, icon: Icon }) => (
          <Tab.Item key={value} value={value}>
            <Flex alignItems="center" justifyContent="center" className="gap-2.5">
              <Icon size={20} />
              {label}
            </Flex>
          </Tab.Item>
        ))}
      </Tab>

      {tab === TAB_CONFIG[0].value && <HomeFoodPanel />}
      {tab === TAB_CONFIG[1].value && <DeliveryFoodPanel />}
    </>
  );
}
