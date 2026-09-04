import { Form, Input, Button, Typography, Card, Row, Col, App } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { loginApi } from "./auth.api";
import { useAuthStore } from "./auth.store";
import { UserType } from "../users/user.types";
import { AuthUser } from "./auth.types";

const { Title, Text } = Typography;

interface LoginFormValues {
  loginId: string;
  password: string;
}

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const { accessToken, user: authUser, setAuth } = useAuthStore();
  const { message } = App.useApp();

  const getUserDashboard = (user: AuthUser): string => {
    if (user.isAdmin) {
      return "/admin/dashboard";
    }
    if (user.type === UserType.VALUES.Staff) {
      return "/staff/dashboard";
    }
    if (user.type === UserType.VALUES.Customer) {
      return "/dashboard";
    }
    if (user.type === UserType.VALUES.Vendor) {
      return "/vendor/dashboard";
    }
    return "/login";
  };

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      const res = await loginApi({
        loginId: values.loginId.trim(),
        password: values.password,
      });
      setAuth(res.data.accessToken, res.data.user); // store token → auto socket connect
      message.success("Login successful");

      // // Decode role from token or fetch from API
      // const payload: any = JSON.parse(atob(token.split(".")[1]));
      // const role = payload.role; // or payload.roles[0]
    } catch (err: any) {
      console.error(err);

      message.error(
        err?.response?.data?.message || "Invalid email or password",
      );
    } finally {
      setLoading(false);
    }
  };

  if (accessToken && authUser) {
    return <Navigate to={getUserDashboard(authUser)} replace />;
  }
  return (
    <Row style={{ minHeight: "100vh" }}>
      {/* 🔵 Left Branding Panel */}
      <Col
        xs={0}
        md={12}
        style={{
          background: "linear-gradient(135deg, #1677ff, #69b1ff)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: "40px",
        }}
      >
        <Title style={{ color: "#fff" }}>My eCommerce</Title>
        <Text style={{ color: "#e6f4ff", fontSize: 16 }}>
          Manage your business, orders, and customers in real-time.
        </Text>
      </Col>

      {/* ⚪ Right Login Panel */}
      <Col
        xs={24}
        md={12}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f5f5",
        }}
      >
        <Card
          style={{
            width: 360,
            borderRadius: 12,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <Title level={3} style={{ textAlign: "center" }}>
            Login
          </Title>

          <Form<LoginFormValues>
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
          >
            {/* Email */}
            <Form.Item
              name="loginId"
              label="UserId / Mobile / Email"
              rules={[
                {
                  required: true,
                  message: "Please enter your user ID, mobile, or email",
                },
                { whitespace: true, message: "Blank space is not allowed" },
                // { type: "email", message: "Invalid email format" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter user ID / mobile / email"
              />
            </Form.Item>

            {/* Password */}
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter your password"
              />
            </Form.Item>

            {/* Submit */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                size="large"
              >
                Login
              </Button>
            </Form.Item>

            {/* Extra */}
            <Form.Item style={{ textAlign: "center", marginBottom: 0 }}>
              <Text type="secondary">
                Forgot password? <Link to="/forgot">Reset here</Link>
              </Text>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginPage;
