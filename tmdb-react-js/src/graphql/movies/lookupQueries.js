import { gql } from "@apollo/client";

export const GET_GENRES = gql`
  query {
    listGenre {
      id
      name
    }
  }
`;

export const GET_LANGUAGES = gql`
  query {
    languages {
      data {
        id
        englishName
      }
    }
  }
`;

export const GET_COUNTRIES = gql`
  query {
    countries {
      data {
        id
        englishName
      }
    }
  }
`;
