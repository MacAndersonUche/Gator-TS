import { setUser } from '../config.js';
import { createUser, getUserByName } from '../lib/db/queries/users.js';
import { CommandHandler } from '../types.js';

export const registerHandler: CommandHandler = async (...args: string[]) => {
  if (args.length === 0) {
    throw Error('the register handler expects a single argument, the username');
  }

  const userToSet = args[3]

  const foundUser = await getUserByName(userToSet);

  if (foundUser) {
    throw Error('User already exists on db');
  }

  const createdUser = await createUser(userToSet);

  
  setUser({
    current_user_name: userToSet,
    db_url: 'postgres://postgres:pass123@localhost:5432/gator?sslmode=disable',
  });
  console.log(`User ${userToSet} has been set`);

  console.log(`User has been created ${JSON.stringify(createdUser)}`);
};
