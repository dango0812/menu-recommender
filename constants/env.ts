import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

import 'server-only';

export const env = createEnv({
  server: {
    FOOD_SAFETY_API_KEY: z.string().min(1),
    FOOD_SAFETY_API_BASE_URL: z.url(),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.url().default('http://localhost:3000'),
  },
  runtimeEnv: {
    FOOD_SAFETY_API_KEY: process.env.FOOD_SAFETY_API_KEY,
    FOOD_SAFETY_API_BASE_URL: process.env.FOOD_SAFETY_API_BASE_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
});
