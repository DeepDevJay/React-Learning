import { gql } from "@apollo/client";

export const CREATE_MOVIE = gql`
  mutation CreateMovie($data: MovieInput) {
    createMovie(data: $data) {
      message
      data {
        id
        title
        originalTitle
        overview
        releaseDate
        runtime
        status
        tagline
        imageUrl
        voteAverage
        voteCount
        popularity
      }
    }
  }
`;

export const UPDATE_MOVIE = gql`
  mutation UpdateMovie($id: ID!, $data: UpdateMovieInput) {
    updateMovie(id: $id, data: $data) {
      message
      data {
        id
        title
        originalTitle
        overview
        releaseDate
        runtime
        status
        tagline
        imageUrl
        voteAverage
        voteCount
        popularity
      }
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation DeleteMovie($id: ID!) {
    deleteMovie(id: $id) {
      message
      data {
        id
        title
      }
    }
  }
`;
