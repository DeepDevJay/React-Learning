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
      cover={ <img src={movie.imageUrl} alt={movie.title} style={{ height: 320, objectFit: "cover" }} /> }
      onClick={() => navigate(`/movies-card/${movie.id}`)}
    >
      <Card.Meta title={movie.title} />

      <div style={{ marginTop: 12 }}>
        <Rate disabled allowHalf value={movie.voteAverage / 2} />

        <div style={{ marginTop: 8 }}>
          <Tag color="gold">⭐ {movie.voteAverage}</Tag>
        </div>

        <Text type="secondary">
          <CalendarOutlined />{" "}
          {dayjs(movie.releaseDate).format("DD MMM YYYY")}
        </Text>
      </div>
    </Card>
  );
}
