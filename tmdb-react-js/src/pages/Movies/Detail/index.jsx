import { Alert, Button, Card, Col, Descriptions, Empty, Image, Row, Space, Spin, Tag, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import useMovie from "../../../hooks/useMovie";

const { Title, Paragraph, Text } = Typography;

export default function MovieDetail() {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const { loading, error, data } = useMovie(movieId);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "80px 0",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        type="error"
        message="Unable to load movie"
        description={error.message}
      />
    );
  }

  const movie = data?.movie?.data;

  if (!movie) {
    return (
      <Empty
        description="Movie not found"
      />
    );
  }
  
  return (
    <div>
      {/* Header */}
      <Space style={{ marginBottom: 24, width: "100%", justifyContent: "space-between" }}>
        <Title level={2} style={{ margin: 0 }}>
          Movie Details
        </Title>

        <Space>
          <Button onClick={() => navigate("/movies-card")}>
            Back
          </Button>

          <Button
            type="primary"
            onClick={() => navigate(`/movies-card/${movie.id}/edit`)}
          >
            Edit Movie
          </Button>
        </Space>
      </Space>

      {/* Main Movie Information */}
      <Card>
        <Row gutter={[32, 32]}>
          {/* Poster */}
          <Col xs={24} sm={8} md={6}>
            {movie.imageUrl ? (
              <Image
                src={movie.imageUrl}
                alt={movie.title}
                width="100%"
                style={{ borderRadius: 8 }}
              />
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No Poster"
              />
            )}
          </Col>

          {/* Movie Details */}
          <Col xs={24} sm={16} md={18}>
            <Title level={2}>
              {movie.title}
            </Title>

            {movie.originalTitle &&
              movie.originalTitle !== movie.title && (
                <Text type="secondary">
                  Original Title: {movie.originalTitle}
                </Text>
              )}

            {movie.tagline && (
              <Paragraph italic style={{ marginTop: 16 }}>
                "{movie.tagline}"
              </Paragraph>
            )}

            <Paragraph>
              {movie.overview || "No overview available."}
            </Paragraph>

            {/* Genres */}
            {movie.genres?.length > 0 && (
              <Space wrap style={{ marginBottom: 16 }}>
                {movie.genres.map((genre) => (
                  <Tag key={genre.id}>
                    {genre.name}
                  </Tag>
                ))}
              </Space>
            )}

            <Descriptions bordered column={{ xs: 1, sm: 2 }}>
              <Descriptions.Item label="Release Date">
                {movie.releaseDate || "-"}
              </Descriptions.Item>

              <Descriptions.Item label="Runtime">
                {movie.runtime ? `${movie.runtime} minutes` : "-"}
              </Descriptions.Item>

              <Descriptions.Item label="Status">
                {movie.status || "-"}
              </Descriptions.Item>

              <Descriptions.Item label="Rating">
                {movie.voteAverage ?? "-"}
              </Descriptions.Item>

              <Descriptions.Item label="Vote Count">
                {movie.voteCount ?? "-"}
              </Descriptions.Item>

              <Descriptions.Item label="Popularity">
                {movie.popularity ?? "-"}
              </Descriptions.Item>

              <Descriptions.Item label="Budget">
                {movie.budget ?? "-"}
              </Descriptions.Item>

              <Descriptions.Item label="Revenue">
                {movie.revenue ?? "-"}
              </Descriptions.Item>

              <Descriptions.Item label="Original Language">
                {movie.originalLanguage || "-"}
              </Descriptions.Item>

              <Descriptions.Item label="Streaming On">
                {movie.streamingOn || "-"}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>

      {/* Languages */}
      {movie.languages?.length > 0 && (
        <Card title="Languages" style={{ marginTop: 24 }}>
          <Space wrap>
            {movie.languages.map((language) => (
              <Tag key={language.id}>
                {language.englishName || language.languageCode}
              </Tag>
            ))}
          </Space>
        </Card>
      )}

      {/* Countries */}
      {movie.countries?.length > 0 && (
        <Card title="Countries" style={{ marginTop: 24 }}>
          <Space wrap>
            {movie.countries.map((country) => (
              <Tag key={country.id}>
                {country.englishName || country.countryCode}
              </Tag>
            ))}
          </Space>
        </Card>
      )}

      {/* Collection */}
      {movie.movieCollection?.length > 0 && (
        <Card title="Collection" style={{ marginTop: 24 }}>
          {movie.movieCollection.map((collection) => (
            <div key={collection.id}>
              <Title level={4}>
                {collection.name}
              </Title>

              <Paragraph>
                {collection.overview}
              </Paragraph>
            </div>
          ))}
        </Card>
      )}

      {/* Cast and Crew */}
      {movie.castAndCrew?.length > 0 && (
        <Card title="Cast & Crew" style={{ marginTop: 24 }}>
          <Row gutter={[16, 16]}>
            {movie.castAndCrew.map((person) => (
              <Col
                xs={24}
                sm={12}
                md={8}
                lg={6}
                key={person.id}
              >
                <Card size="small">
                  <Text strong>
                    {person.name}
                  </Text>

                  {person.character && (
                    <div>
                      <Text type="secondary">
                        Character: {person.character}
                      </Text>
                    </div>
                  )}

                  {person.job && (
                    <div>
                      <Text type="secondary">
                        Job: {person.job}
                      </Text>
                    </div>
                  )}

                  {person.department && (
                    <div>
                      <Text type="secondary">
                        Department: {person.department}
                      </Text>
                    </div>
                  )}
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      )}

      {/* Videos */}
      {movie.movieVideo?.length > 0 && (
        <Card title="Videos" style={{ marginTop: 24 }}>
          {movie.movieVideo.map((video) => (
            <Card key={video.id} size="small" style={{ marginBottom: 12 }}>
              <Descriptions column={1}>
                <Descriptions.Item label="Site">
                  {video.site || "-"}
                </Descriptions.Item>

                <Descriptions.Item label="Language">
                  {video.languageCode || "-"}
                </Descriptions.Item>

                <Descriptions.Item label="Country">
                  {video.countryCode || "-"}
                </Descriptions.Item>

                <Descriptions.Item label="Official">
                  {video.official ? "Yes" : "No"}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          ))}
        </Card>
      )}
    </div>
  );
}
