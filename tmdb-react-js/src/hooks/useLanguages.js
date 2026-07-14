import { useQuery } from "@apollo/client/react";
import { GET_LANGUAGES } from "../graphql/movies/lookupQueries";

export default function useLanguages() {
  return useQuery(GET_LANGUAGES);
}
