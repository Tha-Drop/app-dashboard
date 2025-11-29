import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const notifications = [
    {
        id: 1,
        title: 'New Host Registration:',
        description: 'John Smith has registered as a new host and is awaiting approval. Please review their profile and documents.',
    },
    {
        id: 2,
        title: 'Event Booking Confirmed:',
        description: 'Holiday Party event scheduled for Dec 25, 2024 has been successfully booked by Sarah Johnson. Total amount: $850.',
    },
    {
        id: 3,
        title: 'Payment Received:',
        description: 'Payment of $1,250 has been received from Corporate Events Inc. for the New Year Celebration event booking.',
    },
];

const Notification = () => {
    return (
        <div className="bg-white rounded-lg p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <Link to={-1}>
                    <FaArrowLeft size={18} className="text-[#EFC11F]" />
                </Link>
                <span className="font-semibold text-[20px] text-[#020123]">All Notifications</span>
            </div>

            {/* Notifications List */}
            <div className="space-y-8 px-4">
                {notifications.map((notification) => (
                    <div key={notification.id} className="flex gap-2">
                        <span className="text-gray-700 font-medium">{notification.id}</span>
                        <div>
                            <span className="font-semibold text-[#020123]">{notification.title}</span>
                            <span className="text-gray-600 ml-1">{notification.description}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notification;
