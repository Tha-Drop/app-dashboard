import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Button, Spin } from "antd";
import { useVerifyOtpMutation, useForgotPasswordMutation } from "../../redux/Api/user";
import { toast } from "react-toastify";

const Otp = () => {
    const [verifyOtp] = useVerifyOtpMutation();
    const [forgotPassword] = useForgotPasswordMutation();
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const email = localStorage.getItem("email");

    const handleResendCode = () => {
        if (!email) {
            toast.error("Email not found. Please go back and enter your email.");
            return;
        }
        forgotPassword({ email })
            .unwrap()
            .then(() => {
                toast.success("Code resent successfully!");
            })
            .catch((error) => {
                toast.error(error?.data?.message || "Failed to resend code");
            });
    };

    const handleVerifyOtp = async () => {
        if (otp.length < 5) {
            toast.error("Please enter the complete verification code");
            return;
        }

        setLoading(true);
        const data = {
            recoveryOTP: otp,
            email: email,
        };

        try {
            const response = await verifyOtp(data).unwrap();
            const token = response.data;
            localStorage.setItem("accessToken", token);
            toast.success("Code verified successfully!");
            navigate("/auth/update-password");
        } catch (error) {
            toast.error(error?.data?.message || "Invalid verification code");
        } finally {
            setLoading(false);
        }
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
                    background: "white",
                    padding: "30px 20px",
                    borderRadius: "20px",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                }}
            >
                <h1
                    className="text-xl sm:text-2xl text-center font-semibold mb-2"
                    style={{
                        color: "#1a1a1a",
                    }}
                >
                    Check your email
                </h1>
                <p
                    style={{
                        color: "#6b7280",
                        textAlign: "center",
                        fontSize: "14px",
                        marginBottom: "8px",
                    }}
                >
                    We sent a reset link to{" "}
                    <span style={{ color: "#1a1a1a", fontWeight: "500" }}>
                        {email || "your email"}
                    </span>
                </p>
                <p
                    style={{
                        color: "#6b7280",
                        textAlign: "center",
                        fontSize: "14px",
                        marginBottom: "30px",
                    }}
                >
                    enter 5 digit code that mentioned in the email
                </p>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={5}
                        inputStyle={{
                            height: "44px",
                            width: "44px",
                            borderRadius: "8px",
                            marginRight: "8px",
                            fontSize: "18px",
                            border: "1px solid #E5E5E5",
                            background: "#F5F5F5",
                            color: "#1a1a1a",
                            outline: "none",
                        }}
                        renderInput={(props) => <input {...props} />}
                    />
                </div>

                <Button
                    onClick={handleVerifyOtp}
                    block
                    disabled={loading}
                    className="login-form-button"
                    style={{
                        height: "48px",
                        fontWeight: "500",
                        fontSize: "16px",
                        color: "#1a1a1a",
                        background: "#EFC11F",
                        borderColor: "#EFC11F",
                        marginTop: "30px",
                        border: "none",
                        outline: "none",
                        marginBottom: "20px",
                        borderRadius: "8px",
                    }}
                >
                    {loading ? <Spin style={{ color: "#1a1a1a" }} /> : "Verify Code"}
                </Button>

                <p
                    style={{
                        textAlign: "center",
                        color: "#6b7280",
                        fontSize: "14px",
                    }}
                >
                    You have not received the email?{" "}
                    <span
                        onClick={handleResendCode}
                        style={{
                            color: "#E07575",
                            cursor: "pointer",
                            fontWeight: "500",
                        }}
                    >
                        Resend
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Otp;