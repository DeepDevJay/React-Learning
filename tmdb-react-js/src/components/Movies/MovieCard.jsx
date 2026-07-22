import { Card, Rate, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import MovieImageCarousel from "./MovieDetails/MovieImageCarousel";

const { Text } = Typography;

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movies-card/${movie.id}`);
  };

  return (
    <Card
      hoverable
      onClick={handleClick}
      cover={
        movie.imageUrl ? <MovieImageCarousel images={movie.movieImages} /> : null
      }
    >
      <Card.Meta
        title={movie.title}
        description={
          <>
            <Text>
              {movie.releaseDate || "Unknown date"}
            </Text>

            <br />

            <Rate
              disabled
              allowHalf
              value={movie.voteAverage / 2}
            />
          </>
        }
      />
    </Card>
  );
}
