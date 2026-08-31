import { createFeed, createFeedFollow } from '../lib/db/queries/feeds.js';
import { printFeed } from '../lib/helpers/index.js';
import { User } from '../schema.js';

export const addFeedHandler = async (user: User, ...args: string[]) => {
  console.log(args.length);
  if (args.length < 4) {
    throw Error('the addfeed handler expects more arguments');
  }

  //extract name and url
  const name = args[3];
  const url = args[4];

  //create the feed object
  const feedCreated = await createFeed({ url, userId: user.id, name });

  //create feed follow
  console.log('Feed created', feedCreated);
  await createFeedFollow({ feedId: feedCreated.id, userId: user.id });

  printFeed(feedCreated, user);
};
