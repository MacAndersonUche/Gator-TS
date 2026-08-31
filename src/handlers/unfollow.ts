import { deleteFeedFollow, getFeedByUrl } from '../lib/db/queries/feeds.js';
import { User } from '../schema.js';

export const unfollowFeedsHandler = async (user: User, ...args: string[]) => {
  console.log(args.length);
  if (args.length < 4) {
    throw Error('the addfeed handler expects more arguments');
  }

  //extract name and url
  const url = args[3];

  //get feed by url
  const { id: feedId, name: feedName } = await getFeedByUrl(url);

  //create the feed object
  await deleteFeedFollow({ feedId, userId: user.id });

  console.log(`FeedName: ${feedName}, currentUser: ${user.name}`);

  // return feedFollow;
};
