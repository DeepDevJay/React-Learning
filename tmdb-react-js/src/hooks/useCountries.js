import { useQuery } from "@apollo/client/react";
import { GET_COUNTRIES } from "../graphql/movies/lookupQueries";

export default function useCountries() {
  return useQuery(GET_COUNTRIES);
}
