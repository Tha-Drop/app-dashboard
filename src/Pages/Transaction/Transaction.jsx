import { Table } from 'antd'
import React, { useState, useEffect } from 'react'
import { CiSearch } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { BsGrid3X3GapFill, BsListUl } from 'react-icons/bs'

const Transaction = () => {
  const [viewMode, setViewMode] = useState('card'); // 'card' or 'table' - default card for mobile/tablet
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const columns = [
    {
      title: "Invoice",
      dataIndex: "key",
      key: "key",
      render: (text) => <span className="text-gray-600">{text}</span>,
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (text) => <span className="text-gray-600">{text}</span>,
    },
    {
      title: "Guest",
      dataIndex: "guest",
      key: "guest",
      render: (text) => <span className="text-gray-600">{text}</span>,
    },
    {
      title: "Hired",
      dataIndex: "hired",
      key: "hired",
      render: (text) => <span className="text-gray-600">{text}</span>,
    },
    {
      title: "Fee",
      dataIndex: "fee",
      key: "fee",
      render: (text) => <span className="text-gray-600">{text}</span>,
    },
    {
      title: "Commission",
      dataIndex: "commission",
      key: "commission",
      render: (text) => <span className="text-gray-600">{text}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => {
        let statusStyle = "px-4 py-1 rounded-[5px] text-xs font-medium inline-block bg-[#E6E7F4]";

        if (record?.status === "Complete") {
          statusStyle += " text-[#00A991]";
        } else if (record?.status === "Pending") {
          statusStyle += " text-[#E8B931]";
        }

        return <span className={statusStyle}>{record?.status}</span>;
      }
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
    <div className='p-3 sm:p-4 md:p-6 bg-white rounded-lg'>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
        <div className="flex items-center gap-3">
          <Link to={-1}><FaArrowLeft size={18} className='text-[#EFC11F]' /></Link>
          <span className='font-semibold text-lg sm:text-[20px] text-[#020123]'>Earnings</span>
        </div>
        <div className="w-full sm:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search here..."
              className="w-full sm:w-[220px] pl-10 pr-4 py-2.5 sm:py-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:border-[#EFC11F] text-sm"
            />
            <span className="absolute left-3 top-3 sm:top-2.5 text-gray-400">
              <CiSearch size={18} />
            </span>
          </div>
        </div>
      </div>

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
        <div className="earning-table">
          <Table
            dataSource={dataSource}
            columns={columns}
            className="earning-management-table"
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
      ) : viewMode === 'card' ? (
        <div className="space-y-3">
          {dataSource.map((record, index) => {
            let statusStyle = "px-3 py-1 rounded-full text-xs font-medium inline-block";
            if (record?.status === "Complete") {
              statusStyle += " bg-green-100 text-green-600";
            } else if (record?.status === "Pending") {
              statusStyle += " bg-yellow-100 text-yellow-600";
            }

            return (
              <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium text-gray-800">{record?.key}</p>
                    <p className="text-xs text-gray-500">{record?.time}</p>
                  </div>
                  <span className={statusStyle}>{record?.status}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-400 text-xs">Guest</span>
                    <p className="text-gray-600">{record?.guest}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs">Hired</span>
                    <p className="text-gray-600">{record?.hired}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs">Fee</span>
                    <p className="text-gray-800 font-medium">{record?.fee}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs">Commission</span>
                    <p className="text-gray-800 font-medium">{record?.commission}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="earning-table overflow-x-auto -webkit-overflow-scrolling-touch">
          <Table
            dataSource={dataSource}
            columns={columns}
            className="earning-management-table"
            scroll={{ x: 700 }}
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
  )
}

export default Transaction