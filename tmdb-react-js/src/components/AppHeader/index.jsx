import { Layout, Menu, Dropdown, Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { logout } from "../../utils/auth";

const { Header } = Layout;

export default function AppHeader() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "/",
      label: <Link to="/">Dashboard</Link>,
    },
    {
      key: "/movies-card",
      label: <Link to="/movies-card">Movies Card</Link>,
    },
    {
      key: "/person-list",
      label: <Link to="/person-list">Person List</Link>,
    },
  ];

  const userMenu = {
    items: [
      {
        key: "logout",
        label: "Logout",
      },
    ],
    onClick: ({ key }) => {
      if (key === "logout") {
        logout();
        navigate("/login", { replace: true });
      }
    },
  };

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#fff",
        padding: "0 24px",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
        <h2 style={{ margin: 0 }}> TMDB </h2>

        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ borderBottom: "none" }}
        />
      </div>

      <Dropdown menu={userMenu} trigger={["click"]}>
        <Space style={{ cursor: "pointer" }}>
          <Avatar icon={ <UserOutlined /> } />
        </Space>
      </Dropdown>
    </Header>
  );
}
