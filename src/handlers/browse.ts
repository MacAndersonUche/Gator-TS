import { getPostsForUser } from '../lib/db/queries/posts.js';
import { User } from '../schema.js';

export const getLastedPostsHandler = async (user: User, ...args: string[]) => {
  const limit = args[3] ? parseInt(args[3]) : 2;
  const latestPosts = await getPostsForUser(user.id, limit);

  console.log(latestPosts);
};
