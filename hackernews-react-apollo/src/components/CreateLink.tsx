import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import type { TypedDocumentNode } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { FEED_QUERY, type FeedData } from '../queries';

type Link = {
  id: string;
  createdAt: string;
  url: string;
  description: string;
  postedBy: {
    id: string;
    name: string;
  } | null;
  votes: {
    id: string;
    user: {
      id: string;
    };
  }[];
};

type CreateLinkData = {
  post: Link;
};

type CreateLinkVars = {
  description: string;
  url: string;
};

type FormState = {
  description: string;
  url: string;
};

const CREATE_LINK_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
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
` as TypedDocumentNode<CreateLinkData, CreateLinkVars>;

const CreateLink = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState<FormState>({ description: '', url: '' });
  const [createLink] = useMutation(CREATE_LINK_MUTATION);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name as keyof FormState;
    const { value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    createLink({
      variables: {
        description: formState.description,
        url: formState.url
      },
      update: (cache, { data }) => {
        if (!data?.post) return;

        const cachedData = cache.readQuery<FeedData>({ query: FEED_QUERY });

        if (!cachedData?.feed) return;

        cache.writeQuery({
          query: FEED_QUERY,
          data: {
            feed: {
              id: cachedData.feed.id,
              links: [data.post, ...cachedData.feed.links],
              count: cachedData.feed.count + 1,
            },
          },
        });
      },
      onCompleted: () => navigate('/')
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            name="description"
            value={formState.description}
            onChange={handleChange}
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb2"
            name="url"
            value={formState.url}
            onChange={handleChange}
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateLink;