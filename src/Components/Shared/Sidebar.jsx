import React, { useEffect, useRef, useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { IoSettingsOutline, IoClose } from 'react-icons/io5'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { BiLogOut } from 'react-icons/bi'
import { logout } from '../../redux/features/auth/authSlice'
import { useDispatch } from 'react-redux'
import { MdOutlineSpaceDashboard } from 'react-icons/md'
import { HiOutlineUsers } from 'react-icons/hi'
import { TbCoinFilled } from 'react-icons/tb'
import { BsPerson } from 'react-icons/bs'
import { FaHeadphonesAlt } from 'react-icons/fa'
import { BiDrink } from 'react-icons/bi'
import { GiWineGlass } from 'react-icons/gi'
import { BiCategory } from 'react-icons/bi'
import logo from '../../assets/images/logo.png'

const Sidebar = ({ onClose }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const contentRefs = useRef([]);
  const { pathname } = useLocation();

  const links = [
    {
      path: '/',
      label: 'Dashboard',
      icon: <MdOutlineSpaceDashboard size={20} />,
      sub_menu: false
    },
    {
      path: '/guest',
      label: 'Guest',
      icon: <HiOutlineUsers size={20} />,
      sub_menu: false
    },
    {
      path: '/earning',
      label: 'Earnings',
      icon: <TbCoinFilled size={20} />,
      sub_menu: false
    },
    {
      path: '/host',
      label: 'Host',
      icon: <BsPerson size={20} />,
      sub_menu: false
    },
    {
      path: '/dj',
      label: 'DJ',
      icon: <FaHeadphonesAlt size={18} />,
      sub_menu: false
    },
    {
      path: '/bartender',
      label: 'Bartender',
      icon: <BiDrink size={20} />,
      sub_menu: false
    },
    {
      path: '/bottle-girls',
      label: 'Bottle Girl',
      icon: <GiWineGlass size={20} />,
      sub_menu: false
    },
    {
      path: '/category',
      label: 'Category',
      icon: <BiCategory size={20} />,
      sub_menu: false
    },
    {
      path: '#',
      label: 'Settings',
      icon: <IoSettingsOutline size={20} />,
      sub_menu: [
        {
          path: '/faq',
          label: 'FAQ',
        },
        {
          path: '/terms-condition',
          label: 'Terms & Conditions',
        },
        {
          path: '/privacy-policy',
          label: 'Privacy Policy',
        },
        {
          path: '/about-us',
          label: 'About Us',
        },
        {
          path: '/profile',
          label: 'Profile',
        },
      ]
    },
  ]

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    if (openIndex !== null && contentRefs.current[openIndex]) {
      contentRefs.current[openIndex].style.maxHeight = `${contentRefs.current[openIndex].scrollHeight}px`;
    }
    contentRefs.current.forEach((ref, index) => {
      if (ref && index !== openIndex) {
        ref.style.maxHeight = '0px';
      }
    });
  }, [openIndex]);

  return (
    <div id='sidebar' className='flex flex-col h-full bg-[#020123]'>
      {/* Logo + Close Button */}
      <div className='flex items-center justify-between h-[90px] px-3'>
        <img src={logo} alt="Tha Drop" className='h-[60px] sm:h-[75px] object-contain' />
        {/* Close button - visible on mobile only */}
        <button
          onClick={onClose}
          className='lg:hidden p-2 text-white hover:text-[#EFC11F] transition-colors'
          aria-label="Close menu"
        >
          <IoClose size={24} />
        </button>
      </div>

      {/* Menu Items */}
      <div className='flex flex-col gap-[5px] px-3 pt-2 pb-2 flex-1'>
        {links?.map((item, index) => {
          const isActive = item.path === pathname;
          const isSubMenuActive = item.sub_menu && item.sub_menu.some(subItem => subItem.path === pathname);

          if (item?.sub_menu) {
            return (
              <div key={index}>
                <div
                  onClick={() => toggleAccordion(index)}
                  className={`cursor-pointer flex justify-between items-center px-3 py-2 text-[13px] font-medium transition-all ${
                    isSubMenuActive || openIndex === index
                      ? "bg-[#EFC11F] text-[#020123] rounded-t-sm"
                      : "bg-white text-[#020123] hover:bg-gray-100 rounded-sm"
                  }`}
                >
                  <div className='flex items-center gap-2'>
                    {item?.icon}
                    {item?.label}
                  </div>
                  <IoIosArrowForward
                    className={`transition-transform ${openIndex === index ? 'rotate-90' : ''}`}
                    size={12}
                  />
                </div>

                <div
                  ref={(el) => (contentRefs.current[index] = el)}
                  className='overflow-hidden transition-all duration-300 ease-in-out bg-[#2D2D3A] mt-0'
                  style={{
                    maxHeight: openIndex === index ? `${contentRefs.current[index]?.scrollHeight}px` : '0px'
                  }}
                >
                  {item?.sub_menu?.map((sub_item, subIndex) => {
                    const isSubItemActive = sub_item.path === pathname;
                    return (
                      <NavLink
                        to={sub_item?.path}
                        key={subIndex}
                        onClick={() => onClose?.()}
                        className={`flex items-center justify-center py-3 sm:py-2.5 text-[13px] transition-all border-b border-[#3D3D4A] last:border-b-0 min-h-[44px] sm:min-h-0 ${
                          isSubItemActive
                            ? "text-[#EFC11F] font-medium"
                            : "text-white hover:text-[#EFC11F]"
                        }`}
                      >
                        {sub_item?.label}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            )
          } else {
            return (
              <NavLink
                key={index}
                to={item?.path}
                onClick={() => onClose?.()}
                className={`flex items-center gap-2 px-3 py-3 sm:py-2 rounded-sm text-[13px] font-medium transition-all min-h-[44px] sm:min-h-0 ${
                  isActive
                    ? "bg-[#EFC11F] text-[#020123]"
                    : "bg-white text-[#020123] hover:bg-gray-100"
                }`}
              >
                {item?.icon}
                {item?.label}
              </NavLink>
            )
          }
        })}
      </div>

      {/* Log Out */}
      <div className='mt-auto px-4 pb-4'>
        <div
          onClick={handleLogOut}
          className="flex items-center gap-2 px-3 py-2 rounded-sm text-[13px] font-medium cursor-pointer transition-all bg-white text-[#020123] hover:bg-[#EFC11F]"
        >
          <BiLogOut size={18} />
          Log Out
        </div>
      </div>
    </div>
  )
}

export default Sidebar