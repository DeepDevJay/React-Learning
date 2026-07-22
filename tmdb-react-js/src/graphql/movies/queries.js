import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
  query ListMovies($filter: ListMoviesFilter, $sort: ListMoviesSort) {
    listMovies(filter: $filter, sort: $sort) {
      message
      count
      data {
        id
        title
        originalTitle
        overview
        releaseDate
        popularity
        voteAverage
        voteCount
        runtime
        status
        imageUrl
      }
    }
  }
`;

export const GET_MOVIE = gql`
  query GetMovie($id: ID!) {
    movie(id: $id) {
      message
      data {
        id
        adult
        budget
        homePage
        streamingOn
        originalLanguage
        originalTitle
        overview
        popularity
        releaseDate
        revenue
        runtime
        status
        tagline
        title
        video
        voteAverage
        voteCount
        createdAt
        imageUrl
        genres {
          id
          name
        }
        languages {
          id
          languageCode
          englishName
        }
        countries {
          id
          countryCode
          englishName
        }
        movieImages {
          id
          mediaId
          personId
          collectionId
          mediaType
          aspectRatio
          filePath
          height
          voteAverage
          voteCount
          width
          languageCode
          imageType
        }
        movieVideo {
          id
          mediaId
          mediaType
          languageCode
          countryCode
          site
          size
          official
          publishedAt
        }
        movieCollection {
          id
          tmdbId
          name
          overview
          posterPath
          backdropPath
        }
        castAndCrew {
          id
          name
          creditType
          department
          job
          character
          characterAdult
          characterGender
          order
          tmdbId
          birthday
          knownForDepartment
          deathday
          alsoKnownAs
          gender
          biography
          popularity
          placeOfBirth
          profilePath
          homePage
          adult
          createdAt
          updatedAt
          deletedAt
          role
        }
      }
    }
  }
`;
