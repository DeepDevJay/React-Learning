import { Card, Rate, Tag, Typography } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const { Text } = Typography;

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      onClick={() => navigate(`/movies-card/${movie.id}`)}
      cover={
        <img alt={movie.title} src={movie.imageUrl} style={{ height: 320, objectFit: "cover", }} />
      }
    >
      <Card.Meta title={movie.title} />
      <div style={{ marginTop: 16 }} >
        <Rate
          disabled
          allowHalf
          value={movie.voteAverage / 2}
        />

        <br />

        <Tag color="gold" style={{ marginTop: 10 }} >
          ⭐ {movie.voteAverage}
        </Tag>

        <br />

        <Text type="secondary">
          <CalendarOutlined />{" "}
          {dayjs(movie.releaseDate).format("DD MMM YYYY")}
        </Text>
      </div>
    </Card>
  );
}
