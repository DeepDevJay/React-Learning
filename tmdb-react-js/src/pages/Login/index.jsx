import { Card, Form, Input, Button, Typography, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client/react";
import { Navigate, useNavigate } from "react-router-dom";

import { LOGIN_MUTATION } from "../../graphql/auth/mutations";
import { isAuthenticated, setAuth } from "../../utils/auth";

const { Title } = Typography;

export default function Login() {
  const navigate = useNavigate();
  const [login, { loading }] = useMutation(LOGIN_MUTATION);

  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  const onFinish = async (values) => {
    try {
      const { data } = await login({ variables: { data: values } });

      const response = data.emailPasswordLogIn;

      if (!response?.data?.token) {
        message.error(response?.message || "Login failed");
        return;
      }

      setAuth(response.data);

      message.success("Login successful");

      navigate("/");
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <Card
        title={<Title level={3}>TMDB Login</Title>}
        style={{ width: 420 }}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            initialValue="testuser@logicwind.com"
            rules={[
              {
                required: true,
                message: "Please enter email",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            initialValue="Test123!"
            rules={[
              {
                required: true,
                message: "Please enter password",
              },
            ]}
          >
            <Input.Password prefix={ <LockOutlined /> } placeholder="Password" />
          </Form.Item>

          <Button htmlType="submit" type="primary" loading={loading} block >
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
}
