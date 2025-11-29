import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import GuestHostInfo from '../../Components/GuestHostInfo';
import { useGetAlldjApproveQuery } from '../../redux/Api/djApi';
import { imageUrl } from '../../redux/Api/baseApi';
import DjCard from '../../Components/HostCard/DjCard';

const DjManagement = () => {
    const [search, setSearch] = useState("");
    const [tab, setTab] = useState(true)
    const { data } = useGetAlldjApproveQuery({});

    const dataSource = data?.data?.map((guest, index) => ({
        key: `#${index + 1}`,
        name: guest.name || 'N/A',
        img: guest.avatar ? guest.avatar : 'default-avatar.png',
        address: guest.auth.email || 'N/A',
        dob: guest.dateOfBirth || 'N/A',
        contact: guest.phoneNumber || 'N/A',
        email: guest.auth.email,
        _id: guest?._id,
        isBlocked: guest.auth.isBlocked,
        license: <img className='w-[70px] h-[70px]' src={`${imageUrl}/${guest.licensePhoto}`} alt='' /> || 'N/A',
    }));

    return (
        <div className='bg-white p-3 sm:p-4 md:p-6 rounded-lg'>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
                <div className="flex items-center gap-3">
                    <Link to={-1}><FaArrowLeft size={18} className='text-[#EFC11F]' /></Link>
                    <span className='font-semibold text-lg sm:text-[20px] text-[#020123]'>Host Information</span>
                </div>
                <div className="w-full sm:w-auto">
                    <div className="relative">
                        <input
                            onChange={(e) => setSearch(e.target.value)}
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

            {/* Tab Buttons */}
            <div className='flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2'>
                <button
                    className={`whitespace-nowrap rounded-full px-4 sm:px-6 py-2.5 sm:py-2 text-sm font-medium transition-all min-h-[44px] sm:min-h-0 ${
                        tab
                            ? "bg-[#020123] text-white border border-[#020123]"
                            : "bg-white text-[#020123] border border-[#020123]"
                    }`}
                    onClick={() => setTab(true)}
                >
                    Dj's Request
                </button>
                <button
                    className={`whitespace-nowrap rounded-full px-4 sm:px-6 py-2.5 sm:py-2 text-sm font-medium transition-all min-h-[44px] sm:min-h-0 ${
                        !tab
                            ? "bg-[#020123] text-white border border-[#020123]"
                            : "bg-white text-[#020123] border border-[#020123]"
                    }`}
                    onClick={() => setTab(false)}
                >
                    All Host Info
                </button>
            </div>

            {/* Content Section */}
            <div>
                <p className='text-lg my-6 font-semibold text-[#020123]'>
                    {tab ? "Show All Dj's Request" : "All DJ Info"}
                </p>

                <div>
                    {tab ? <DjCard /> : <GuestHostInfo dataSource={dataSource} />}
                </div>
            </div>
        </div>
    )
}

export default DjManagement