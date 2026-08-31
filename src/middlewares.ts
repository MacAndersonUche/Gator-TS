import { readConfig } from './config.js';
import { getUserByName } from './lib/db/queries/users.js';
import { CommandHandler, UserCommandHandler } from './types.js';

export const middlewareLoggedIn = async (handler: UserCommandHandler) => {
  return async (...args: string[]) => {
    const userName = readConfig()?.current_user_name;
    if (!userName) {
      throw new Error('User not logged in');
    }
    const user = await getUserByName(userName);
    if (!user) {
      throw new Error(`User ${userName} not found`);
    }
    return handler(user, ...args);
  };
};
