import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/schema.ts',
  out: 'drizzle/',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgres://postgres:pass123@localhost:5432/gator?sslmode=disable',
  },
});
