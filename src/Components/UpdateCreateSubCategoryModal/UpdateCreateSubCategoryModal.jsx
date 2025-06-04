import { Form, Input, Modal, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useGetSubCategoryQuery, useSubCategoryUpdateMutation } from "../../redux/Api/categoryApi";
import { toast } from "react-toastify";
import { imageUrl } from "../../redux/Api/baseApi";


const UpdateCreateSubCategoryModal = ({
  openSubCategory,
  setOpenSunCategory,
  selectedSubCategory,
  title,
}) => {
  const [form] = Form.useForm();
  const [updateSubCategory] = useSubCategoryUpdateMutation();
  const { data: subCatagory } = useGetSubCategoryQuery();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (selectedSubCategory) {
      form.setFieldsValue({
        title: selectedSubCategory.title,
        categoryTitle: selectedSubCategory.categoryTitle,
      });

      // Set the existing image as preview
      const existingImage = selectedSubCategory.subCategoryImage
        ? [
            {
              uid: "-1",
              name: "Existing Image",
              status: "done",
              url: `${imageUrl}/${selectedSubCategory.subCategoryImage}`,
            },
          ]
        : [];
      setFileList(existingImage);
    }
  }, [selectedSubCategory, form]);

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("categoryTitle", values.categoryTitle);

    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append("subCategoryImage", fileList[0].originFileObj);
    }

    try {
      const res = await updateSubCategory({
        id: selectedSubCategory._id,
        data: formData,
      }).unwrap();
      console.log(res);
      toast.success("Subcategory updated successfully!");
      setOpenSunCategory(false);
      setFileList([]);
    } catch (error) {
      toast.error("Failed to update subcategory.");
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
        <Form.Item
          name="categoryTitle"
          label="Category Name"
          rules={[{ required: true, message: "Please enter category name!" }]}
        >
          <Input placeholder="Enter Category Name" disabled />
        </Form.Item>
        <Form.Item
          name="title"
          label="Subcategory Name"
          rules={[{ required: true, message: "Please enter subcategory name!" }]}
        >
          <Input placeholder="Enter Subcategory Name" />
        </Form.Item>
        <label htmlFor="">Update sub Image</label>
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

export default UpdateCreateSubCategoryModal;
