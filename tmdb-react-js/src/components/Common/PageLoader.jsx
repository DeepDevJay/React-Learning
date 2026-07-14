import { Spin } from "antd";

export default function PageLoader() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: 30,
      }}
    >
      <Spin size="large" />
    </div>
  );
}
