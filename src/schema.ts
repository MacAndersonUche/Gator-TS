import { pgTable, timestamp, uuid, text } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  name: text('name').notNull().unique(),
});

export const feeds = pgTable('feeds', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  name: text('name').notNull(),
  url: text('url').notNull().unique(),
  lastFetched: timestamp('last_fetched', { withTimezone: true }),
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
});

export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  title: text('name'),
  description: text('description'),
  url: text('url').notNull().unique(),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  feedId: uuid('feed_id')
    .references(() => feeds.id, { onDelete: 'cascade' })
    .notNull(),
});

export const feedFollows = pgTable('feed_follows', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  feedId: uuid('feed_id')
    .references(() => feeds.id, { onDelete: 'cascade' })
    .notNull(),
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
});

export type User = typeof users.$inferSelect;

export type Feed = typeof feeds.$inferSelect;

export type FeedFollows = typeof feedFollows.$inferSelect;

export type Post = typeof posts.$inferSelect;
