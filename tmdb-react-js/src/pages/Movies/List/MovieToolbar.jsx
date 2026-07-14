import { Button, Col, Input, Row, Select, Space } from "antd";
import { FilterOutlined, PlusOutlined } from "@ant-design/icons";

const { Search } = Input;

export default function MovieToolbar({ search, setSearch, sort, setSort, openFilters, onAddMovie }) {
  return (
    <Row
      justify="space-between"
      align="middle"
      gutter={[16, 16]}
      style={{ marginBottom: 24 }}
    >
      <Col flex="auto">
        <Space size={16}>
          <Search
            allowClear
            placeholder="Search movies..."
            value={search}
            style={{ width: 320 }}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Select
            value={sort.field}
            style={{ width: 180 }}
            onChange={(value) => setSort({ ...sort, field: value })}
            options={[
              {
                label: "Release Date",
                value: "releaseDate",
              },
              {
                label: "Rating",
                value: "voteAverage",
              },
              {
                label: "Popularity",
                value: "popularity",
              },
              {
                label: "Created At",
                value: "createdAt",
              },
            ]}
          />
        </Space>
      </Col>

      <Col>
        <Space>
          <Button icon={<FilterOutlined />} onClick={openFilters} >
            Filters
          </Button>

          <Button type="primary" icon={<PlusOutlined />} onClick={onAddMovie} >
            Add Movie
          </Button>
        </Space>
      </Col>
    </Row>
  );
}
