import { Form, Input, Modal, Select, Upload } from "antd";
import React, { useState } from "react";
import { useGetCategoryQuery, useSubAddCategoryMutation } from "../../redux/Api/categoryApi";
import { toast } from "react-toastify";


const AddCreateSubcategoryModal = ({ openSubCategory, setOpenSunCategory, title }) => {
  const [form] = Form.useForm();

  // API hooks
  const { data: categoryData, isLoading: isCategoryLoading } = useGetCategoryQuery();
  const [addSubCategory, { isLoading: isSubCategoryLoading }] = useSubAddCategoryMutation();

  const [fileList, setFileList] = useState([]);

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("categoryId", values.categoryId);
    formData.append("title", values.subcategoryName);

    if (fileList.length > 0) {
      formData.append("subCategoryImage", fileList[0].originFileObj);
    }

    try {
      const res = await addSubCategory(formData).unwrap();
      toast.success("Subcategory added successfully!");
      setOpenSunCategory(false);
      form.resetFields();
      setFileList([]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add subcategory.");
    }
  };

  const handleCancel = () => {
    setOpenSunCategory(false);
    setFileList([]);
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
      open={openSubCategory}
      onCancel={handleCancel}
      footer={false}
      centered
    >
      <p className="text-center text-xl font-medium mb-4">{title}</p>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        {/* Category Selection */}
        <Form.Item
          name="categoryId"
          label="Category Name"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select
            placeholder="Select Category"
            loading={isCategoryLoading}
            options={categoryData?.data?.categories?.map((category) => ({
              value: category._id,
              label: category.title,
            }))}
          />
        </Form.Item>

        {/* Subcategory Name */}
        <Form.Item
          name="subcategoryName"
          label="Subcategory Name"
          rules={[{ required: true, message: "Please enter a subcategory name!" }]}
        >
          <Input placeholder="Enter Subcategory Name" />
        </Form.Item>

        {/* Image Upload */}
        <label htmlFor="">Upload Image</label>
        <div className="flex justify-center">
        <Form.Item >
       
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

        {/* Save Button */}
        <Form.Item className="flex justify-center">
          <button
            type="submit"
            className="bg-[#020123] text-white px-5 py-2 rounded-md"
            disabled={isSubCategoryLoading}
          >
            {isSubCategoryLoading ? "Saving..." : "Save"}
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCreateSubcategoryModal;
