import { XMLParser } from 'fast-xml-parser';
import { RSSFeed, RSSItem } from '../../types.js';

export async function fetchFeed(feedURL: string) {
  try {
    const res = await fetch(feedURL, {
      headers: {
        'User-Agent': 'gator',
      },
    });

    const data = await res.text();

    const feed = new XMLParser({ processEntities: false }).parse(data) as {
      rss: RSSFeed;
    };

    console.log({ feed });

    if (!feed.rss.channel) {
      throw Error('Channel not present on the feed');
    }

    const { channel } = feed.rss;
    if (!channel.title || !channel.link || !channel.description) {
      throw Error('Channel is not complete, missing fields');
    }

    const { title, link, description, item: channelItem } = channel;

    let extractedItems: RSSItem[] = [];
    if (channelItem && Array.isArray(channelItem)) {
      extractedItems = channelItem;
    }

    const validItems = extractedItems.filter((item) => {
      return (
        !!item.title && !!item.description && !!item.link && !!item.pubDate
      );
    });

    console.log({ validItems });
    return {
      title,
      link,
      description,
      items: validItems,
    };
  } catch (error) {
    console.log(error);
  }
}

