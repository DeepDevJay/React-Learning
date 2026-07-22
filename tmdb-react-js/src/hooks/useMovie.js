import { useQuery } from "@apollo/client/react";

import { GET_MOVIE } from "../graphql/movies/queries";

export default function useMovie(id) {
  return useQuery(GET_MOVIE, {
    variables: {
      id,
    },
    skip: !id,
    fetchPolicy: "cache-and-network",
  });
}
