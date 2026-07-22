import { message, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import MovieForm from "./MovieForm";
import useMovieMutations from "../../../hooks/useMovieMutations";

const { Title } = Typography;

export default function CreateMovie() {
  const navigate = useNavigate();

  const { createMovie, createLoading } = useMovieMutations();

  const handleSubmit = async (values) => {
    try {
      const { data } = await createMovie({ variables: { data: values } });

      message.success(data?.createMovie?.message || "Movie created successfully");

      const movieId = data?.createMovie?.data?.id;

      if (movieId) {
        navigate(`/movies-card/${movieId}`);
      } else {
        navigate("/movies-card");
      }
    } catch (error) {
      message.error(error.message || "Failed to create movie");
    }
  };

  return (
    <>
      <Title level={2}>
        Create Movie
      </Title>

      <MovieForm
        mode="create"
        onSubmit={handleSubmit}
        loading={createLoading}
      />
    </>
  );
}
