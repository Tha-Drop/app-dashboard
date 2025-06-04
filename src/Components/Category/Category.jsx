import React, { useState } from "react";
import Tab from "../../Components/Tab/Tab";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaEdit, FaPlus } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { Table } from "antd";

import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import UpdateCreateSubCategoryModal from "../UpdateCreateSubCategoryModal/UpdateCreateSubCategoryModal";

import Image from "../../assets/images/admin.png";
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
const Category = () => {
  const [tab, setTab] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openSubCategory, setOpenSunCategory] = useState(false);
  const [openEditSubCategory, setOpenEditSunCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const { data: categoryData, isLoading } = useGetCategoryQuery();
  const { data: subCategoryData, isLoading: subCategoryLoading } =
    useGetSubCategoryQuery();
  console.log(subCategoryData);

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
      title: "Sl No.",
      dataIndex: "id",
      key: "id",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <img
          className="w-[70px] h-[70px] object-cover"
          src={`${imageUrl}/${record.categoryImage}`}
          alt={record.title}
        />
      ),
    },
    {
      title: "Category",
      dataIndex: "title",
      key: "title",
    },
    {
      title: <div className="flex justify-center">Action</div>,
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => handleEditCategory(record)}
            className="bg-[#020123] text-white p-2 rounded-md"
          >
            <MdOutlineEdit size={25} />
          </button>
          <button
            onClick={() => handleDeleteCategory(record)}
            className="bg-red-600 text-white p-2 rounded-md"
          >
            <RiDeleteBin6Line size={25} />
          </button>
        </div>
      ),
    },
  ];

  const SubColumns = [
    {
      title: "Sl No.",
      dataIndex: "id",
      key: "id",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Subcategory Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Category",
      dataIndex: "categoryTitle",
      key: "categoryTitle",
    },
    {
      title: "Image",
      dataIndex: "subCategoryImage",
      key: "image",
      render: (text, record) => (
        <img
          className="w-[70px] h-[70px] object-cover"
          src={`${imageUrl}/${record.subCategoryImage}`}
          alt={record.title}
        />
      ),
    },
    {
      title: <div className="flex justify-center">Action</div>,
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => handleEditSubCategory(record)}
            className="bg-[#020123] text-white p-2 rounded-md"
          >
            <MdOutlineEdit size={25} />
          </button>
          <button
            onClick={() => handleDeleteSub(record)}
            className="bg-red-600 text-white p-2 rounded-md"
          >
            <RiDeleteBin6Line size={25} />
          </button>
        </div>
      ),
    },
  ];
  const dataSource = categoryData?.data?.categories || [];
  const subCategoryDataSource = subCategoryData?.data?.subCategories || [];

  const subDataSource = [
    {
      id: "1",
      image: <img className="w-[70px] h-[70px]" src={Image} alt="" />,
      category: "Corporate Event",
      subCategory: "Corporate Event",
    },
    {
      id: "2",
      image: <img className="w-[70px] h-[70px]" src={Image} alt="" />,
      category: "Corporate Event 2",
      subCategory: "Corporate Event 2",
    },
  ];

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setOpenUpdateModal(true);
  };

  return (
    <div className="bg-white rounded-md p-4">
      <div className="flex justify-between item-center pb-8">
        <div className="flex items-center gap-2">
          <Link to={-1}>
            <FaArrowLeft size={18} className="text-[var(--primary-color)] " />
          </Link>
          <span className=" text-[20px]">Bartender Information</span>
        </div>
        <div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search here..."
              className="w-full pl-10 pr-4 py-1 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 "
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              <CiSearch />
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Tab req={"Category"} info={"Sub category"} setTab={setTab} tab={tab} />
        {tab ? (
          <button
            onClick={() => setOpenModal(true)}
            className="flex  items-center gap-2 bg-[#020123] text-white rounded-full px-8 py-2 "
          >
            <FaPlus />
            Add
          </button>
        ) : (
          <button
            onClick={() => setOpenSunCategory(true)}
            className="flex  items-center gap-2 bg-[#020123] text-white rounded-full px-8 py-2 "
          >
            <FaPlus />
            Add Sub Category
          </button>
        )}
      </div>
      <div className="mt-10">
        {tab ? (
          <div>
            <p className="text-2xl mb-5">Show All Bartender Request</p>
          </div>
        ) : (
          <div>
            <p className="text-2xl mb-5">All Bartender Information</p>
          </div>
        )}
      </div>

      <div>
        {tab ? (
          <Table columns={columns} dataSource={dataSource} />
        ) : (
          <Table
            columns={SubColumns}
            dataSource={subCategoryDataSource}
            loading={subCategoryLoading}
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
