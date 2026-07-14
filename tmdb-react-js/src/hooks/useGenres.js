import { useQuery } from "@apollo/client/react";
import { GET_GENRES } from "../graphql/movies/lookupQueries";

export default function useGenres() {
  return useQuery(GET_GENRES);
}
