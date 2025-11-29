import IncomeOverview from './Components/IncomeOverview/IncomeOverview'
import { Link } from 'react-router-dom'
import ProfileUpdateRequest from './Components/ProfileUpdateRequest/ProfileUpdateRequest'
import './App.css'
import { MdLocalBar } from 'react-icons/md'
import { FaRegUser } from 'react-icons/fa'
import { RiMovie2Line } from 'react-icons/ri'
import { GiWineGlass } from 'react-icons/gi'
import { HiOutlineUserGroup } from 'react-icons/hi'
import PopularEventChart from './Components/PopularEventChart/PopularEventChart'

function App() {
  const statsData = [
    {
      title: 'Total Guest',
      icon: <FaRegUser size={24} color="#020123" />,
      count: "852,650",
    },
    {
      title: 'Total Host',
      icon: <HiOutlineUserGroup size={24} color="#020123" />,
      count: "52,650",
    },
    {
      title: 'Total DJ',
      icon: <RiMovie2Line size={24} color="#020123" />,
      count: "52,650",
    },
    {
      title: 'Total Bartender',
      icon: <MdLocalBar size={24} color="#020123" />,
      count: "852,650",
    },
    {
      title: 'Total Bottle Girl',
      icon: <GiWineGlass size={24} color="#020123" />,
      count: "852,650",
    }
  ]

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
      status: "Cancelled",
    },
  ];

  return (
    <div>
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
        {statsData?.map((item, index) => (
          <div
            key={index}
            className='bg-[#EFC11F] rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 flex flex-col items-center justify-center gap-2 sm:gap-3 cursor-pointer transition-transform duration-300 hover:scale-105'
          >
            <p className='text-xs sm:text-sm text-[#020123] font-medium text-center'>{item?.title}</p>
            <div className='w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center'>
              {item?.icon}
            </div>
            <p className='text-lg sm:text-xl md:text-2xl font-bold text-[#020123]'>{item?.count}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className='flex flex-col lg:grid lg:grid-cols-[2fr_1fr] xl:grid-cols-[3fr_1fr] mt-4 sm:mt-5 gap-4 sm:gap-5'>
        {/* Earnings Overview */}
        <div className='bg-[#E8E5DA] p-3 sm:p-4 md:p-5 rounded-lg'>
          <IncomeOverview />
        </div>

        {/* Most Popular Event */}
        <div className='bg-[#E8E5DA] p-3 sm:p-4 md:p-5 rounded-lg lg:min-w-[280px]'>
          <p className='text-[#EFC11F] text-base sm:text-lg font-semibold mb-2'>Most Popular Event</p>
          <div className='flex flex-col items-center justify-center'>
            <div className='w-full max-w-[234px]'>
              <PopularEventChart />
            </div>
            <div className='grid grid-cols-2 gap-x-3 sm:gap-x-4 gap-y-2 text-[10px] sm:text-xs mt-4'>
              <div className='flex items-center gap-2'>
                <div className='h-2 w-2 bg-[#3B82F6] rounded-full flex-shrink-0'></div>
                <span className='text-[#3B82F6] font-medium'>Holiday Parties</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='h-2 w-2 bg-[#F59E0B] rounded-full flex-shrink-0'></div>
                <span className='text-[#F59E0B] font-medium'>Tattoo Parties</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='h-2 w-2 bg-[#10B981] rounded-full flex-shrink-0'></div>
                <span className='text-[#10B981] font-medium'>Big Events</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='h-2 w-2 bg-[#FCA5A5] rounded-full flex-shrink-0'></div>
                <span className='text-[#FCA5A5] font-medium'>Park Events</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Status Table */}
      <div className="mt-4 sm:mt-5 bg-white p-3 sm:p-4 md:p-5 rounded-lg" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-4'>
          <p className='text-lg sm:text-xl font-semibold text-[#020123]'>Event Status</p>
          <Link className='text-sm text-[#EFC11F] hover:underline' to={`/profile-update-request`}>
            View all
          </Link>
        </div>
        <ProfileUpdateRequest dataSource={dataSource} />
      </div>
    </div>
  )
}

export default App
