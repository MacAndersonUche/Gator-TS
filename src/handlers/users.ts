import { readConfig } from '../config.js';
import { getUsers } from '../lib/db/queries/users.js';
import { CommandHandler } from '../types.js';

export const usersHandler = async (...args: string[]) => {
  if (args.length === 0) {
    throw Error('the register handler expects a single argument');
  }

  let final = '<ul>';
  const allUsers = await getUsers();
  const config = readConfig();

  for (const element of allUsers) {
    if (element.name === config?.current_user_name) {
      final += '<li>' + `${element.name} (current)` + '</li>';
    } else {
      final += '<li>' + `${element.name}` + '</li>';
    }
  }

  final += '</ul>';

  console.log(final);
};
