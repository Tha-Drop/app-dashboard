import React, { useState } from 'react'
import Tab from '../../Components/Tab/Tab'
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import HostCard from '../../Components/HostCard/HostCard';
import GuestHostInfo from '../../Components/GuestHostInfo';
import img1 from '../../assets/images/user1.png'
import img2 from '../../assets/images/user2.png'
import BottleCard from '../../Components/HostCard/BottleCard';
import { useGetAllbottoleApproveQuery } from '../../redux/Api/bottleApi';
import { imageUrl } from '../../redux/Api/baseApi';

const BottleGirl = () => {
  const [tab, setTab] = useState(true)
  const {data} = useGetAllbottoleApproveQuery({});
  console.log(data)

 
const dataSource = data?.data?.map((guest, index) => ({
  key: `#${index + 1}`,
  name: guest.name || 'N/A',
  img: guest.avatar ? guest.avatar : 'default-avatar.png',
  address: guest.auth.email || 'N/A', 
  dob: guest.dateOfBirth || 'N/A',
  contact: guest.phoneNumber || 'N/A',
  email: guest.auth.email,
  license: guest.licensePhoto || 'N/A',
  _id: guest?._id,
  isBlocked: guest.auth.isBlocked,
  license: <img className='w-[70px] h-[70px]' src={`${imageUrl}/${guest.licensePhoto}`} alt=''/>|| 'N/A',
}));
  return (
    <div className='bg-white p-4 rounded-md'>

    <div className="flex justify-between item-center mb-5 ">
        <div className="flex items-center gap-2">
            <Link to={-1}><FaArrowLeft size={18} className='text-[var(--primary-color)] ' /></Link>
            <span className='font-semibold text-[20px]'>Host</span></div>
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


    <div className='flex items-center gap-5 text-xl'>
        <button className={` border border-[#EFC11F]  shadow-md  hover:shadow-xl rounded-full px-4 py-1 ${tab ? "bg-[#EFC11F]" : "text-[#EFC11F]"}`} onClick={() => setTab(true)}>Host Request</button>
        <button className={` border border-[#EFC11F]  shadow-md  hover:shadow-xl rounded-full px-4 py-1 ${!tab ? "bg-[#EFC11F]" : "text-[#EFC11F]"}`} onClick={() => setTab(false)}>All Host Info</button>
    </div>

    <div>
        <p className='text-2xl my-8 font-semibold'>Show All Host Request</p>

        <div>
            {
                tab ? <BottleCard></BottleCard> : <GuestHostInfo dataSource={dataSource}/>
            }
        </div>
    </div>
</div>
  )
}

export default BottleGirl