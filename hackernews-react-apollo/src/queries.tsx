import { gql } from '@apollo/client';
import type { TypedDocumentNode } from '@apollo/client';

export type LinkItem = {
  id: string;
  description: string;
  url: string;
  createdAt: string;
  votes: Array<{ id: string; user: { id: string } }>;
  postedBy: {
    id: string;
    name: string;
  } | null;
};

export type FeedData = {
  feed: {
    id: string;
    links: LinkItem[];
  };
};

export const FEED_QUERY = gql`
  query GetFeed {
    feed {
      id
      links {
        id
        createdAt
        url
        description
        votes {
          id
          user {
            id
          }
        }
        postedBy {
          id
          name
        }
      }
    }
  }
` as TypedDocumentNode<FeedData, Record<string, never>>;

export type SearchData = {
  search: LinkItem[];
};

export type SearchVars = {
  filter: string;
};

export const SEARCH_QUERY = gql`
  query Search($filter: String!) {
    search(searchText: $filter) {
      id
      createdAt
      url
      description
      votes {
        id
        user {
          id
        }
      }
      postedBy {
        id
        name
      }
    }
  }
` as TypedDocumentNode<SearchData, SearchVars>;

export type FeedSearchVars = {
  filter: string;
};

export const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      id
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
` as TypedDocumentNode<FeedData, FeedSearchVars>;
