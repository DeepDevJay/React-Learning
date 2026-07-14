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
        popularity
        releaseDate
      }
    }
  }
`;

export const GET_MOVIE = gql`
  query Movie($movieId: ID!) {
    movie(id: $movieId) {
      message
      data {
        id
        title
        originalTitle
        overview
        imageUrl
        voteAverage
        voteCount
        popularity
        releaseDate
        runtime
        budget
        revenue
        status
        tagline
        adult
        originalLanguage
        homePage
        streamingOn
        movieImages {
          id
          filePath
        }
        genres {
          id
          name
        }
        languages {
          id
          englishName
        }
        countries {
          id
          englishName
        }
      }
    }
  }
`;
