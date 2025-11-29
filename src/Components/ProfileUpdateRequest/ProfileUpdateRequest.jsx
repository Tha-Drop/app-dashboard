import { Table } from 'antd';
import React, { useState, useEffect } from 'react'
import { BsGrid3X3GapFill, BsListUl } from 'react-icons/bs';

const ProfileUpdateRequest = ({ dataSource }) => {
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
            title: "SINO.",
            dataIndex: "key",
            key: "key",
            width: 80,
        },
        {
            title: "Event Name",
            dataIndex: "eventName",
            key: "eventName",
            render: (text) => <span className="text-gray-700">{text}</span>
        },
        {
            title: "USER",
            dataIndex: "user",
            key: "user",
            render: (text) => <span className="text-gray-700">{text}</span>
        },
        {
            title: "Start Time",
            dataIndex: "startTime",
            key: "startTime",
            render: (text) => (
                <div className="text-gray-600 text-sm whitespace-pre-line">{text}</div>
            )
        },
        {
            title: "End time",
            dataIndex: "endTime",
            key: "endTime",
            render: (text) => (
                <div className="text-gray-600 text-sm whitespace-pre-line">{text}</div>
            )
        },
        {
            title: "PRICE",
            dataIndex: "price",
            key: "price",
            render: (text) => <span className="text-gray-700 font-medium">{text}</span>
        },
        {
            title: "STATUS",
            dataIndex: "status",
            key: "status",
            render: (_, record) => {
                let statusStyle = "px-4 py-1 rounded-[5px] text-xs font-medium inline-block bg-[#E6E7F4]";

                if (record?.status === "Complete") {
                    statusStyle += " text-[#7C83E8]";
                } else if (record?.status === "Reserved") {
                    statusStyle += " text-[#E8B931]";
                } else if (record?.status === "Cancelled" || record?.status === "Canceled") {
                    statusStyle += " text-[#F87171]";
                }

                return <span className={statusStyle}>{record?.status}</span>
            }
        },
    ];

    // Mobile Card View Component
    const MobileCardView = () => (
        <div className="space-y-3 px-1">
            {dataSource?.map((record, index) => {
                let statusStyle = "px-3 py-1 rounded-full text-xs font-medium inline-block";
                if (record?.status === "Complete") {
                    statusStyle += " bg-purple-100 text-purple-600";
                } else if (record?.status === "Reserved") {
                    statusStyle += " bg-yellow-100 text-yellow-600";
                } else if (record?.status === "Cancelled" || record?.status === "Canceled") {
                    statusStyle += " bg-red-100 text-red-500";
                } else {
                    statusStyle += " bg-gray-100 text-gray-600";
                }

                return (
                    <div key={record.key || index} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <p className="font-medium text-gray-800">{record?.eventName}</p>
                                <p className="text-xs text-gray-500">{record?.user}</p>
                            </div>
                            <span className={statusStyle}>{record?.status}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <span className="text-gray-400 text-xs">Start Time</span>
                                <p className="text-gray-600 text-xs">{record?.startTime}</p>
                            </div>
                            <div>
                                <span className="text-gray-400 text-xs">End Time</span>
                                <p className="text-gray-600 text-xs">{record?.endTime}</p>
                            </div>
                            <div className="col-span-2">
                                <span className="text-gray-400 text-xs">Price</span>
                                <p className="text-gray-800 font-medium">{record?.price}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );

    return (
        <div className='event-status-table'>
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
                    className="custom-table"
                    pagination={false}
                    rowKey="key"
                />
            ) : viewMode === 'card' ? (
                <MobileCardView />
            ) : (
                <div className="overflow-x-auto -webkit-overflow-scrolling-touch">
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        className="custom-table"
                        scroll={{ x: 700 }}
                        pagination={false}
                        rowKey="key"
                    />
                </div>
            )}
        </div>
    )
}

export default ProfileUpdateRequest