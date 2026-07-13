import { Row, Col, Typography, Empty, Skeleton } from "antd";

import MovieCard from "../../components/MovieCard";
import useMovies from "../../hooks/useMovies";

const { Title } = Typography;

export default function Dashboard() {
  const { loading, error, data } = useMovies(
    {
      limit: 5,
      skip: 0,
    },
    {
      field: "voteAverage",
      order: "DESC",
    }
  );

  if (loading) {
    return (
      <>
        <Title level={2}>Top Rated Movies</Title>

        <Row gutter={[24, 24]}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6} xl={4}>
              <Skeleton.Image
                active
                style={{
                  width: "100%",
                  height: 320,
                }}
              />
              <Skeleton active paragraph={{ rows: 2 }} />
            </Col>
          ))}
        </Row>
      </>
    );
  }

  if (error) {
    return <Empty description={error.message} />;
  }

  const movies = data?.listMovies?.data ?? [];

  return (
    <>
      <Title level={2}>Top Rated Movies</Title>

      {movies.length === 0 ? (
        <Empty description="No movies found" />
      ) : (
        <Row gutter={[24, 24]}>
          {movies.map((movie) => (
            <Col key={movie.id} xs={24} sm={12} md={8} lg={6} xl={4}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}
