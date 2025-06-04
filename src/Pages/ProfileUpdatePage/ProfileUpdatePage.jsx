import React, { useState } from 'react'
import ProfileUpdateRequest from '../../Components/ProfileUpdateRequest/ProfileUpdateRequest';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Pagination } from 'antd';
const ProfileUpdatePage = () => {
    const [current, setCurrent] = useState(1);

    const onChange = (page) => {
        setCurrent(page);
    };

    const dataSource = [
        {
            key: "#12333",
            eventName: "Holiday Parties",
            user: 'Jhon Smith',
            startTime: "15/04/24",
            endTime: "12/03/24",
            price: "$124",
            status: "Complete",
          },
         
          {
            key: "#12333",
            eventName: "Holiday Parties",
            user: 'car',
            startTime: "12/2/25",
            endTime: "12/03/24",
            price: "124",
            status: "Reserved",
          },
         
          {
            key: "#12333",
            eventName: "Holiday Parties",
            user: 'car',
            startTime: "12/2/25",
            endTime: "12/03/24",
            price: "124",
            status: "Canceled",
          },
    ];

    return (
        <div className='bg-white rounded-md p-5'>
            <div className='flex items-center gap-2 py-2 mb-5'>
                <Link to={-1}><FaArrowLeft className='text-[var(--primary-color)]' size={20} /></Link>
                <p className='font-semibold '>Event Status</p>
            </div>
            <ProfileUpdateRequest dataSource={dataSource} />
            <div className='mt-2 flex items-center justify-center'>
                <Pagination current={current}
                    onChange={onChange}
                    total={11}
                    pageSize={1} 
                    showSizeChanger={false}
                    showTotal={(total, range) => `Showing ${range[0]}-${range[1]} out of ${total}`} />
            </div>
        </div>
    )
}

export default ProfileUpdatePage