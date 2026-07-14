import { Card, Descriptions, Tag, Typography } from "antd";

const { Paragraph } = Typography;

export default function MovieInfo({ movie }) {
  return (
    <Card title={movie.title}>
      <Paragraph>
        {movie.overview}
      </Paragraph>

      <Descriptions bordered column={1}>
        <Descriptions.Item label="Original Title">
          {movie.originalTitle}
        </Descriptions.Item>

        <Descriptions.Item label="Release Date">
          {movie.releaseDate}
        </Descriptions.Item>

        <Descriptions.Item label="Runtime">
          {movie.runtime} mins
        </Descriptions.Item>

        <Descriptions.Item label="Status">
          {movie.status}
        </Descriptions.Item>

        <Descriptions.Item label="Tagline">
          {movie.tagline}
        </Descriptions.Item>

        <Descriptions.Item label="Genres">
          {movie.genres?.map(
            (genre) => (
              <Tag key={genre.id} >
                {genre.name}
              </Tag>
            )
          )}
        </Descriptions.Item>

        <Descriptions.Item label="Languages">
          {movie.languages?.map(
            (language) => (
              <Tag key={language.id}>
                {language.englishName}
              </Tag>
            )
          )}
        </Descriptions.Item>

        <Descriptions.Item label="Countries">
          {movie.countries?.map(
            (country) => (
              <Tag key={country.id}>
                {country.englishName}
              </Tag>
            )
          )}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
