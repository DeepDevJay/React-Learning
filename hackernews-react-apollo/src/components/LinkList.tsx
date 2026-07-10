import { useEffect } from 'react';
import Link from './Link';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { FEED_QUERY, type FeedData, type LinkItem } from '../queries';
import { useLocation, useNavigate } from 'react-router-dom';
import { LINKS_PER_PAGE } from '../constants';

type NewLinkSubscriptionData = {
  newLink: LinkItem;
};

type NewVoteSubscriptionData = {
  newVote: {
    id: string;
    link: LinkItem;
    user: { id: string };
  };
};

const NEW_LINKS_SUBSCRIPTION = gql`
  subscription {
    newLink {
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
`;

const NEW_VOTES_SUBSCRIPTION = gql`
  subscription {
    newVote {
      id
      link {
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
      user {
        id
      }
    }
  }
`;

const getQueryVariables = (isNewPage: boolean, page: number) => {
  const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
  const take = isNewPage ? LINKS_PER_PAGE : 100;
  const orderBy = { createdAt: 'desc' as const };
  return { take, skip, orderBy };
};

const getLinksToRender = (isNewPage: boolean, data: FeedData): LinkItem[] => {
  if (isNewPage) {
    return data.feed.links;
  }
  const rankedLinks = data.feed.links.slice();
  rankedLinks.sort((l1, l2) => l2.votes.length - l1.votes.length);
  return rankedLinks;
};

const LinkList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isNewPage = location.pathname.includes('new');
  const pageIndexParams = location.pathname.split('/');
  const parsedPage = parseInt(pageIndexParams[pageIndexParams.length - 1]);
  const page = Number.isNaN(parsedPage) ? 1 : parsedPage;
  const pageIndex = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;

  const { data, loading, error, subscribeToMore } = useQuery<FeedData>(FEED_QUERY, {
    variables: getQueryVariables(isNewPage, page),
  });

  useEffect(() => {
    const unsubscribeLinks = subscribeToMore<NewLinkSubscriptionData>({
      document: NEW_LINKS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev as FeedData;
        if (!prev.feed?.links) return prev as FeedData;

        const newLink = subscriptionData.data.newLink;
        const exists = prev.feed.links.some((link) => link?.id === newLink.id);
        if (exists) return prev as FeedData;

        return {
          feed: {
            id: prev.feed.id ?? '',
            links: [newLink, ...prev.feed.links.filter((link): link is LinkItem => !!link)],
            count: prev.feed.links.length + 1,
          },
        };
      },
    });

    const unsubscribeVotes = subscribeToMore<NewVoteSubscriptionData>({
      document: NEW_VOTES_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev as FeedData;
        if (!prev.feed?.links) return prev as FeedData;

        const newVote = subscriptionData.data.newVote;

        return {
          feed: {
            id: prev.feed.id ?? '',
            links: prev.feed.links
              .filter((link): link is LinkItem => !!link)
              .map((link) => (link.id === newVote.link.id ? { ...link, votes: newVote.link.votes } : link)),
            count: prev.feed.count ?? prev.feed.links.length,
          },
        };
      },
    });

    return () => {
      unsubscribeLinks();
      unsubscribeVotes();
    };
  }, [subscribeToMore]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && (
        <>
          {getLinksToRender(isNewPage, data).map((link, index) => (
            <Link key={link.id} link={link} index={index + pageIndex} />
          ))}
          {isNewPage && (
            <div className="flex ml4 mv3 gray">
              <div
                className="pointer mr2"
                onClick={() => {
                  if (page > 1) {
                    navigate(`/new/${page - 1}`);
                  }
                }}
              >
                Previous
              </div>
              <div
                className="pointer"
                onClick={() => {
                  if (page <= data.feed.count / LINKS_PER_PAGE) {
                    const nextPage = page + 1;
                    navigate(`/new/${nextPage}`);
                  }
                }}
              >
                Next
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default LinkList;