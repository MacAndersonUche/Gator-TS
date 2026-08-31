import { addFeedHandler } from './handlers/addfeed.js';
import { aggHandler } from './handlers/agg.js';
import { getLastedPostsHandler } from './handlers/browse.js';
import { feedsHandler } from './handlers/feeds.js';
import { addFeedFollowerHandler } from './handlers/follow.js';
import { getFeedFollowsForUserHandler } from './handlers/following.js';
import { loginHandler } from './handlers/login.js';
import { registerHandler } from './handlers/register.js';
import { resetHandler } from './handlers/reset.js';
import { unfollowFeedsHandler } from './handlers/unfollow.js';
import { usersHandler } from './handlers/users.js';
import { fetchFeed } from './lib/client/fetchFeed.js';
import { connection } from './lib/db/index.js';
import { middlewareLoggedIn } from './middlewares.js';
import { registerCommand, runCommand } from './registry.js';

async function main() {
  const { argv } = process;

  const registry = {};

  const cmdName = argv[2];

  if (argv.length < 4 && (cmdName === 'login' || cmdName === 'register')) {
    throw Error('username is required');
  }

  switch (cmdName) {
    case 'login':
      registerCommand(registry, argv[2], loginHandler);
      await runCommand(registry, argv[2], ...argv);
      break;

    case 'register':
      registerCommand(registry, argv[2], registerHandler);
      await runCommand(registry, argv[2], ...argv);
      break;

    case 'reset':
      registerCommand(registry, argv[2], resetHandler);
      await runCommand(registry, argv[2], ...argv);
      break;

    case 'users':
      registerCommand(registry, argv[2], usersHandler);
      await runCommand(registry, argv[2], ...argv);
      break;

    case 'addfeed':
      registerCommand(
        registry,
        argv[2],
        await middlewareLoggedIn(addFeedHandler),
      );
      await runCommand(registry, argv[2], ...argv);

      break;

    case 'follow':
      registerCommand(
        registry,
        argv[2],
        await middlewareLoggedIn(addFeedFollowerHandler),
      );
      await runCommand(registry, argv[2], ...argv);
      break;

    case 'following':
      registerCommand(
        registry,
        argv[2],
        await middlewareLoggedIn(getFeedFollowsForUserHandler),
      );
      await runCommand(registry, argv[2], ...argv);
      break;

    case 'unfollow':
      registerCommand(
        registry,
        argv[2],
        await middlewareLoggedIn(unfollowFeedsHandler),
      );
      await runCommand(registry, argv[2], ...argv);
      break;

    case 'browse':
      registerCommand(
        registry,
        argv[2],
        await middlewareLoggedIn(getLastedPostsHandler),
      );
      await runCommand(registry, argv[2], ...argv);
      break;

    case 'agg':
      // const feedObj = await fetchFeed('https://www.wagslane.dev/index.xml');
      // console.log({ feedObj });
      await aggHandler(...argv);
      break;

    case 'feeds':
      await feedsHandler();
      break;

    default:
      throw Error('Unknown command');
  }

  connection.end();
  // process.exit(1);
}

main().then(console.log);

//psql "postgres://postgres:pass123@localhost:5432/gator"
