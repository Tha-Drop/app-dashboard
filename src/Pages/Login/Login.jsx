import { Button, Checkbox, Form, Input, Spin } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginAdminMutation } from "../../redux/Api/user";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { MdErrorOutline } from "react-icons/md";

const Login = () => {
  const [loginAdmin] = useLoginAdminMutation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);
    setError("");

    loginAdmin(values)
      .unwrap()
      .then((payload) => {
        if (payload) {
          dispatch(setToken(payload?.data?.accessToken));
          toast.success("Welcome back! Login successful.", {
            icon: "👋",
          });
          navigate("/");
        }
      })
      .catch((err) => {
        const errorMessage = err?.data?.message || "Invalid email or password. Please try again.";
        setError(errorMessage);
        toast.error(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div
      className="login-page-container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        background: "#020123",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px",
      }}
    >
      <div
        className="bg-white w-full max-w-[450px]"
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
            padding: "24px 20px",
          }}
          onFinish={onFinish}
        >
          <h1
            className="text-xl sm:text-2xl text-center font-semibold"
            style={{
              color: "#1a1a1a",
              marginBottom: "8px",
            }}
          >
            Login to Account
          </h1>

          <p
            style={{
              color: "#6b7280",
              textAlign: "center",
              marginBottom: "24px",
              fontSize: "14px",
            }}
          >
            Please enter your email and password to continue
          </p>

          {/* Error Alert Box */}
          {error && (
            <div
              style={{
                background: "#FEF2F2",
                border: "1px solid #FEE2E2",
                borderRadius: "8px",
                padding: "12px 16px",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <MdErrorOutline size={20} style={{ color: "#DC2626", flexShrink: 0 }} />
              <p style={{ color: "#DC2626", fontSize: "14px", margin: 0 }}>
                {error}
              </p>
            </div>
          )}

          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "6px",
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
                  message: "Email is required",
                },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input
                placeholder="admin@example.com"
                type="email"
                onChange={() => setError("")}
                style={{
                  border: error ? "1px solid #DC2626" : "none",
                  height: "44px",
                  background: "#F5F5F5",
                  borderRadius: "8px",
                  outline: "none",
                  fontSize: "14px",
                }}
              />
            </Form.Item>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
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
                  message: "Password is required",
                },
                {
                  min: 6,
                  message: "Password must be at least 6 characters",
                },
              ]}
            >
              <Input.Password
                type="password"
                placeholder="Enter your password"
                onChange={() => setError("")}
                style={{
                  border: error ? "1px solid #DC2626" : "none",
                  height: "44px",
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
              flexWrap: "wrap",
              gap: "8px",
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
                height: "44px",
                fontWeight: "500",
                fontSize: "16px",
                background: loading ? "#d4a91a" : "#EFC11F",
                borderColor: "#EFC11F",
                color: "#1a1a1a",
                marginTop: "24px",
                borderRadius: "8px",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                  <Spin size="small" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
