import { gql } from '@apollo/client';
import type { TypedDocumentNode } from '@apollo/client';
import { AUTH_TOKEN, LINKS_PER_PAGE } from '../constants';
import { timeDifferenceForDate } from '../utils';
import { useMutation } from '@apollo/client/react';
import { FEED_QUERY, type FeedData, type LinkItem } from '../queries';

interface LinkProps {
  link: {
    id: string;
    description: string;
    url: string;
    createdAt: string;
    votes: Array<{ id: string }>;
    postedBy: {
      name: string;
    } | null;
  };
  index: number;
}

type VoteData = {
  vote: {
    id: string;
    link: {
      id: string;
      votes: Array<{
        id: string;
        user: {
          id: string;
        };
      }>;
    };
    user: {
      id: string;
    };
  };
};

type VoteVars = {
  linkId: string;
};

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
` as TypedDocumentNode<VoteData, VoteVars>;

const Link = ({ link, index }: LinkProps) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const take = LINKS_PER_PAGE;
  const skip = 0;
  const orderBy = { createdAt: 'desc' };

  const [voteMutation] = useMutation(VOTE_MUTATION);

  const handleVote = () => {
    voteMutation({
      variables: {
        linkId: link.id
      },
      update: (cache, { data }) => {
        if (!data?.vote) return;

        const cachedData = cache.readQuery<FeedData>({ query: FEED_QUERY, variables: { take, skip, orderBy } });

        if (!cachedData?.feed) return;

        const updatedLinks = cachedData.feed.links.map((feedLink: LinkItem) => {
          if (feedLink.id === link.id) {
            return {
              ...feedLink,
              votes: [...feedLink.votes, data.vote]
            };
          }
          return feedLink;
        });

        cache.writeQuery<FeedData>({
          query: FEED_QUERY,
          data: {
            feed: {
              id: cachedData.feed.id,
              links: updatedLinks,
              count: cachedData.feed.count,
            }
          },
          variables: {
            take,
            skip,
            orderBy
          }
        });
      }
    });
  }; 

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}.</span>
        {authToken && (
          <div
            className="ml1 gray f11"
            style={{ cursor: 'pointer' }}
            onClick={handleVote}
          >
            ▲
          </div>
        )}
      </div>
      <div className="ml1">
        <div>
          {link.description} ({link.url})
        </div>
        <div className="f6 lh-copy gray">
          {link.votes.length} votes | by{' '}
          {link.postedBy ? link.postedBy.name : 'Unknown'}{' '}
          {timeDifferenceForDate(link.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default Link;