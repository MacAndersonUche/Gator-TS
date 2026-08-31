import { scrapeFeeds } from '../lib/client/scrapeFeeds.js';

export const aggHandler = async (...args: string[]) => {
  const time_between_reqs = args[3];

  const regex = /^(\d+)(ms|s|m|h)$/;
  const match = time_between_reqs.match(regex);

  if (!match) {
    throw Error('Does not match');
  }
  const interval = setInterval(() => {
    scrapeFeeds().catch(console.error);
  }, parseInt(time_between_reqs));

  await new Promise<void>((resolve) => {
    process.on('SIGINT', () => {
      console.log('Shutting down feed aggregator...');
      clearInterval(interval);
      resolve();
    });
  });
};
