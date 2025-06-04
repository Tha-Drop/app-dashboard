import { Form, Input, Modal, Upload } from "antd";
import React, { useState } from "react";
import { useUpdateCategoryMutation } from "../../redux/Api/categoryApi";
import { toast } from "react-toastify";

const CategoryAddModal = ({ openModal, setOpenModal, title }) => {
  const [updateCategory, { isLoading: updating }] = useUpdateCategoryMutation();
  const [fileList, setFileList] = useState([]);

  const handleSaveCategory = (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    if (fileList.length > 0) {
      formData.append("categoryImage", fileList[0].originFileObj);
    }

    updateCategory(formData)
      .unwrap()
      .then(() => {
        setOpenModal(false);
        toast.success("Category added successfully");
        setFileList([]); // Reset file list
      })
      .catch((error) => {
        toast.error("Error adding/updating category:", error);
      });
  };

  const handleCancel = () => {
    setOpenModal(false);
    setFileList([]); // Reset file list on modal close
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <Modal
      open={openModal}
      onCancel={handleCancel}
      footer={false}
      centered
    >
      <p className="text-center text-xl font-medium">{title}</p>
      <Form layout="vertical" onFinish={handleSaveCategory}>
        <Form.Item
          label="Category Name"
          name="title"
          rules={[{ required: true, message: "Please enter the category name!" }]}
        >
          <Input placeholder="Enter Category" />
        </Form.Item>
        <label htmlFor="">Upload Image</label>
       <div className="flex justify-center">
       <Form.Item >
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            beforeUpload={() => false} // Prevent automatic upload
            style={{ width: "100%" }} // Make the upload area full width
          >
            {fileList.length < 1 && "+ Upload"}
          </Upload>
        </Form.Item>
       </div>
        <Form.Item className="flex justify-center">
          <button
            type="submit"
            className={`bg-[#020123] text-white px-5 py-2 rounded-md ${
              updating ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={updating}
          >
            {updating ? "Saving..." : "Save"}
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryAddModal;
