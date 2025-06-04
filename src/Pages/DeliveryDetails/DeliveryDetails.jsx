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
    img: guest.avatar ? guest.avatar : 'default-avatar.png',
    address: guest.auth.email || 'N/A', 
    dob: guest.dateOfBirth || 'N/A',
    contact: guest.phoneNumber || 'N/A',
    email: guest.auth.email,
    isBlocked: guest.auth.isBlocked,
    license: <img className='w-[70px] h-[70px]' src={`${imageUrl}/${guest.licensePhoto}`} alt=''/>|| 'N/A',
  }));

  return (
    <div className='p-5 bg-white rounded-md'>
      <div className="flex justify-between item-center">
        <div className="flex items-center gap-2">
          <Link to={-1}><FaArrowLeft size={18} className='text-[var(--primary-color)]' /></Link>
          <span className='font-semibold text-[20px]'>Guest Management</span>
        </div>
        <div>
          <div className="relative">
            <input
             onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search here..."
              className="w-full pl-10 pr-4 py-1 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              <CiSearch />
            </span>
          </div>
        </div>
      </div>

      <div className='mt-5'>
        <GuestHostInfo dataSource={dataSource} />
      </div>
    </div>
  );
};

export default DeliveryDetails;
