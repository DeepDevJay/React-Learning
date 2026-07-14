import { useQuery } from "@apollo/client/react";
import { GET_MOVIE } from "../graphql/movies/queries";

export default function useMovie(movieId) {
  return useQuery(GET_MOVIE, {
    variables: {
      movieId,
    },
    skip: !movieId,
  });
}
