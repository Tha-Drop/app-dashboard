import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Badge } from 'antd';
import { IoIosNotificationsOutline } from "react-icons/io";
import { HiMenuAlt2 } from "react-icons/hi";
import img from '../../assets/images/profile.png'
import { useGetProfileQuery } from '../../redux/Api/user';

const Header = ({ onMenuClick }) => {
  const navigate = useNavigate()
  const { data: profileData } = useGetProfileQuery();
  const userName = profileData?.data?.name || "Mis Banks";

  return (
    <div className='w-full h-[60px] sm:h-[72px] px-3 sm:px-4 md:px-6 bg-[#020123] flex justify-between items-center'>
      {/* Left Side - Hamburger + Welcome Message */}
      <div className='flex items-center gap-2 sm:gap-4'>
        {/* Hamburger Menu - visible on mobile/tablet only */}
        <button
          onClick={onMenuClick}
          className='lg:hidden p-2 text-white hover:text-[#EFC11F] transition-colors'
          aria-label="Toggle menu"
        >
          <HiMenuAlt2 size={24} />
        </button>

        {/* Welcome Message - hidden on very small screens */}
        <div className='hidden sm:block'>
          <h1 className='text-base sm:text-lg md:text-xl font-semibold text-white'>
            Welcome, <span className='text-[#EFC11F]'>{userName}</span>
          </h1>
          <p className='text-xs sm:text-sm text-gray-400 hidden md:block'>Have a nice day!</p>
        </div>
      </div>

      {/* Right Side - Notification & Profile */}
      <div className='flex items-center gap-2 sm:gap-4'>
        <Link
          to="/notification"
          className='bg-[#FEF9E7] h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-full hover:bg-[#EFC11F20] transition-all'
        >
          <Badge dot>
            <IoIosNotificationsOutline className='text-[#EFC11F]' size={20} />
          </Badge>
        </Link>

        <div
          onClick={() => navigate('/profile')}
          className='flex items-center gap-2 cursor-pointer'
        >
          <img className='h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover' src={img} alt="Profile" />
          <p className='font-medium text-white text-sm hidden md:block'>{userName}</p>
        </div>
      </div>
    </div>
  )
}

export default Header