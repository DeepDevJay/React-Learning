import { message, Spin, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import MovieForm from "./MovieForm";
import useMovieMutations from "../../../hooks/useMovieMutations";
import useMovie from "../../../hooks/useMovie";

const { Title } = Typography;

export default function EditMovie() {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const { movie, loading: movieLoading } = useMovie(movieId);

  const { updateMovie, updateLoading } = useMovieMutations();

  const handleSubmit = async (values) => {
    try {
      const { data } = await updateMovie({
        variables: {
          id: movieId,
          data: values,
        },
      });

      message.success(data?.updateMovie?.message || "Movie updated successfully");

      navigate(`/movies-card/${movieId}`);
    } catch (error) {
      message.error(error.message || "Failed to update movie");
    }
  };

  if (movieLoading) {
    return <Spin />;
  }

  return (
    <>
      <Title level={2}>
        Edit Movie
      </Title>

      <MovieForm
        mode="edit"
        initialValues={movie}
        onSubmit={handleSubmit}
        loading={updateLoading}
      />
    </>
  );
}
