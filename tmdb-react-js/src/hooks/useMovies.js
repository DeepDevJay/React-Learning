// src/hooks/useMovies.js
import { useQuery } from "@apollo/client/react";
import { GET_MOVIES } from "../graphql/movies/queries";

export default function useMovies(filter, sort) {
  return useQuery(GET_MOVIES, {
    variables: {
      filter,
      sort,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });
}
