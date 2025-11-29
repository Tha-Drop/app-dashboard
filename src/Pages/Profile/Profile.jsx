import React, { useEffect, useState } from "react";
import { Button, Form, Input, Spin } from "antd";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
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

  const adminUser = adminData?.data?.[0];

  return (
    <div className="bg-white rounded-lg p-3 sm:p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <Link to={-1}>
          <FaArrowLeft size={18} className="text-[#EFC11F]" />
        </Link>
        <span className="font-semibold text-lg sm:text-[20px] text-[#020123]">Profile</span>
      </div>

      {/* Profile Content */}
      <div className="rounded-md bg-[#FEFEFE]">
        <div className="py-6 sm:py-9 px-4 sm:px-10 rounded flex items-center justify-center flex-col gap-4">
          <div className="relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] mx-auto">
            <input
              type="file"
              onChange={handleImageChange}
              id="img"
              style={{ display: "none" }}
            />
            <img
              className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-full object-cover border-4 border-gray-100"
              src={`${
                image
                  ? URL.createObjectURL(image)
                  : adminUser?.avatar
                  ? `${imageUrl}/${adminUser?.avatar}`
                  : "https://ui-avatars.com/api/?name=" + encodeURIComponent(adminUser?.name || "Admin") + "&background=EFC11F&color=020123"
              }`}
              alt="Admin Profile"
            />

            {tab === "Profile" && (
              <label
                htmlFor="img"
                className="absolute bottom-2 right-0 bg-[#EFC11F] rounded-full w-7 h-7 flex items-center justify-center cursor-pointer shadow-md"
              >
                <IoCameraOutline className="text-white" size={16} />
              </label>
            )}
          </div>
          <div className="w-fit">
            <p className="text-[#020123] text-lg sm:text-[20px] leading-[28px] font-semibold">
              {adminUser?.name || "Admin"}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 mb-4 sm:mb-6 px-2">
          <p
            onClick={() => handlePageChange("Profile")}
            className={`
              ${
                tab === "Profile"
                  ? "border-[#EFC11F] border-b-2 font-semibold text-[#EFC11F]"
                  : "border-b-2 border-transparent font-normal text-gray-500"
              }
              cursor-pointer text-[13px] sm:text-[14px] leading-5 pb-1 transition-all min-h-[44px] sm:min-h-0 flex items-center
            `}
          >
            Edit Profile
          </p>
          <p
            onClick={() => handlePageChange("Change Password")}
            className={`
              ${
                tab === "Change Password"
                  ? "border-[#EFC11F] border-b-2 font-semibold text-[#EFC11F]"
                  : "border-b-2 border-transparent font-normal text-gray-500"
              }
              cursor-pointer text-[13px] sm:text-[14px] leading-5 pb-1 transition-all min-h-[44px] sm:min-h-0 flex items-center
            `}
          >
            Change Password
          </p>
        </div>
        {tab === "Profile" ? (
          <div className="max-w-[420px] mx-auto rounded-lg px-3 sm:px-6 pb-6">
            <h1 className="text-center text-[#020123] leading-7 text-base sm:text-lg font-semibold mb-4 sm:mb-6">
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
                label={<span className="text-gray-700 text-sm">User Name</span>}
              >
                <Input
                  className="h-10 rounded-md border-gray-300"
                  placeholder="Asadujjaman"
                />
              </Form.Item>
              <Form.Item
                name="email"
                label={<span className="text-gray-700 text-sm">Email</span>}
              >
                <Input
                  className="h-10 rounded-md border-gray-300"
                  placeholder="xyz@gmail.com"
                  disabled
                />
              </Form.Item>

              <Form.Item
                name="phoneNumber"
                label={<span className="text-gray-700 text-sm">Contact no</span>}
              >
                <Input
                  className="h-10 rounded-md border-gray-300"
                  placeholder="+9900700007"
                />
              </Form.Item>
              <Form.Item
                name="address"
                label={<span className="text-gray-700 text-sm">Address</span>}
              >
                <Input
                  className="h-10 rounded-md border-gray-300"
                  placeholder="79/A Joker Vila, Gotham City"
                />
              </Form.Item>

              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  disabled={updateLoading}
                  className={`bg-[#020123] text-white py-3 px-8 sm:px-12 rounded-md font-medium hover:bg-[#0a0a2e] transition-all min-h-[44px] w-full sm:w-auto ${
                    updateLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {updateLoading ? "Saving..." : "Save Change"}
                </button>
              </div>
            </Form>
          </div>
        ) : (
          <div className="max-w-[420px] mx-auto rounded-lg px-3 sm:px-6 pb-6">
            <h1 className="text-center text-[#020123] leading-7 text-base sm:text-lg font-semibold mb-4 sm:mb-6">
              Change Password
            </h1>
            <Form layout="vertical" onFinish={onFinish} form={form}>
              <Form.Item
                name="password"
                label={<span className="text-gray-700 text-sm">Current Password</span>}
                rules={[
                  {
                    required: true,
                    message: "Please Enter Current Password!",
                  },
                ]}
              >
                <Input.Password
                  className="h-10 rounded-md border-gray-300"
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
                label={<span className="text-gray-700 text-sm">New Password</span>}
              >
                <Input.Password
                  className="h-10 rounded-md border-gray-300"
                  placeholder="************"
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-gray-700 text-sm">Confirm Password</span>}
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Confirm Password!",
                  },
                ]}
              >
                <Input.Password
                  className="h-10 rounded-md border-gray-300"
                  placeholder="***************"
                />
              </Form.Item>
              {passError && (
                <p className="text-red-600 -mt-4 mb-2">{passError}</p>
              )}
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  disabled={changePasswordLoading}
                  className={`bg-[#020123] text-white py-3 px-8 sm:px-12 rounded-md font-medium hover:bg-[#0a0a2e] transition-all min-h-[44px] w-full sm:w-auto ${
                    changePasswordLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {changePasswordLoading ? "Saving..." : "Save Change"}
                </button>
              </div>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
