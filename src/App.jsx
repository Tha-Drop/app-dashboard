
import IncomeOverview from './Components/IncomeOverview/IncomeOverview'
import { Link } from 'react-router-dom'
import ProfileUpdateRequest from './Components/ProfileUpdateRequest/ProfileUpdateRequest'
import './App.css'
import img1 from './assets/images/user1.png'
import img2 from './assets/images/user2.png'
import img3 from './assets/images/driving.png'
import img4 from './assets/images/vichel.png'
import { MdLocalBar } from 'react-icons/md'
import { FaRegUser } from 'react-icons/fa'
import { RiMovie2Line } from 'react-icons/ri'
import PopularEventChart from './Components/PopularEventChart/PopularEventChart'
import { SiJordan } from 'react-icons/si'
function App() {

  // 
  const data = [
    {
      title: 'Total Guest',
      icon: <FaRegUser size={35} />,
      count: "83250",
    },
    {
      title: 'Total Host',
      icon: <FaRegUser size={35} />,
      count: "8,650",
    },
    {
      title: 'Total DJ',
      icon: <RiMovie2Line size={35} />,
      count: "52,650",
    },
    {
      title: 'Total Bartender',
      icon: <MdLocalBar size={35} />,
      count: "82,650",
    },
    {
      title: 'Total Bottle Girl',
      icon: <SiJordan size={35} />,
      count: "82,650",
    }
  ]



  // table data 
  const dataSource = [
    {
      key: "#12333",
      eventName: "Holiday Parties",
      startTime: 324189454648487,
      user: 'Jhon Smith',
      startTime: "15/04/24",
      endTime: "12/03/24",
      price: "$124",
      status: "Complete",
    },
   
    {
      key: "#12333",
      eventName: "Holiday Parties",
      startTime: 324189454648487,
      user: 'car',
      startTime: "A 23445355",
      endTime: "12/03/24",
      price: "124",
      status: "Reserved",
    },
   
    {
      key: "#12333",
      eventName: "Holiday Parties",
      startTime: 324189454648487,
      user: 'car',
      startTime: "A 23445355",
      endTime: "12/03/24",
      price: "124",
      status: "Canceled",
    },
   


  ];

  return (
    <div>

      {/*  statistics card for dashboard home page */}
      <div className="grid grid-cols-5 justify-center items-center gap-5">
        {
          data?.map((item, index) => <div className='w-full h-full flex justify-center items-center  flex-col gap-3 py-7 bg-[#EFC11F] p-2 rounded-md' key={index}>
            <p className='text-2xl  font-medium'>{item?.title}</p>
            <div className='bg-white rounded-full p-3'>
              {item?.icon}
            </div>
            <p className='text-3xl font-semibold'>{item?.count}</p>
          </div>)
        }
      </div>

      {/* Chart */}
      <div className='grid grid-cols-2 mt-5 gap-5'>
        <div className='w-full h-full bg-white p-4 rounded-md'>
          <IncomeOverview />


        </div>
        <div className='w-full h-full bg-white p-4 rounded-md'>
          <div>
            <p className='text-[#EFC11F] text-2xl'>Most Popular Event</p>
          </div>
          <PopularEventChart />
          <div className='flex justify-center gap-5 items-center text-xl'>

            <div>

              <div className='text-[#0088FE] flex items-center gap-2'> <div className='h-4 bg-[#0088FE] w-4 rounded-full'></div> Holiday Parties</div>
              <div className='text-[#00C49F] flex items-center gap-2'> <div className='h-4 bg-[#00C49F] w-4 rounded-full'></div>Tattoo Parties</div>
            </div>
            <div>

              <div className='text-[#FFBB28] flex items-center gap-2'> <div className='h-4 bg-[#FFBB28] w-4 rounded-full'></div>Big Events</div>
              <div className='text-[#FF8042] flex items-center gap-2'> <div className='h-4 bg-[#FF8042] w-4 rounded-full'></div>Park Event</div>
            </div>
          </div>
        </div>
      </div>


      {/* Profile update request section */}
      <div className="mt-5 bg-[white] p-5 rounded-md">

        <div className='flex justify-between items-center gap-2 mb-3 p-5'>
          <p className='text-2xl font-semibold'>Event Status</p> <Link className='border-b border-black' to={`/profile-update-request`}>
            View all
          </Link>
        </div>

        <ProfileUpdateRequest dataSource={dataSource} />
      </div>


    </div>
  )
}

export default App
