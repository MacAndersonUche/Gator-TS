import { readConfig, setUser } from '../config.js';
import { getUserByName } from '../lib/db/queries/users.js';
import { CommandHandler } from '../types.js';

export const loginHandler: CommandHandler = async (
  ...args: string[]
) => {
  if (args.length === 0) {
    throw Error('the login handler expects a single argument, the username');
  }

  const userToSet = args[3];

  const foundUser = await getUserByName(userToSet);

  if (!foundUser) {
    throw Error('User DOES NOT exist in db');
  }

  const config = readConfig();

  if (config?.current_user_name === userToSet) {
    throw Error('the user already exists in config file');
  }

  setUser({
    current_user_name: userToSet,
    db_url: 'postgres://postgres:pass123@localhost:5432/gator?sslmode=disable',
  });
  console.log(`User ${userToSet} has been set`);
};
