import React, { useState } from 'react'
import Sidebar from '../../Components/Shared/Sidebar'
import Header from '../../Components/Shared/Header'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className='flex h-screen overflow-hidden bg-[#F5F5F5]'>
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className='fixed inset-0 bg-black/50 z-40 lg:hidden'
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed lg:static inset-y-0 left-0 z-50
                w-[200px] min-w-[200px] bg-[#020123] h-full overflow-y-auto
                transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <Sidebar onClose={() => setSidebarOpen(false)} />
            </div>

            {/* Main Content */}
            <div className='flex-1 flex flex-col h-full overflow-hidden'>
                {/* Sticky Header */}
                <div className='flex-shrink-0 z-30'>
                    <Header onMenuClick={() => setSidebarOpen(true)} />
                </div>
                <div className='flex-1 overflow-y-auto p-3 sm:p-4 md:p-5'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default MainLayout