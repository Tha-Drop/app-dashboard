import { Form, Input, Modal } from "antd";
import React from "react";
import { useUpdateCategoryMutation } from "../../redux/Api/categoryApi";
import { toast } from "react-toastify";

const CategoryAddModal = ({ openModal, setOpenModal, title }) => {
  const [form] = Form.useForm();
  const [updateCategory, { isLoading: updating }] = useUpdateCategoryMutation();

  const handleSaveCategory = (values) => {
    const formData = new FormData();
    formData.append("title", values.title);

    updateCategory(formData)
      .unwrap()
      .then(() => {
        setOpenModal(false);
        toast.success("Category added successfully");
        form.resetFields();
      })
      .catch((error) => {
        toast.error("Error adding category");
      });
  };

  const handleCancel = () => {
    setOpenModal(false);
    form.resetFields();
  };

  return (
    <Modal
      open={openModal}
      onCancel={handleCancel}
      footer={false}
      centered
      width={500}
    >
      <div className="py-8 px-4">
        <Form layout="vertical" form={form} onFinish={handleSaveCategory}>
          <Form.Item
            label={<span className="text-gray-700 font-medium">Category Name</span>}
            name="title"
            rules={[{ required: true, message: "Please enter the category name!" }]}
          >
            <Input
              placeholder="Corporate Events"
              className="h-12 rounded-md border-gray-300"
            />
          </Form.Item>

          <div className="flex gap-3 mt-8">
            <button
              type="submit"
              className={`flex-1 bg-[#020123] text-white py-3 rounded-full font-medium hover:bg-[#0a0a2e] transition-all ${
                updating ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={updating}
            >
              {updating ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-[#D7263D] text-white py-3 rounded-full font-medium hover:bg-[#b91c30] transition-all"
            >
              Cancel
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default CategoryAddModal;
