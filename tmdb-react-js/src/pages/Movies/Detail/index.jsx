import { Button, Col, Empty, Row, Skeleton } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";

import useMovie from "../../../hooks/useMovie";

import MovieCarousel from "./MovieCarousel";
import MovieInfo from "./MovieInfo";
import MovieStatistics from "./MovieStatistics";
import MovieActions from "./MovieActions";

export default function MovieDetail() {
  const navigate = useNavigate();
  const { movieId } = useParams();

  const { loading, error, data } = useMovie(movieId);

  if (loading) return <Skeleton active />;

  if (error) return <Empty description={error.message} />;

  const movie = data?.movie?.data;
  if (!movie) return <Empty description="Movie not found" />;

  return (
    <>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/movies-card")}
        style={{ marginBottom: 20 }}
      >
        Back
      </Button>

      <MovieCarousel movie={movie} />

      <Row gutter={24} style={{ marginTop: 30 }}>
        <Col span={16}>
          <MovieInfo movie={movie} />
        </Col>

        <Col span={8}>
          <MovieStatistics movie={movie} />
          <MovieActions movie={movie} />
        </Col>
      </Row>
    </>
  );
}
