import React, { useState } from 'react'
import ProfileUpdateRequest from '../../Components/ProfileUpdateRequest/ProfileUpdateRequest';
import { FaArrowLeft } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import { Link } from 'react-router-dom';

const ProfileUpdatePage = () => {
    const [search, setSearch] = useState('');

    const dataSource = [
        {
            key: "1",
            eventName: "Holiday Parties",
            user: 'John Smith',
            startTime: "18Aug, 2017\n4:45pm",
            endTime: "18Aug, 2017\n6:45pm",
            price: "$850.00",
            status: "Complete",
        },
        {
            key: "2",
            eventName: "Holiday Parties",
            user: 'John Smith',
            startTime: "18Aug, 2017\n4:45pm",
            endTime: "18Aug, 2017\n8:45pm",
            price: "$850.00",
            status: "Complete",
        },
        {
            key: "3",
            eventName: "Holiday Parties",
            user: 'John Smith',
            startTime: "18Aug, 2017\n4:45pm",
            endTime: "18Aug, 2017\n8:45pm",
            price: "$850.00",
            status: "Reserved",
        },
        {
            key: "4",
            eventName: "Holiday Parties",
            user: 'John Smith',
            startTime: "18Aug, 2017\n4:45pm",
            endTime: "18Aug, 2017\n8:45pm",
            price: "$850.00",
            status: "Complete",
        },
        {
            key: "5",
            eventName: "Holiday Parties",
            user: 'John Smith',
            startTime: "18Aug, 2017\n4:45pm",
            endTime: "18Aug, 2017\n8:45pm",
            price: "$850.00",
            status: "Canceled",
        },
    ];

    // Filter data based on search
    const filteredData = dataSource.filter(item =>
        item.eventName.toLowerCase().includes(search.toLowerCase()) ||
        item.user.toLowerCase().includes(search.toLowerCase()) ||
        item.key.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className='p-3 sm:p-4 md:p-6 bg-white rounded-lg'>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
                <div className="flex items-center gap-3">
                    <Link to={-1}><FaArrowLeft size={18} className='text-[#EFC11F]' /></Link>
                    <span className='font-semibold text-lg sm:text-[20px] text-[#020123]'>Event Status</span>
                </div>
                <div className="w-full sm:w-auto">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search here..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full sm:w-[220px] pl-10 pr-4 py-2.5 sm:py-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:border-[#EFC11F] text-sm"
                        />
                        <span className="absolute left-3 top-3 sm:top-2.5 text-gray-400">
                            <CiSearch size={18} />
                        </span>
                    </div>
                </div>
            </div>

            {/* Table/Cards */}
            <ProfileUpdateRequest dataSource={filteredData} />
        </div>
    )
}

export default ProfileUpdatePage