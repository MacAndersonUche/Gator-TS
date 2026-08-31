import { User } from './schema.js';

export interface Config {
  db_url: string;
  current_user_name: string;
}

export type UserCommandHandler = (
  user: User,
  ...args: string[]
) => Promise<void>;

export type CommandHandler = (...args: string[]) => void;

export type CommandsRegistry = Record<string, CommandHandler>;

export type MiddlewareLoggedIn = (
  handler: UserCommandHandler,
) => CommandHandler;


export type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

export type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};
