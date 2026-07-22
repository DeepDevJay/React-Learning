import { useMutation } from "@apollo/client/react";

import { CREATE_MOVIE, UPDATE_MOVIE, DELETE_MOVIE } from "../graphql/movies/mutations";

export default function useMovieMutations() {
  const [createMovie, createMovieResult] = useMutation(CREATE_MOVIE);
  const [updateMovie, updateMovieResult] = useMutation(UPDATE_MOVIE);
  const [deleteMovie, deleteMovieResult] = useMutation(DELETE_MOVIE);

  return {
    // Mutations
    createMovie,
    updateMovie,
    deleteMovie,

    // Create
    createLoading: createMovieResult.loading,
    createError: createMovieResult.error,
    createData: createMovieResult.data,

    // Update
    updateLoading: updateMovieResult.loading,
    updateError: updateMovieResult.error,
    updateData: updateMovieResult.data,

    // Delete
    deleteLoading: deleteMovieResult.loading,
    deleteError: deleteMovieResult.error,
    deleteData: deleteMovieResult.data,
  };
}
