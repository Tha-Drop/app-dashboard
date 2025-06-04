import React, { useEffect, useState } from "react";
import { Button, Form, Input, Spin } from "antd";
import { CiEdit } from "react-icons/ci";
import profile from "../../assets/images/admin.png";
import { IoCameraOutline } from "react-icons/io5";
import { useChangePasswordMutation } from "../../redux/Api/user";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  useGetAllAdminQuery,
  useUpdateProfileeMutation,
} from "../../redux/Api/adminApi";
import { imageUrl } from "../../redux/Api/baseApi";
import { toast } from "react-toastify";
const admin = false;
const Profile = () => {
  const [image, setImage] = useState();
  const [form] = Form.useForm();
  const [tab, setTab] = useState(
    new URLSearchParams(window.location.search).get("tab") || "Profile"
  );
  const [passError, setPassError] = useState("");
  const [updateProfile, { isLoading: updateLoading }] =
    useUpdateProfileeMutation();
  const navigate = useNavigate();
  const [changePassword, { isLoading: changePasswordLoading }] =
    useChangePasswordMutation();

  const { data: adminData, isLoading: adminLoading } = useGetAllAdminQuery();
  console.log(adminData )

  const handlePageChange = (tab) => {
    setTab(tab);
    const params = new URLSearchParams(window.location.search);
    params.set("tab", tab);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  
  const onFinish = (values) => {
    console.log(values);
    if (values?.newPassword === values.password) {
      return setPassError("your old password cannot be your new password");
    }
    if (values?.newPassword !== values?.confirmPassword) {
      return setPassError("Confirm password doesn't match");
    } else {
      setPassError("");
    }

    changePassword(values)
      .unwrap()
      .then((payload) => {
        toast.success("Your password change successfully Please login again!");
        localStorage.removeItem("accessToken");
        navigate("/auth/login");
      })
      .catch((error) => toast.error(error?.data?.message));
  };

  useEffect(() => {
    if (adminData?.data?.[0]) {
      const admin = adminData.data[0];
      form.setFieldsValue({
        name: admin.name,
        email: admin.auth.email,
        phoneNumber: admin.phoneNumber,
        address: admin.address || "", // Handle missing fields
      });
    }
  }, [adminData, form]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const onEditProfile = (values) => {
    const data = new FormData();
    if (image) data.append("avatar", image);
    data.append("name", values.name);

    data.append("phoneNumber", values.phoneNumber);
    data.append("address", values.address);

    updateProfile(data)
      .unwrap()
      .then(() => {
        toast.success("Profile updated successfully");
        // Redirect after success
      })
      .catch((error) => {
        toast.error("Error updating profile:", error);
      });
  };

  if (adminLoading) {
    return <Spin size="large" />;
  }

  const admin = adminData?.data?.[0];
  console.log("image", image);
  return (
    <div>
      <div className="rounded-md   bg-[#FEFEFE]">
        <div className=" py-9 px-10 rounded flex items-center justify-center flex-col gap-6">
          <div className="relative w-[140px] h-[124px] mx-auto">
            <input
              type="file"
              onChange={handleImageChange}
              id="img"
              style={{ display: "none" }}
            />
            <img
              style={{ width: 140, height: 140, borderRadius: "100%" }}
              //   src={`${admin.avatar} ?${imageUrl}${admin.avatar} : ${image} `}
              //   src={
              //     admin?.avatar
              //       ? `${imageUrl}${admin.avatar}`
              //       : URL.createObjectURL(image)
              //   }
              src={`${
                image
                  ? URL.createObjectURL(image)
                  : `${imageUrl}/${admin?.avatar}`
              }`}
              alt="Admin Profile"
            />

            {tab === "Profile" && (
              <label
                htmlFor="img"
                className="
                            absolute top-[80px] -right-2
                            bg-[var(--primary-color)]
                            rounded-full
                            w-6 h-6
                            flex items-center justify-center
                            cursor-pointer
                        "
              >
                <IoCameraOutline className="text-white" />
              </label>
            )}
          </div>
          <div className="w-fit">
            <p className="text-[#575757] text-[24px] leading-[32px] font-semibold">
              {admin?.name || "A"}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 mb-6">
          <p
            onClick={() => handlePageChange("Profile")}
            className={`
                        ${
                          tab === "Profile"
                            ? "border-[var(--primary-color)] border-b-2 font-semibold text-[var(--primary-color)]"
                            : "border-b-2 border-transparent font-normal text-gray-600"
                        }
                        cursor-pointer text-[16px] leading-5  
                    `}
          >
            Edit Profile
          </p>
          <p
            onClick={() => handlePageChange("Change Password")}
            className={`
                        ${
                          tab === "Change Password"
                            ? "border-[var(--primary-color)] border-b-2 font-semibold text-[var(--primary-color)]"
                            : "border-b-2 border-transparent font-normal  text-gray-600"
                        }
                         cursor-pointer text-base leading-[18px]  
                    `}
          >
            Change Password
          </p>
        </div>
        {tab === "Profile" ? (
          <div className="max-w-[480px] mx-auto rounded-lg p-6">
            <h1 className="text-center text-[var(--primary-color)] leading-7 text-2xl font-medium mb-7">
              Edit Your Profile
            </h1>
            <Form
              onFinish={onEditProfile}
              layout="vertical"
              form={form}
              initialValues={{
                name: "",
                email: "",
                phoneNumber: "",
                address: "",
              }}
            >
              <Form.Item
                name="name"
                label={<p className="text-[16px] font-normal">User Name</p>}
              >
                <Input
                  style={{
                    width: "100%",
                    height: 40,
                    borderRadius: "5px",
                    color: "#919191",
                  }}
                  className="text-[16px] leading-5"
                  placeholder="Asadujjaman"
                />
              </Form.Item>
              <Form.Item
                name="email"
                label={<p className="text-[16px] font-normal">Email</p>}
              >
                <Input
                  style={{
                    width: "100%",
                    height: 40,
                    borderRadius: "5px",
                    color: "#919191",
                  }}
                  className="text-[16px] leading-5"
                  placeholder="xyz@gmail.com"
                  disabled
                />
              </Form.Item>

              <Form.Item
                name="phoneNumber"
                label={<p className="text-[16px] font-normal">Contact No</p>}
              >
                <Input
                  style={{
                    width: "100%",
                    height: 48,
                    borderRadius: "5px",
                    color: "#919191",
                  }}
                  className="text-[16px] leading-5"
                  placeholder="+9900700007"
                />
              </Form.Item>
              <Form.Item
                name="address"
                label={<p className="text-[16px] font-normal">Address</p>}
              >
                <Input
                  style={{
                    width: "100%",
                    height: 48,
                    borderRadius: "5px",
                    color: "#919191",
                  }}
                  className="text-[16px] leading-5"
                  placeholder="79/A Joker Vila, Gotham City"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={updateLoading}
                  style={{
                    width: 197,
                    height: 48,
                    color: "#FCFCFC",
                    backgroundColor: "#020123",
                  }}
                  className="font-normal text-[16px] leading-6 rounded-full"
                >
                  Save & Changes
                </Button>
              </Form.Item>
            </Form>
          </div>
        ) : (
          <div className="max-w-[481px] mx-auto rounded-lg p-6">
            <h1 className="text-center text-[var(--primary-color)] leading-7 text-2xl font-medium mb-7">
              Edit Your Profile
            </h1>
            <Form layout="vertical" onFinish={onFinish} form={form}>
              <Form.Item
                name="password"
                label={
                  <p className="text-[#415D71] text-sm leading-5 poppins-semibold">
                    Current Password
                  </p>
                }
                rules={[
                  {
                    required: true,
                    message: "Please Enter Current Password!",
                  },
                ]}
              >
                <Input.Password
                  style={{
                    width: "100%",
                    height: "42px",
                    borderRadius: "5px",
                    color: "black",
                    outline: "none",
                  }}
                  type="text"
                  placeholder="***************"
                />
              </Form.Item>

              <Form.Item
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please Enter New Password!",
                  },
                ]}
                label={
                  <p className="text-[#415D71] text-sm leading-5 poppins-semibold">
                    New Password
                  </p>
                }
              >
                <Input.Password
                  style={{
                    width: "100%",
                    height: "42px",
                    borderRadius: "5px",
                    color: "black",
                    outline: "none",
                  }}
                  type="text"
                  placeholder="************"
                />
              </Form.Item>

              <Form.Item
                label={
                  <p className="text-[#415D71] text-sm leading-5 poppins-semibold">
                    Confirm Password
                  </p>
                }
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Confirm Password!",
                  },
                ]}
              >
                <Input.Password
                  style={{
                    width: "100%",
                    height: "42px",
                    borderRadius: "5px",
                    color: "black",
                    outline: "none",
                  }}
                  type="text"
                  placeholder="***************"
                />
              </Form.Item>
              {passError && (
                <p className="text-red-600 -mt-4 mb-2">{passError}</p>
              )}
              <Form.Item
                style={{
                  marginBottom: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  style={{
                    width: 197,
                    height: 48,
                    color: "#FFFFFF",
                    backgroundColor: "#020123",
                  }}
                  disabled={changePasswordLoading}
                  className="font-normal text-[16px] leading-6 bg-[var(--primary-color)] rounded-full"
                >
                  {changePasswordLoading ? (
                    <Spin
                      indicator={
                        <LoadingOutlined
                          style={{ fontSize: 24, color: "#ffffff" }}
                          spin
                        />
                      }
                    />
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
