import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import GuestHostInfo from '../../Components/GuestHostInfo';
import { useGetAllGuestQuery } from '../../redux/Api/guestApi';
import { imageUrl } from '../../redux/Api/baseApi';
import Loading from '../../Loading/Loading';

const DeliveryDetails = () => {
  const [search, setSearch] = useState(""); // Declare search state first
  const { data, isLoading, isError } = useGetAllGuestQuery({ search });
  if (isLoading) return <div><Loading></Loading></div>;
  if (isError) return <div>Error fetching data</div>;

  const dataSource = data?.data?.map((guest, index) => ({
    key: `#${index + 1}`,
    _id: guest?._id,
    name: guest.name || 'N/A',
    img: guest.avatar || null,
    address: guest.address || guest.auth?.email || 'N/A',
    dob: guest.dateOfBirth ? new Date(guest.dateOfBirth).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : 'N/A',
    contact: guest.phoneNumber || 'N/A',
    email: guest.auth?.email || 'N/A',
    isBlocked: guest.auth?.isBlocked,
    license: guest.licenseNumber || 'N/A',
  }));

  return (
    <div className='p-3 sm:p-4 md:p-6 bg-white rounded-lg'>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
        <div className="flex items-center gap-3">
          <Link to={-1}><FaArrowLeft size={18} className='text-[#EFC11F]' /></Link>
          <span className='font-semibold text-lg sm:text-[20px] text-[#020123]'>Guest Management</span>
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

      <div>
        <GuestHostInfo dataSource={dataSource} />
      </div>
    </div>
  );
};

export default DeliveryDetails;
