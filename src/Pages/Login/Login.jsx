import { Button, Checkbox, Form, Input, Spin } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginAdminMutation } from "../../redux/Api/user";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/features/auth/authSlice";

const Login = () => {
  const [loginAdmin] = useLoginAdminMutation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true); // Start loading spinner
    loginAdmin(values)
      .unwrap()
      .then((payload) => {
        if (payload) {
          dispatch(setToken(payload?.data?.accessToken))

          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false); // Stop loading spinner
      });
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen px-4 py-8"
      style={{
        width: "100%",
        background: "#020123",
      }}
    >
      <div
        className="bg-white flex justify-center items-center w-full max-w-[450px]"
        style={{
          borderRadius: "20px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Form
          name="normal_login"
          className="login-form w-full"
          initialValues={{
            remember: true,
          }}
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "30px 20px",
          }}
          onFinish={onFinish}
        >
          <h1
            className="text-xl sm:text-2xl text-center font-semibold mb-2"
            style={{
              color: "#1a1a1a",
            }}
          >
            Login to Account
          </h1>

          <p
            style={{
              color: "#6b7280",
              textAlign: "center",
              marginBottom: "30px",
              fontSize: "14px",
            }}
          >
            Please enter your email and password to continue
          </p>

          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#374151",
                fontSize: "14px",
              }}
            >
              Email address:
            </label>
            <Form.Item
              style={{ marginBottom: 0 }}
              name="email"
              id="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                placeholder="esteban_schiller@gmail.com"
                type="email"
                style={{
                  border: "none",
                  height: "48px",
                  background: "#F5F5F5",
                  borderRadius: "8px",
                  outline: "none",
                  fontSize: "14px",
                }}
              />
            </Form.Item>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#374151",
                fontSize: "14px",
              }}
              htmlFor="password"
            >
              Password
            </label>
            <Form.Item
              style={{ marginBottom: 0 }}
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                type="password"
                placeholder="••••••••"
                style={{
                  border: "none",
                  height: "48px",
                  background: "#F5F5F5",
                  borderRadius: "8px",
                  outline: "none",
                  fontSize: "14px",
                }}
              />
            </Form.Item>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox
                style={{ color: "#6b7280", fontSize: "14px" }}
                className="custom-checkbox"
              >
                Remember Password
              </Checkbox>
            </Form.Item>
            <Link
              style={{
                color: "#EFC11F",
                fontSize: "14px",
                textDecoration: "none",
              }}
              to="/auth/forget-password"
            >
              Forget Password?
            </Link>
          </div>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
              disabled={loading}
              style={{
                height: "48px",
                fontWeight: "500",
                fontSize: "16px",
                background: "#EFC11F",
                borderColor: "#EFC11F",
                color: "#1a1a1a",
                marginTop: "30px",
                borderRadius: "8px",
              }}
            >
              {loading ? <Spin style={{ color: "#1a1a1a" }} /> : "Sign In"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
