import {
  getFeedFollowsForUser,
} from '../lib/db/queries/feeds.js';
import { User } from '../schema.js';

export const getFeedFollowsForUserHandler = async (
  user: User,
  ...args: string[]
) => {
  //create the feed object
  const feedFollow = await getFeedFollowsForUser(user.id);

  console.log(feedFollow);

};
