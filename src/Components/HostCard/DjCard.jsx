import React, { useState } from 'react';
import { useGetAlldjQuery } from '../../redux/Api/djApi';
import { useGetAllaprovedMutation } from '../../redux/Api/hostApi';
import { imageUrl } from '../../redux/Api/baseApi';
import { toast } from 'react-toastify';
import Loading from '../../Loading/Loading';

const DjCard = () => {
    const { data, isLoading, isError } = useGetAlldjQuery({});
    const [approveHost] = useGetAllaprovedMutation();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    if (isLoading) return <div><Loading /></div>;
    if (isError) return <div>Error fetching data</div>;

    const handleApprove = async (id) => {
        try {
            const response = await approveHost({ id, data: {} }).unwrap();
            toast.success('DJ approved successfully!');
        } catch (error) {
            toast.error('Error approving DJ');
        }
    };

    // Pagination logic
    const totalItems = data?.data?.length || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data?.data?.slice(startIndex, endIndex) || [];

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`min-w-[32px] h-[32px] rounded-md text-sm ${
                        currentPage === i
                            ? 'bg-[#EFC11F] text-white'
                            : 'text-gray-600 hover:text-[#EFC11F]'
                    }`}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <div className="dj-card-container">
            {/* Cards Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4'>
                {currentData.map((dj) => {
                    const defaultAvatar = "https://ui-avatars.com/api/?name=" + encodeURIComponent(dj.name || "User") + "&background=EFC11F&color=020123";
                    const avatarSrc = dj.avatar ? `${imageUrl}/${dj.avatar}` : defaultAvatar;

                    return (
                        <div
                            key={dj._id}
                            className='bg-[#E8E5DA] hover:shadow-lg transition-all flex flex-col items-center py-4 sm:py-5 px-2 sm:px-3 rounded-lg shadow-md'
                        >
                            <img
                                src={avatarSrc}
                                alt={dj.name}
                                className='w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover mb-2'
                                onError={(e) => { e.target.src = defaultAvatar; }}
                            />
                            <p className='text-[#000080] font-semibold text-sm text-center mb-1'>{dj.name || 'N/A'}</p>
                            <p className='text-gray-500 text-[10px] sm:text-[11px] text-center mb-0.5 break-all'>
                                <span className='text-gray-600'>Email:</span> {dj.auth?.email || 'N/A'}
                            </p>
                            <p className='text-gray-500 text-[10px] sm:text-[11px] text-center mb-0.5'>
                                <span className='text-gray-600'>License No:</span> {dj.licenseNumber || 'N/A'}
                            </p>
                            <p className='text-gray-500 text-[10px] sm:text-[11px] text-center mb-3'>
                                <span className='text-gray-600'>Contact:</span> {dj.phoneNumber || 'N/A'}
                            </p>

                            <div className='flex items-center gap-2 mt-auto'>
                                <button className='bg-[#D7263D] hover:bg-[#b91c30] text-white rounded-md px-4 py-2 sm:px-3 sm:py-1 text-xs font-medium transition-all min-h-[44px] sm:min-h-0'>
                                    Cancel
                                </button>
                                <button
                                    className='bg-[#000B90] hover:bg-[#000870] text-white rounded-md px-4 py-2 sm:px-3 sm:py-1 text-xs font-medium transition-all min-h-[44px] sm:min-h-0'
                                    onClick={() => handleApprove(dj._id)}
                                >
                                    Approve
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Pagination Bar */}
            {totalItems > 0 && (
                <div className='flex flex-col sm:flex-row items-center justify-between mx-2 sm:mx-[5%] lg:mx-[10%] mt-4 px-3 sm:px-5 py-3 gap-2 sm:gap-0 bg-[#E8E5DA] rounded-b-lg'>
                    <span className='text-[#EFC11F] text-xs sm:text-sm font-semibold tracking-wide'>
                        SHOWING {startIndex + 1}-{Math.min(endIndex, totalItems)} OF {totalItems}
                    </span>
                    <div className='flex items-center gap-1'>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className='min-w-[32px] h-[32px] flex items-center justify-center text-gray-600 hover:text-[#EFC11F] disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            &lt;
                        </button>
                        {renderPageNumbers()}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className='min-w-[32px] h-[32px] flex items-center justify-center text-gray-600 hover:text-[#EFC11F] disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DjCard;