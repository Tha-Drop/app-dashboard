import { Table } from 'antd'
import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import img1 from '../../assets/images/user1.png'
import img2 from '../../assets/images/user2.png'
import { FaArrowLeft } from 'react-icons/fa'

const Transaction = () => {
  const columns = [
    {
      title: "Invoice",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",

    },
    {
      title: "Guest",
      dataIndex: "guest",
      key: "guest",
    },
    {
      title: "Hired",
      dataIndex: "hired",
      key: "hired",
    },

    {
      title: "Fee",
      dataIndex: "fee",
      key: "fee",
    },

    {
      title: "Commission",
      dataIndex: "commission",
      key: "commission",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <div className={`bg-[#E6F6F4] text-[#00A991] w-[60%] text-center rounded-sm py-1 ${record?.status === "Pending" ? "bg-red-100 text-[#D7263D]" : ""}`}>
          {record?.status}
        </div>
      )
    },



  ];


  const dataSource = [
    {
      key: "#12333",
      time: "18 Jul, 2023",
      guest: "Jhon Smith",
      hired: "Josep lucial",
      fee: '$500',
      commission: '$50',
      status: "Pending"
    },

    {
      key: "#12333",
      time: "22 Jul, 2023",
      guest: "Jhon Smith",
      hired: "Josep lucial",
      fee: '$500',
      commission: '$50',
      status: "Complete"
    },

    {
      key: "#12333",
      time: "18 Jul, 2023",
      guest: "Jhon Smith",
      hired: "Josep lucial",
      fee: '$500',
      commission: '$50',
      status: "Pending"
    },

    {
      key: "#12333",
      time: "18 Jul, 2023",
      guest: "Jhon Smith",
      hired: "Josep lucial",
      fee: '$500',
      commission: '$50',
      status: "Complete"
    },

    {
      key: "#12333",
      time: "18 Jul, 2023",
      guest: "Jhon Smith",
      hired: "Josep lucial",
      fee: '$500',
      commission: '$50',
      status: "Pending"
    },


  ];

  return (
    <div className='p-5 bg-white rounded-md'>

      <div className="flex justify-between item-center ">
        <div className="flex items-center gap-2">
          <Link to={-1}><FaArrowLeft size={18} className='text-[var(--primary-color)] ' /></Link>
          <span className='font-semibold text-[20px]'>Earning</span></div>
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

      <div>
      </div>
      <div className='mt-5'>
        <Table dataSource={dataSource} columns={columns} className="custom-pagination" pagination={{

          pageSize: 5,
          showTotal: (total, range) => `Showing ${range[0]}-${range[1]} out of ${total}`,
          locale: {
            items_per_page: '',
            prev_page: 'Previous',
            next_page: 'Next',
          },
        }} />
      </div>


    </div>
  )
}

export default Transaction