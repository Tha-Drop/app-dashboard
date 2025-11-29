import { Form, Input, Modal, Select } from "antd";
import React from "react";
import { useGetCategoryQuery, useSubAddCategoryMutation } from "../../redux/Api/categoryApi";
import { toast } from "react-toastify";


const AddCreateSubcategoryModal = ({ openSubCategory, setOpenSunCategory, title }) => {
  const [form] = Form.useForm();

  // API hooks
  const { data: categoryData, isLoading: isCategoryLoading } = useGetCategoryQuery();
  const [addSubCategory, { isLoading: isSubCategoryLoading }] = useSubAddCategoryMutation();

  const handleSubmit = async (values) => {
    // Find the category title from the selected categoryId
    const selectedCategory = categoryData?.data?.categories?.find(
      (cat) => cat._id === values.categoryId
    );

    const formData = new FormData();
    formData.append("categoryTitle", selectedCategory?.title || "");
    formData.append("title", values.subcategoryName);

    try {
      const res = await addSubCategory(formData).unwrap();
      toast.success("Subcategory added successfully!");
      setOpenSunCategory(false);
      form.resetFields();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add subcategory.");
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
          <span className="text-[#020123]">+Add</span> <span className="text-gray-500">Subcategory</span>
        </p>
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          {/* Category Selection */}
          <Form.Item
            name="categoryId"
            label={<span className="text-gray-700 text-sm">Category Name</span>}
            rules={[{ required: true, message: "Please select a category!" }]}
          >
            <Select
              placeholder="Select Category"
              loading={isCategoryLoading}
              className="h-10"
              options={categoryData?.data?.categories?.map((category) => ({
                value: category._id,
                label: category.title,
              }))}
            />
          </Form.Item>

          {/* Subcategory Name */}
          <Form.Item
            name="subcategoryName"
            label={<span className="text-gray-700 text-sm">Subcategory</span>}
            rules={[{ required: true, message: "Please enter a subcategory name!" }]}
          >
            <Input
              placeholder="Enter Subcategory"
              className="h-10 rounded-md border-gray-300"
            />
          </Form.Item>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-[#D7263D] text-white py-3 rounded-md font-medium hover:bg-[#b91c30] transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 bg-[#020123] text-white py-3 rounded-md font-medium hover:bg-[#0a0a2e] transition-all ${
                isSubCategoryLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubCategoryLoading}
            >
              {isSubCategoryLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddCreateSubcategoryModal;
