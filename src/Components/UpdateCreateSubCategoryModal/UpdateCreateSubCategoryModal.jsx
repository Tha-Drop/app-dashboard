import { Form, Input, Modal } from "antd";
import React, { useEffect } from "react";
import { useSubCategoryUpdateMutation } from "../../redux/Api/categoryApi";
import { toast } from "react-toastify";


const UpdateCreateSubCategoryModal = ({
  openSubCategory,
  setOpenSunCategory,
  selectedSubCategory,
  title,
}) => {
  const [form] = Form.useForm();
  const [updateSubCategory, { isLoading }] = useSubCategoryUpdateMutation();

  useEffect(() => {
    if (selectedSubCategory) {
      form.setFieldsValue({
        title: selectedSubCategory.title,
        categoryTitle: selectedSubCategory.categoryTitle,
      });
    }
  }, [selectedSubCategory, form]);

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("categoryTitle", values.categoryTitle);

    try {
      const res = await updateSubCategory({
        id: selectedSubCategory._id,
        data: formData,
      }).unwrap();
      toast.success("Subcategory updated successfully!");
      setOpenSunCategory(false);
      form.resetFields();
    } catch (error) {
      toast.error("Failed to update subcategory.");
    }
  };

  const handleCancel = () => {
    setOpenSunCategory(false);
    form.resetFields();
  };

  return (
    <Modal
      open={openSubCategory}
      onCancel={handleCancel}
      footer={false}
      centered
      width={450}
    >
      <div className="py-6 px-4">
        <p className="text-center text-lg font-semibold mb-6">
          <span className="text-[#020123]">+Edit</span> <span className="text-gray-500">Subcategory</span>
        </p>
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item
            name="categoryTitle"
            label={<span className="text-gray-700 text-sm">Category Name</span>}
            rules={[{ required: true, message: "Please enter category name!" }]}
          >
            <Input
              placeholder="Enter Category Name"
              className="h-10 rounded-md border-gray-300"
              disabled
            />
          </Form.Item>
          <Form.Item
            name="title"
            label={<span className="text-gray-700 text-sm">Subcategory</span>}
            rules={[{ required: true, message: "Please enter subcategory name!" }]}
          >
            <Input
              placeholder="Enter Subcategory Name"
              className="h-10 rounded-md border-gray-300"
            />
          </Form.Item>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className={`bg-[#020123] text-white py-2.5 px-16 rounded-md font-medium hover:bg-[#0a0a2e] transition-all ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default UpdateCreateSubCategoryModal;
