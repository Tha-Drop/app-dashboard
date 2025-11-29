import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { Table } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import UpdateCreateSubCategoryModal from "../UpdateCreateSubCategoryModal/UpdateCreateSubCategoryModal";
import {
  useCategoryUpMutation,
  useDeleteCategoryMutation,
  useDeleteSubCategoryMutation,
  useGetCategoryQuery,
  useGetSubCategoryQuery,
} from "../../redux/Api/categoryApi";
import { imageUrl } from "../../redux/Api/baseApi";
import CategoryUpdatemodal from "../UpdateAndEditModal/CategoryUpdatemodal";
import CategoryAddModal from "../UpdateAndEditModal/CategoryAddModal";
import AddCreateSubcategoryMOdal from "../UpdateCreateSubCategoryModal/AddCreateSubcategoryMOdal";
import { toast } from "react-toastify";

// Dummy data for design testing
const dummyCategories = [
  { _id: '1', title: 'Corporate Events' },
  { _id: '2', title: 'Tattoo Parties' },
  { _id: '3', title: 'Pop Up Shops' },
  { _id: '4', title: 'Regular Basements' },
  { _id: '5', title: 'Large Events' },
  { _id: '6', title: 'Park Events' },
];

const dummySubCategories = [
  { _id: '1', title: 'Tattoo Parties', categoryTitle: 'Corporate Events' },
  { _id: '2', title: 'Park Events', categoryTitle: 'Tattoo Parties' },
  { _id: '3', title: 'Regular Basements', categoryTitle: 'Pop Up Shops' },
  { _id: '4', title: 'Pop Up Shops (Doesn\'t usually require tickets)', categoryTitle: 'Regular Basements' },
  { _id: '5', title: 'Park Events', categoryTitle: 'Large Events' },
];

const Category = () => {
  const [tab, setTab] = useState(true);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openSubCategory, setOpenSunCategory] = useState(false);
  const [openEditSubCategory, setOpenEditSunCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const { data: categoryData, isLoading } = useGetCategoryQuery();
  const { data: subCategoryData, isLoading: subCategoryLoading } =
    useGetSubCategoryQuery();

  const [updateCategory] = useCategoryUpMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [deletSub] = useDeleteSubCategoryMutation();

  const handleDeleteCategory = async (record) => {
    try {
      await deleteCategory(record._id).unwrap();
      toast.success("Category deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete category.");
    }
  };

  const handleDeleteSub = async (record) => {
    console.log(record._id);
    try {
      await deletSub(record._id).unwrap();
      toast.success("Category deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete category.");
    }
  };

  const handleEditSubCategory = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setOpenEditSunCategory(true);
  };
  const columns = [
    {
      title: "SI no.",
      dataIndex: "id",
      key: "id",
      render: (_, __, index) => <span className="text-gray-600">{index + 1}</span>,
      width: 100,
    },
    {
      title: "Category",
      dataIndex: "title",
      key: "title",
      render: (text) => <span className="text-gray-700">{text}</span>,
    },
    {
      title: <div className="flex justify-center">Action</div>,
      dataIndex: "action",
      key: "action",
      width: 150,
      render: (_, record) => (
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => handleEditCategory(record)}
            className="bg-[#020123] hover:bg-[#0a0a2e] text-white p-2 rounded-md"
          >
            <MdOutlineEdit size={18} />
          </button>
          <button
            onClick={() => handleDeleteCategory(record)}
            className="bg-[#FF5454] hover:bg-[#e64545] text-white p-2 rounded-md"
          >
            <RiDeleteBin6Line size={18} />
          </button>
        </div>
      ),
    },
  ];

  const SubColumns = [
    {
      title: "SI no.",
      dataIndex: "id",
      key: "id",
      render: (_, __, index) => <span className="text-gray-600">{index + 1}</span>,
      width: 80,
    },
    {
      title: "Subcategory",
      dataIndex: "title",
      key: "title",
      render: (text) => <span className="text-gray-700">{text}</span>,
    },
    {
      title: "Subcategory",
      dataIndex: "categoryTitle",
      key: "categoryTitle",
      render: (text) => <span className="text-gray-700">{text}</span>,
    },
    {
      title: <div className="flex justify-end pr-4">Action</div>,
      dataIndex: "action",
      key: "action",
      width: 120,
      render: (_, record) => (
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => handleEditSubCategory(record)}
            className="bg-[#020123] hover:bg-[#0a0a2e] text-white p-2 rounded-md"
          >
            <MdOutlineEdit size={18} />
          </button>
          <button
            onClick={() => handleDeleteSub(record)}
            className="bg-[#FF5454] hover:bg-[#e64545] text-white p-2 rounded-md"
          >
            <RiDeleteBin6Line size={18} />
          </button>
        </div>
      ),
    },
  ];
  // Use API data if available, otherwise use dummy data
  const dataSource = categoryData?.data?.categories?.length > 0
    ? categoryData.data.categories
    : dummyCategories;
  const subCategoryDataSource = subCategoryData?.data?.subCategories?.length > 0
    ? subCategoryData.data.subCategories
    : dummySubCategories;

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setOpenUpdateModal(true);
  };

  return (
    <div className="bg-white rounded-lg p-3 sm:p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
        <div className="flex items-center gap-3">
          <Link to={-1}>
            <FaArrowLeft size={18} className="text-[#EFC11F]" />
          </Link>
          <span className="font-semibold text-lg sm:text-[20px] text-[#020123]">Category</span>
        </div>
        <div className="w-full sm:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search here..."
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-[220px] pl-10 pr-4 py-2.5 sm:py-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:border-[#EFC11F] text-sm"
            />
            <span className="absolute left-3 top-3 sm:top-2.5 text-gray-400">
              <CiSearch size={18} />
            </span>
          </div>
        </div>
      </div>

      {/* Tab Buttons and Add Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 sm:pb-0">
          <button
            className={`whitespace-nowrap rounded-full px-4 sm:px-6 py-2.5 sm:py-2 text-sm font-medium transition-all min-h-[44px] sm:min-h-0 ${
              tab
                ? "bg-[#020123] text-white border border-[#020123]"
                : "bg-white text-[#EFC11F] border border-[#EFC11F]"
            }`}
            onClick={() => setTab(true)}
          >
            Category
          </button>
          <button
            className={`whitespace-nowrap rounded-full px-4 sm:px-6 py-2.5 sm:py-2 text-sm font-medium transition-all min-h-[44px] sm:min-h-0 ${
              !tab
                ? "bg-[#020123] text-white border border-[#020123]"
                : "bg-white text-[#EFC11F] border border-[#EFC11F]"
            }`}
            onClick={() => setTab(false)}
          >
            Sub Category
          </button>
        </div>
        {tab ? (
          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-2 bg-[#020123] text-white rounded-md px-4 sm:px-6 py-2.5 sm:py-2 text-sm font-medium hover:bg-[#0a0a2e] transition-all min-h-[44px] sm:min-h-0"
          >
            <FaPlus size={12} />
            Add
          </button>
        ) : (
          <button
            onClick={() => setOpenSunCategory(true)}
            className="flex items-center gap-2 bg-[#020123] text-white rounded-md px-4 sm:px-6 py-2.5 sm:py-2 text-sm font-medium hover:bg-[#0a0a2e] transition-all min-h-[44px] sm:min-h-0"
          >
            <FaPlus size={12} />
            Add
          </button>
        )}
      </div>

      {/* Table */}
      <div className="category-table overflow-x-auto">
        {tab ? (
          <Table
            columns={columns}
            dataSource={dataSource}
            rowKey="_id"
            pagination={false}
            className="category-management-table"
          />
        ) : (
          <Table
            columns={SubColumns}
            dataSource={subCategoryDataSource}
            loading={subCategoryLoading}
            rowKey="_id"
            pagination={false}
            className="category-management-table"
          />
        )}
      </div>
      {/* 
      <UpdateAndEditModal openModal={openUpdateModal} setOpenModal={setOpenUpdateModal} title={'Update Category'} /> */}
      <CategoryAddModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        title={"Add Category"}
      />
      {/* Update Category Modal */}
      <CategoryUpdatemodal
        openModal={openUpdateModal}
        setOpenModal={setOpenUpdateModal}
        selectedCategory={selectedCategory}
        updateCategory={updateCategory}
        title={"Update Category"}
      />
      <AddCreateSubcategoryMOdal
        openSubCategory={openSubCategory}
        setOpenSunCategory={setOpenSunCategory}
        title={"Add Subcategory"}
      />
      <UpdateCreateSubCategoryModal
        openSubCategory={openEditSubCategory}
        setOpenSunCategory={setOpenEditSunCategory}
        selectedSubCategory={selectedSubCategory}
        title={"Edit Subcategory"}
      />
    </div>
  );
};

export default Category;
