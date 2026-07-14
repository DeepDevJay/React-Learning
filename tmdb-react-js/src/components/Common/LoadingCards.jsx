import { Col, Row, Skeleton } from "antd";

export default function LoadingCards({ count = 10 }) {
  return (
    <Row gutter={[24, 24]}>
      {Array.from({ length: count }).map((_, index) => (
        <Col key={index} xs={24} sm={12} md={8} lg={6} xl={4} >
          <Skeleton.Image active style={{ width: "100%", height: 320 }} />
          <Skeleton active paragraph={{ rows: 2 }} />
        </Col>
      ))}
    </Row>
  );
}
