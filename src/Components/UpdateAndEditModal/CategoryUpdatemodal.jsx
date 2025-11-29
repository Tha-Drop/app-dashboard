import { Form, Input, Modal } from "antd";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const CategoryUpdatemodal = ({
  openModal,
  setOpenModal,
  selectedCategory,
  updateCategory,
  title,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedCategory) {
      form.setFieldsValue({
        title: selectedCategory.title,
      });
    }
  }, [selectedCategory, form]);

  const handleSaveCategory = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);

    try {
      await updateCategory({
        id: selectedCategory._id,
        data: formData,
      }).unwrap();
      toast.success("Category updated successfully!");
      setOpenModal(false);
      form.resetFields();
    } catch (error) {
      toast.error("Failed to update category.");
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    form.resetFields();
  };

  return (
    <Modal
      open={openModal}
      onCancel={handleCloseModal}
      footer={false}
      centered
      width={450}
    >
      <div className="py-6 px-4">
        <p className="text-center text-lg font-semibold mb-6">
          <span className="text-[#020123]">+Edit</span> <span className="text-gray-500">Category</span>
        </p>

        <Form layout="vertical" form={form} onFinish={handleSaveCategory}>
          <Form.Item
            name="title"
            label={<span className="text-gray-700 text-sm">Category Name</span>}
            rules={[{ required: true, message: "Please enter a category name!" }]}
          >
            <Input
              placeholder="Corporate Events"
              className="h-10 rounded-md border-gray-300"
            />
          </Form.Item>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-[#020123] text-white py-2.5 px-16 rounded-md font-medium hover:bg-[#0a0a2e] transition-all"
            >
              Update
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default CategoryUpdatemodal;
