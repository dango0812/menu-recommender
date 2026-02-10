'use client';

import { useState } from 'react';

import { Hamburger, Salad } from 'lucide-react';

import { Flex, Tab } from '@/components/base';

export default function Home() {
  const [tab, setTab] = useState('home');

  return (
    <main className="px-5 pt-5 pb-8">
      <Tab value={tab} onChange={setTab} fullWidth>
        <Tab.Item value="home">
          <Flex alignItems="center" justifyContent="center" className="gap-2.5">
            <Salad size={20} />
            한식 추천
          </Flex>
        </Tab.Item>
        <Tab.Item value="delivery">
          <Flex alignItems="center" justifyContent="center" className="gap-2.5">
            <Hamburger size={20} />
            배달음식 추천
          </Flex>
        </Tab.Item>
      </Tab>
    </main>
  );
}
