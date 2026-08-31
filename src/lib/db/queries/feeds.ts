import { and, eq, sql } from 'drizzle-orm';
import {
  Feed,
  feedFollows,
  FeedFollows,
  feeds,
  users,
} from '../../../schema.js';
import { db } from '../index.js';

export async function createFeed(feed: Pick<Feed, 'url' | 'userId' | 'name'>) {
  const [result] = await db.insert(feeds).values(feed).returning();
  return result;
}

export async function getAllFeeds() {
  const result = await db.select().from(feeds);

  return result;
}

export async function getFeedByUrl(url: string) {
  const result = await db
    .select()
    .from(feeds)
    .where(sql`${feeds.url} = ${url}`);

  return result[0];
}

export async function deleteAllFeeds() {
  await db.delete(feeds);
}

export async function createFeedFollow(
  params: Pick<FeedFollows, 'userId' | 'feedId'>,
) {
  const [newFeedFollow] = await db
    .insert(feedFollows)
    .values(params)
    .returning();

  const [result] = await db
    .select()
    .from(feedFollows)
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .where(eq(feedFollows.id, newFeedFollow.id));

  return result;
}

export async function deleteFeedFollow({
  userId,
  feedId,
}: Pick<FeedFollows, 'userId' | 'feedId'>) {
  const deleted = await db
    .delete(feedFollows)
    .where(and(eq(feedFollows.userId, userId), eq(feedFollows.feedId, feedId)))
    .returning();

  return deleted;
}

export async function getFeedFollowsForUser(userId: string) {
  const result = await db
    .select()
    .from(feedFollows)
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .where(eq(users.id, userId));

  return result;
}
export async function markFeedFetched(feedId: string) {
  await db
    .update(feeds)
    .set({ lastFetched: new Date() })
    .where(eq(feeds.id, feedId));
}

export async function getNextFeedToFetch() {
  const feed = await db
    .select()
    .from(feeds)
    .orderBy(sql`${feeds.lastFetched} asc nulls first`)
    .limit(1);

  if (!feed.length) {
    return;
  }

  return feed[0];
}
