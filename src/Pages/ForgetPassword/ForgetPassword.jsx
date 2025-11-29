import { Button, Form, Input, Spin } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../redux/Api/user";
import { toast } from "react-toastify";

const ForgetPassword = () => {
    const [forgotPassword] = useForgotPasswordMutation();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = (values) => {
        setLoading(true);
        forgotPassword(values)
            .unwrap()
            .then((payload) => {
                toast.success("Verification code sent to your email!");
                navigate("/auth/otp");
                localStorage.setItem("email", values?.email);
            })
            .catch((error) => {
                toast.error(error?.data?.message || "Failed to send code");
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
                className="bg-white flex justify-center items-center w-full max-w-[450px]"
                style={{
                    borderRadius: "20px",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Form
                    name="forget_password"
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
                        Forget Password
                    </h1>

                    <p
                        style={{
                            color: "#6b7280",
                            textAlign: "center",
                            marginBottom: "30px",
                            fontSize: "14px",
                        }}
                    >
                        Please enter your email to get verification code
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
                                marginTop: "20px",
                                borderRadius: "8px",
                            }}
                        >
                            {loading ? <Spin style={{ color: "#1a1a1a" }} /> : "Send a Code"}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default ForgetPassword;