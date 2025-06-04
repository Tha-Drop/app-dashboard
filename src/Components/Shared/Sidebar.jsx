import React, { useEffect, useRef, useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { FaArrowTrendUp, FaSackDollar } from 'react-icons/fa6'
import { IoIosArrowForward } from 'react-icons/io'
import { IoSettingsOutline } from 'react-icons/io5'
import { LiaCubeSolid, LiaUserCogSolid } from 'react-icons/lia'
import { MdCategory, MdOutlineDashboard } from 'react-icons/md'
import { Navigate, NavLink, useLocation, useNavigate } from 'react-router-dom'
import img from '../../assets/images/logo.png'
import { RiMovie2Line } from 'react-icons/ri'
import { CiLogout } from 'react-icons/ci'
import { logout } from '../../redux/features/auth/authSlice'
import { useDispatch } from 'react-redux'
const Sidebar = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const contentRefs = useRef([]);
  const { pathname } = useLocation();


  const links = [
    {
      path: '/',
      label: 'Dashboard',
      icon: <MdOutlineDashboard size={25} />,
      sub_menu: false
    },
    {
      path: '/guest',
      label: 'Guest',
      icon: <FaRegUserCircle size={25} />,
      sub_menu: false
    },
    {
      path: '/earning',
      label: 'Earning',
      icon: <FaSackDollar size={25} />,
      sub_menu: false
    },
    {
      path: '/host',
      label: 'Host',
      icon: <LiaCubeSolid size={25} />,
      sub_menu: false
    },
    {
      path: '/dj',
      label: 'DJ',
      icon: <RiMovie2Line size={25} />,
      sub_menu: false
    },
 
    {
      path: '/bartender',
      label: 'Bartender',
      icon: <LiaUserCogSolid size={25} />,
      sub_menu: false
    },
    {
      path: '/bottle-girls',
      label: 'Bottle Girl',
      icon: <LiaUserCogSolid size={25} />,
      sub_menu: false
    },
    {
      path: '/category',
      label: 'Category',
      icon: <MdCategory size={25} />,
      sub_menu: false
    },

    {
      path: '#',
      label: 'Setting',
      icon: <IoSettingsOutline size={25} />,
      sub_menu: [
        {
          path: '/profile',
          label: 'Profile',
          icon: <></>,
        },
        {
          path: '/faq',
          label: 'FAQ',
          icon: <></>,
        },
        {
          path: '/terms-condition',
          label: 'Terms & Condition',
          icon: <></>,
        },
        {
          path: '/privacy-policy',
          label: 'Privacy Policy',
          icon: <></>,
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
    <div id='sidebar' className='flex flex-col gap-5  mt-[10px]'>
      <img src={img} className='w-[150px] h-[100px] mx-auto' alt="" />
    {
      links?.map((item, index) => {
        const isActive = item.path === pathname;
        const isSubMenuActive = item.sub_menu && item.sub_menu.some(subItem => subItem.path === pathname);
        if (item?.sub_menu) {
          return (
            <div key={index} >
              {isSubMenuActive ? <div className='absolute left-0  bg-black h-[45px] w-2  ' style={{
                borderRadius: "0 8px 8px 0",
              }}> 
              </div>: ""}
              <div onClick={() => toggleAccordion(index)}
                className={`cursor-pointer flex justify-start ml-8  mr-3 gap-2 items-center text-[var(--primary-color)] ${isSubMenuActive ? "bg-[#EFC11F] text-white "  : "bg-white"} py-[12px] px-2  rounded-tr-md    text-[16px] mb-[1px]`}
              >
                {item?.icon}
                {item?.label}
                <IoIosArrowForward />

              </div>

              <div
                ref={(el) => (contentRefs.current[index] = el)}
                className='accordion-content ml-8 mr-3 overflow-hidden transition-max-height duration-300 ease-in-out cursor-pointer  '
                style={{
                  maxHeight: openIndex === index ? `${contentRefs.current[index]?.scrollHeight}px` : '0px'
                }}
              >
                {
                  item?.sub_menu?.map((sub_item, subIndex) => {
                    const isSubItemActive = sub_item.path === pathname;
                    return (
                      <NavLink
                        to={sub_item?.path}
                        key={subIndex}
                        className={`flex justify-center items-center  ${isSubItemActive ? "bg-[#EFC11F] text-white" : "bg-white text-[var(--primary-color)]  "}  px-2  w-full py-2 mb-[1px] cursor-pointer `}
                      >
                        {sub_item?.icon}
                        {sub_item?.label}
                      </NavLink>
                    );
                  })
                }
              </div>
            </div>
          )
        } else {
          return (
            <div key={index} >
              {
                isActive ?  <div className='absolute left-0 bg-[#EFC11F]  h-[48px] w-[6px]  ' style={{
                  borderRadius: "0 8px 8px 0",
                }}>
                </div> : ""
              }
             
              <NavLink
                className={`cursor-pointer flex justify-start ml-8  mr-3 gap-2 items-center  ${isActive ? "bg-[#EFC11F] text-white " : "bg-white text-[var(--primary-color)] "}  py-[12px] px-2  rounded-tr-md rounded-br-md font-medium text-[16px]`}
                to={item?.path}
              >
                {item?.icon}
                {item?.label}
              </NavLink>
            </div>
          )
        }
      })
    }


<div
                onClick={handleLogOut}
                className="flex text-[4E4E4E]  items-center bg-[#6A6A6A] gap-3 text-white ml-10 cursor-pointer px-6 hover:bg-white-500 py-2 mt-32 transition-all"
            >
                <CiLogout size={24} color="text-[4E4E4E]" />
                Log Out
            </div>

  </div >
  )
}

export default Sidebar