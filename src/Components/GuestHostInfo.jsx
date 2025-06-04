import { Table } from 'antd';
import React from 'react';
import { MdBlock } from 'react-icons/md';
import { useGetBlockMutation, useGetUnBlockMutation } from '../redux/Api/guestApi';
import { toast } from 'react-toastify';
import { imageUrl } from '../redux/Api/baseApi';


const GuestHostInfo = ({ dataSource }) => {
  console.log(dataSource)
  const [blockUser] = useGetBlockMutation();
  const [unblockUser] = useGetUnBlockMutation();

  

  const handleToggleBlock = async (record) => {
    console.log(record.isBlocked);
    console.log(record._id);
  
    try {
      const { _id, isBlocked } = record;
      let response;
  
      if (isBlocked) {
        response = await unblockUser({ id: _id, data: {} }).unwrap();
        if (response?.success) {
          toast.success( "User unblocked successfully!");
        } else {
          toast.error("Failed to unblock user.");
        }
        console.log("User unblocked successfully:", response);
      } else {
        response = await blockUser({ id: _id, data: {} }).unwrap();
        if (response?.success) {
          toast.success("User blocked successfully!");
        } else {
          toast.error("Failed to block user.");
        }
        console.log("User blocked successfully:", response);
      }
  
      // Update the local state to reflect the changes dynamically
      setUpdatedData((prevData) =>
        prevData.map((item) =>
          item._id === _id ? { ...item, isBlocked: !isBlocked } : item
        )
      );
    } catch (error) {
      console.error("Error toggling block status:", error);
      
    }
  };
  


  const columns = [
    {
      title: "Order ID",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "User's Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        console.log(record)
        return (
          <div className="flex items-center gap-2">
            <img
              src={`${imageUrl}/${record?.img}`}
              className="w-[40px] h-[40px] flex justify-center"
              alt=""
            />
            <p className="font-medium">{record?.name}</p>
          </div>
        );
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Date of birth",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Contact Number",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "License No.",
      dataIndex: "license",
      key: "license",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        const isBlocked = record.isBlocked; // Assuming `isBlocked` is part of the record
        return (
          <div className="flex items-center justify-center gap-1">
            <button
              className={`${isBlocked ? 'bg-green-600' : 'bg-red-600'} text-white p-2 rounded-md`}
              onClick={() => handleToggleBlock(record)}
            >
              <MdBlock size={20} />
            </button>
          </div>
        );
      },
      align: "center",
    },
  ];

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        className="custom-pagination"
        pagination={{
          pageSize: 5,
          showTotal: (total, range) => `Showing ${range[0]}-${range[1]} out of ${total}`,
          locale: {
            items_per_page: '',
            prev_page: 'Previous',
            next_page: 'Next',
          },
        }}
      />
    </div>
  );
};

export default GuestHostInfo;