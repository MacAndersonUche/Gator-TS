import { eq, sql } from 'drizzle-orm';
import { feedFollows, Post, posts, users } from '../../../schema.js';
import { db } from '../index.js';

export async function createPost(
  post: Pick<Post, 'url' | 'feedId' | 'title' | 'description' | 'publishedAt'>,
) {
  const [result] = await db.insert(posts).values(post).returning();
  return result;
}

export async function getPostsForUser(userId: string, limit: number) {
  return db
    .select()
    .from(feedFollows)
    .innerJoin(posts, eq(feedFollows.feedId, posts.feedId))
    .where(eq(feedFollows.userId, userId))
    .orderBy(sql`${posts.publishedAt} desc`)
    .limit(limit);
}
