import { Feed, User } from '../../schema.js';

export const printFeed = (feed: Feed, user: User) => {
  console.log('User:', user);
  console.log('Feed:', feed);
};
