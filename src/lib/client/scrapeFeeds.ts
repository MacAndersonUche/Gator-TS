import { getNextFeedToFetch, markFeedFetched } from '../db/queries/feeds.js';
import { createPost } from '../db/queries/posts.js';
import { fetchFeed } from './fetchFeed.js';

export async function scrapeFeeds() {
  const nextFeed = await getNextFeedToFetch();

  if (!nextFeed) return;

  const fetchedFeed = await fetchFeed(nextFeed.url);

  if (!fetchedFeed) {
    throw Error('Cant fetch feed');
  }

  await markFeedFetched(nextFeed.id);

  let final = '<ul>';
  for (const { title, link, description, pubDate } of fetchedFeed.items) {
    await createPost({
      title,
      description,
      url: link,
      publishedAt: new Date(pubDate),
      feedId: nextFeed.id,
    });
    final += `<li>+
      Feed: ${title}
      </li>`;
  }

  final += '</ul>';

  console.log(final);
}
