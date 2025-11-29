import { Table } from 'antd';
import React, { useState, useEffect } from 'react';
import { MdBlock } from 'react-icons/md';
import { BsGrid3X3GapFill, BsListUl } from 'react-icons/bs';
import { useGetBlockMutation, useGetUnBlockMutation } from '../redux/Api/guestApi';
import { toast } from 'react-toastify';
import { imageUrl } from '../redux/Api/baseApi';


const GuestHostInfo = ({ dataSource }) => {
  console.log(dataSource)
  const [blockUser] = useGetBlockMutation();
  const [unblockUser] = useGetUnBlockMutation();
  const [viewMode, setViewMode] = useState('card'); // 'card' or 'table' - default card for mobile/tablet
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  

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
      title: "SL no.",
      dataIndex: "key",
      key: "key",
      render: (text) => <span className="text-gray-600">{text}</span>,
    },
    {
      title: "User's Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        const defaultAvatar = "https://ui-avatars.com/api/?name=" + encodeURIComponent(record?.name || "User") + "&background=EFC11F&color=020123";
        const avatarSrc = record?.img ? `${imageUrl}/${record?.img}` : defaultAvatar;

        return (
          <div className="flex items-center gap-3">
            <img
              src={avatarSrc}
              className="w-[36px] h-[36px] rounded-full object-cover"
              alt=""
              onError={(e) => { e.target.src = defaultAvatar; }}
            />
            <p className="text-gray-700 text-sm">{record?.name}</p>
          </div>
        );
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text) => <span className="text-gray-500 text-xs">{text}</span>,
    },
    {
      title: "Date of birth",
      dataIndex: "dob",
      key: "dob",
      render: (text) => <span className="text-gray-600">{text}</span>,
    },
    {
      title: "Contact Number",
      dataIndex: "contact",
      key: "contact",
      render: (text) => <span className="text-gray-600">{text}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <span className="text-gray-600">{text}</span>,
    },
    {
      title: "License No.",
      dataIndex: "license",
      key: "license",
      render: (text) => <span className="text-gray-600">{text}</span>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        const isBlocked = record.isBlocked;
        return (
          <div className="flex items-center justify-center">
            <button
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                isBlocked
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-red-500 hover:bg-red-600 text-white'
              }`}
              onClick={() => handleToggleBlock(record)}
            >
              <MdBlock size={18} />
            </button>
          </div>
        );
      },
      align: "center",
    },
  ];

  // Mobile Card View Component
  const MobileCardView = () => (
    <div className="space-y-3 px-1">
      {dataSource?.map((record, index) => {
        const defaultAvatar = "https://ui-avatars.com/api/?name=" + encodeURIComponent(record?.name || "User") + "&background=EFC11F&color=020123";
        const avatarSrc = record?.img ? `${imageUrl}/${record?.img}` : defaultAvatar;

        return (
          <div key={record.key || index} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <img
                  src={avatarSrc}
                  className="w-12 h-12 rounded-full object-cover"
                  alt=""
                  onError={(e) => { e.target.src = defaultAvatar; }}
                />
                <div>
                  <p className="font-medium text-gray-800">{record?.name}</p>
                  <p className="text-xs text-gray-500">{record?.email}</p>
                </div>
              </div>
              <button
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                  record.isBlocked
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
                onClick={() => handleToggleBlock(record)}
              >
                <MdBlock size={18} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-400 text-xs">Address</span>
                <p className="text-gray-600 truncate">{record?.address || 'N/A'}</p>
              </div>
              <div>
                <span className="text-gray-400 text-xs">DOB</span>
                <p className="text-gray-600">{record?.dob || 'N/A'}</p>
              </div>
              <div>
                <span className="text-gray-400 text-xs">Contact</span>
                <p className="text-gray-600">{record?.contact || 'N/A'}</p>
              </div>
              <div>
                <span className="text-gray-400 text-xs">License</span>
                <p className="text-gray-600 truncate">{record?.license || 'N/A'}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="guest-table">
      {/* View Toggle Buttons - Only visible on mobile/tablet */}
      {!isDesktop && (
        <div className="flex justify-end mb-3 gap-2">
          <button
            onClick={() => setViewMode('card')}
            className={`p-2 rounded-md transition-all ${
              viewMode === 'card'
                ? 'bg-[#EFC11F] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title="Card View"
          >
            <BsGrid3X3GapFill size={18} />
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded-md transition-all ${
              viewMode === 'table'
                ? 'bg-[#EFC11F] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title="Table View"
          >
            <BsListUl size={18} />
          </button>
        </div>
      )}

      {/* Desktop: Always show table | Mobile/Tablet: Show based on viewMode */}
      {isDesktop ? (
        <Table
          dataSource={dataSource}
          columns={columns}
          className="guest-management-table"
          pagination={{
            pageSize: 10,
            showTotal: (total, range) => (
              <span className="pagination-total-text">
                SHOWING {range[0]}-{range[1]} OF {total}
              </span>
            ),
            showSizeChanger: false,
          }}
        />
      ) : viewMode === 'card' ? (
        <MobileCardView />
      ) : (
        <div className="overflow-x-auto -webkit-overflow-scrolling-touch">
          <Table
            dataSource={dataSource}
            columns={columns}
            className="guest-management-table"
            scroll={{ x: 800 }}
            pagination={{
              pageSize: 10,
              showTotal: (total, range) => (
                <span className="pagination-total-text">
                  SHOWING {range[0]}-{range[1]} OF {total}
                </span>
              ),
              showSizeChanger: false,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default GuestHostInfo;