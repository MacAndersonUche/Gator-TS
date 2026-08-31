import { getAllFeeds } from '../lib/db/queries/feeds.js';
import { getUsers } from '../lib/db/queries/users.js';

export const feedsHandler = async () => {
  let final = '<ul>';
  const allUsers = await getUsers();
  const allFeeds = await getAllFeeds();

  for (const { name, url, userId } of allFeeds) {
    final +=
      '<li>' +
      `Feed: ${name}, 
       url: ${url}, 
       userCreated: ${allUsers.find((user) => user.id === userId)?.name}` +
      '</li>';
  }

  final += '</ul>';

  console.log(final);
};
