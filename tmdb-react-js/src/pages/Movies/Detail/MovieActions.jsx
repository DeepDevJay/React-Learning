import { Button, Card, Popconfirm, Space } from "antd";
import { useNavigate } from "react-router-dom";

export default function MovieActions({ movie }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    // Next step:
    // call delete mutation
  };

  return (
    <Card title="Actions">
      <Space direction="vertical" style={{ width: "100%" }} >
        <Button
          type="primary"
          block
          onClick={() => navigate(`/movies-card/${movie.id}/edit`)}
        >
          Edit Movie
        </Button>

        <Popconfirm title="Delete movie?" onConfirm={handleDelete} >
          <Button danger block >
            Delete Movie
          </Button>
        </Popconfirm>
      </Space>
    </Card>
  );
}
