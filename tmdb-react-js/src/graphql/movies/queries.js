import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
  query ListMovies($filter: ListMoviesFilter, $sort: ListMoviesSort) {
    listMovies(filter: $filter, sort: $sort) {
      message
      count
      data {
        id
        title
        imageUrl
        voteAverage
        releaseDate
        popularity
      }
    }
  }
`;
