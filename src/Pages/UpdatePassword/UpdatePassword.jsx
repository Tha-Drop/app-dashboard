import { Button, Form, Input, Spin } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../redux/Api/user";
import { toast } from "react-toastify";

const UpdatePassword = () => {
    const [resetPassword] = useResetPasswordMutation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        if (values?.password !== values?.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        setLoading(true);
        const data = {
            password: values?.password,
            confirmPassword: values?.confirmPassword,
        };

        resetPassword(data)
            .unwrap()
            .then((payload) => {
                toast.success("Password updated successfully!");
                localStorage.removeItem("email");
                localStorage.removeItem("accessToken");
                navigate("/auth/login");
            })
            .catch((error) => {
                toast.error(error?.data?.message || "Failed to update password");
            })
            .finally(() => {
                setLoading(false);
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
                className="w-full max-w-[450px]"
                style={{
                    borderRadius: "20px",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Form
                    name="update_password"
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
                        Set a new password
                    </h1>
                    <p
                        style={{
                            color: "#6b7280",
                            fontSize: "14px",
                            textAlign: "center",
                            marginBottom: "30px",
                        }}
                    >
                        Create a new password. Ensure it differs from previous ones for security
                    </p>

                    <div style={{ marginBottom: "20px" }}>
                        <label
                            style={{
                                display: "block",
                                color: "#374151",
                                marginBottom: "8px",
                                fontSize: "14px",
                            }}
                            htmlFor="password"
                        >
                            New Password
                        </label>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your new Password!",
                                },
                            ]}
                            style={{ marginBottom: 0 }}
                        >
                            <Input.Password
                                placeholder="KK1g#$15856"
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
                                color: "#374151",
                                marginBottom: "8px",
                                fontSize: "14px",
                            }}
                            htmlFor="confirmPassword"
                        >
                            Confirm Password
                        </label>
                        <Form.Item
                            style={{ marginBottom: 0 }}
                            name="confirmPassword"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Confirm Password!",
                                },
                            ]}
                        >
                            <Input.Password
                                placeholder="KK1g#$15856"
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

                    <Form.Item style={{ marginBottom: 0 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            disabled={loading}
                            className="login-form-button"
                            style={{
                                border: "none",
                                height: "48px",
                                background: "#EFC11F",
                                borderColor: "#EFC11F",
                                color: "#1a1a1a",
                                borderRadius: "8px",
                                outline: "none",
                                marginTop: "20px",
                                fontWeight: "500",
                                fontSize: "16px",
                            }}
                        >
                            {loading ? <Spin style={{ color: "#1a1a1a" }} /> : "Update Password"}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default UpdatePassword;

