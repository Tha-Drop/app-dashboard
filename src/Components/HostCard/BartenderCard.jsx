import React, { useState } from "react";
import { useGetAllaprovedMutation } from "../../redux/Api/hostApi";
import { imageUrl } from "../../redux/Api/baseApi";
import { useGetAllbartenderQuery } from "../../redux/Api/bartender";
import { toast } from "react-toastify";
import Loading from "../../Loading/Loading";

// Dummy data for design testing - remove when API is ready
const dummyBartenders = [
    { _id: '1', name: 'Sanchez Haro Manuel', auth: { email: 'sanchez@gmail.com' }, licenseNumber: '33333333', phoneNumber: '+0201457888' },
    { _id: '2', name: 'Sanchez Haro Manuel', auth: { email: 'sanchez@gmail.com' }, licenseNumber: '33333333', phoneNumber: '+0201457888' },
    { _id: '3', name: 'Sanchez Haro Manuel', auth: { email: 'sanchez@gmail.com' }, licenseNumber: '33333333', phoneNumber: '+0201457888' },
    { _id: '4', name: 'Sanchez Haro Manuel', auth: { email: 'sanchez@gmail.com' }, licenseNumber: '33333333', phoneNumber: '+0201457888' },
    { _id: '5', name: 'Sanchez Haro Manuel', auth: { email: 'sanchez@gmail.com' }, licenseNumber: '33333333', phoneNumber: '+0201457888' },
    { _id: '6', name: 'Sanchez Haro Manuel', auth: { email: 'sanchez@gmail.com' }, licenseNumber: '33333333', phoneNumber: '+0201457888' },
    { _id: '7', name: 'Sanchez Haro Manuel', auth: { email: 'sanchez@gmail.com' }, licenseNumber: '33333333', phoneNumber: '+0201457888' },
    { _id: '8', name: 'Sanchez Haro Manuel', auth: { email: 'sanchez@gmail.com' }, licenseNumber: '33333333', phoneNumber: '+0201457888' },
    { _id: '9', name: 'Sanchez Haro Manuel', auth: { email: 'sanchez@gmail.com' }, licenseNumber: '33333333', phoneNumber: '+0201457888' },
    { _id: '10', name: 'Sanchez Haro Manuel', auth: { email: 'sanchez@gmail.com' }, licenseNumber: '33333333', phoneNumber: '+0201457888' },
    { _id: '11', name: 'Sanchez Haro Manuel', auth: { email: 'sanchez@gmail.com' }, licenseNumber: '33333333', phoneNumber: '+0201457888' },
    { _id: '12', name: 'Sanchez Haro Manuel', auth: { email: 'sanchez@gmail.com' }, licenseNumber: '33333333', phoneNumber: '+0201457888' },
    { _id: '13', name: 'Sanchez Haro Manuel', auth: { email: 'sanchez@gmail.com' }, licenseNumber: '33333333', phoneNumber: '+0201457888' },
    { _id: '14', name: 'Sanchez Haro Manuel', auth: { email: 'sanchez@gmail.com' }, licenseNumber: '33333333', phoneNumber: '+0201457888' },
    { _id: '15', name: 'Sanchez Haro Manuel', auth: { email: 'sanchez@gmail.com' }, licenseNumber: '33333333', phoneNumber: '+0201457888' },
];

const BartenderCard = () => {
    const { data, isLoading, isError } = useGetAllbartenderQuery({});
    const [approveHost] = useGetAllaprovedMutation();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Use API data if available, otherwise use dummy data
    const bartenderData = data?.data?.length > 0 ? data.data : dummyBartenders;

    if (isLoading) return <div><Loading /></div>;

    const handleApprove = async (id) => {
        try {
            const response = await approveHost({ id, data: {} }).unwrap();
            toast.success("Bartender approved successfully!");
        } catch (error) {
            toast.error("Error approving Bartender");
        }
    };

    // Pagination logic
    const totalItems = bartenderData?.length || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = bartenderData?.slice(startIndex, endIndex) || [];

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
        <div className="bartender-card-container">
            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                {currentData.map((bartender) => {
                    const defaultAvatar = "https://ui-avatars.com/api/?name=" + encodeURIComponent(bartender.name || "User") + "&background=EFC11F&color=020123";
                    const avatarSrc = bartender.avatar ? `${imageUrl}/${bartender.avatar}` : defaultAvatar;

                    return (
                        <div
                            key={bartender._id}
                            className="bg-[#E8E5DA] hover:shadow-lg transition-all flex flex-col items-center py-4 sm:py-5 px-2 sm:px-3 rounded-lg shadow-md"
                        >
                            <img
                                src={avatarSrc}
                                alt={bartender.name}
                                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover mb-2"
                                onError={(e) => { e.target.src = defaultAvatar; }}
                            />
                            <p className="text-[#000080] font-semibold text-sm text-center mb-1">{bartender.name || "N/A"}</p>
                            <p className="text-gray-500 text-[10px] sm:text-[11px] text-center mb-0.5 break-all">
                                <span className="text-gray-600">Email:</span> {bartender.auth?.email || "N/A"}
                            </p>
                            <p className="text-gray-500 text-[10px] sm:text-[11px] text-center mb-0.5">
                                <span className="text-gray-600">License No:</span> {bartender.licenseNumber || "N/A"}
                            </p>
                            <p className="text-gray-500 text-[10px] sm:text-[11px] text-center mb-3">
                                <span className="text-gray-600">Contact:</span> {bartender.phoneNumber || "N/A"}
                            </p>

                            <div className="flex items-center gap-2 mt-auto">
                                <button className="bg-[#D7263D] hover:bg-[#b91c30] text-white rounded-md px-4 py-2 sm:px-3 sm:py-1 text-xs font-medium transition-all min-h-[44px] sm:min-h-0">
                                    Cancel
                                </button>
                                <button
                                    className="bg-[#000B90] hover:bg-[#000870] text-white rounded-md px-4 py-2 sm:px-3 sm:py-1 text-xs font-medium transition-all min-h-[44px] sm:min-h-0"
                                    onClick={() => handleApprove(bartender._id)}
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
                <div className="flex flex-col sm:flex-row items-center justify-between mx-2 sm:mx-[5%] lg:mx-[10%] mt-4 px-3 sm:px-5 py-3 gap-2 sm:gap-0 bg-[#E8E5DA] rounded-b-lg">
                    <span className="text-[#EFC11F] text-xs sm:text-sm font-semibold tracking-wide">
                        SHOWING {startIndex + 1}-{Math.min(endIndex, totalItems)} OF {totalItems}
                    </span>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="min-w-[32px] h-[32px] flex items-center justify-center text-gray-600 hover:text-[#EFC11F] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            &lt;
                        </button>
                        {renderPageNumbers()}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="min-w-[32px] h-[32px] flex items-center justify-center text-gray-600 hover:text-[#EFC11F] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BartenderCard;
