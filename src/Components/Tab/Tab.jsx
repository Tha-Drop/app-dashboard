import React from 'react'

const Tab = ({req, info , setTab , tab}) => {
    
    return (
        <div>
            <div className='flex items-center gap-5 text-xl'>
                <button className={` border border-[#EFC11F]  shadow-md  hover:shadow-xl rounded-full px-4 py-1 ${tab ? "bg-[#EFC11F]" : "text-[#EFC11F]"}`} onClick={() => setTab(true)}>{req}</button>
                <button className={` border border-[#EFC11F]  shadow-md  hover:shadow-xl rounded-full px-4 py-1 ${!tab ? "bg-[#EFC11F]" : "text-[#EFC11F]"}`} onClick={() => setTab(false)}>{info}</button>
            </div>
        </div>
    )
}

export default Tab