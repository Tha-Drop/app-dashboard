import { Modal, Table } from 'antd';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const ProfileUpdateRequest = ({ dataSource }) => {
    // console.log(pagination)

   

    const columns = [
        {
            title: "SL no.",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Event Name",
            dataIndex: "eventName",
            key: "eventName",
          
        },
        {
            title: "User",
            dataIndex: "user",
            key: "user",
        },

        {
            title: "Start Time",
            dataIndex: "startTime",
            key: "startTime",
        },
        {
            title: "End Time",
            dataIndex: "endTime",
            key: "endTime",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price  ",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render : (_,record)=>(
                <div className={`bg-[#E6E7F4] text-[#000B90] max-w-[60%] text-center py-1 rounded-sm 
                ${record?.status === "Reserved" ? "bg-[#E6E7F4] text-[#00A991]" : ""}
                ${record?.status === "Canceled" ? "bg-[#E6E7F4] text-[#D7263D]" : ""}
                `} >
                    {/* {record?.status === "Complete" ? "" : ""} */}
                    {record?.status}
                </div>
            )
        },
    ];
    return (
        <div className=''>
            <Table dataSource={dataSource} columns={columns} className="custom-pagination" pagination={false} />
           
        </div>
    )
}

export default ProfileUpdateRequest