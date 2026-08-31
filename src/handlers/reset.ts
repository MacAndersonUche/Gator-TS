import { deleteAllFeeds } from '../lib/db/queries/feeds.js';
import { deleteAllUsers } from '../lib/db/queries/users.js';
import { CommandHandler } from '../types.js';

export const resetHandler: CommandHandler = async (...args: string[]) => {
  if (args.length === 0) {
    throw Error('the reset handler expects a single argument');
  }

  await deleteAllUsers();

  await deleteAllFeeds();

  console.log('All tables have been reset');
  return;
};
