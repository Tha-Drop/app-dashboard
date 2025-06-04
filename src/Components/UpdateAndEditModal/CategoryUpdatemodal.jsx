import { Form, Input, Modal, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { imageUrl } from "../../redux/Api/baseApi";

const CategoryUpdatemodal = ({
  openModal,
  setOpenModal,
  selectedCategory,
  updateCategory,
  title,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (selectedCategory) {
      // Set form values
      form.setFieldsValue({
        title: selectedCategory.title,
      });

      // Set existing image as preview
      const existingImage = selectedCategory.categoryImage
        ? [
            {
              uid: "-1",
              name: "Existing Image",
              status: "done",
              url: `${imageUrl}/${selectedCategory.categoryImage}`,
            },
          ]
        : [];
      setFileList(existingImage);
    }
  }, [selectedCategory, form]);

  const handleSaveCategory = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);

    if (fileList.length > 0) {
      // Check if the user uploaded a new image
      if (fileList[0].originFileObj) {
        formData.append("categoryImage", fileList[0].originFileObj);
      } else if (fileList[0].url) {
        // Use the existing image URL
        formData.append("existingImageUrl", fileList[0].url.replace(imageUrl, ""));
      }
    }

    console.log(formData)
    try {
      await updateCategory({
        id: selectedCategory._id,
        data: formData,
      }).unwrap();
      toast.success("Category updated successfully!");
      setOpenModal(false);
      setFileList([]); // Reset file list
    } catch (error) {
      toast.error("Failed to update category.");
    }
  };

  const handleCloseModal = () => {
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
      onCancel={handleCloseModal}
      footer={false}
      centered
    >
      <p className="text-center text-xl font-medium">{title}</p>
      <Form layout="vertical" form={form} onFinish={handleSaveCategory}>
        <Form.Item
          name="title"
          label="Category Name"
          rules={[{ required: true, message: "Please enter a category name!" }]}
        >
          <Input placeholder="Enter Category" />
        </Form.Item>
        <label htmlFor="">Update Image</label>
        <div className="flex justify-center">
        <Form.Item>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            beforeUpload={() => false} // Prevent automatic upload
          >
            {fileList.length < 1 && "+ Upload"}
          </Upload>
        </Form.Item>
        </div>
        <Form.Item className="flex justify-center">
          <button
            type="submit"
            className="bg-[#020123] text-white px-5 py-2 rounded-md"
          >
            Save
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryUpdatemodal;
