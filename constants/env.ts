import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    POSTGRES_URL: z.url(),
    PRISMA_DATABASE_URL: z.url(),
    AUTH_SECRET: z.string().min(32),
    RESEND_API_KEY: z.string(),
    RESEND_FROM_EMAIL: z.email(),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.url().default('http://localhost:3000'),
  },
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    POSTGRES_URL: process.env.POSTGRES_URL,
    PRISMA_DATABASE_URL: process.env.PRISMA_DATABASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
  },
});
