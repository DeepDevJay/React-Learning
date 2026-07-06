import Link from './Link';
import { gql } from '@apollo/client';
import type { TypedDocumentNode } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

type LinkItem = {
  id: string;
  description: string;
  url: string;
};

type FeedData = {
  feed: {
    id: string;
    links: LinkItem[];
  };
};

const FEED_QUERY = gql`
  query GetFeed {
    feed {
      id
      links {
        id
        createdAt
        url
        description
      }
    }
  }
` as TypedDocumentNode<FeedData, Record<string, never>>;

const LinkList = () => {
  const { data } = useQuery(FEED_QUERY);

  return (
    <div>
      {data?.feed.links.map((link) => (
        <Link key={link.id} link={link} />
      ))}
    </div>
  );
};

export default LinkList;
