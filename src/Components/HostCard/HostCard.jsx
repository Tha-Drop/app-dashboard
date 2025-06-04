import React from 'react';


import { imageUrl } from '../../redux/Api/baseApi';
import { useGetAllaprovedMutation, useGetAllHostQuery } from '../../redux/Api/hostApi';
import { toast } from 'react-toastify';
import Loading from '../../Loading/Loading';

const HostCard = () => {
  const { data, isLoading, isError } = useGetAllHostQuery({});
  const [approveHost] = useGetAllaprovedMutation();

  if (isLoading) return <div><Loading></Loading></div>;
  if (isError) return <div>Error fetching data</div>;
  const handleApprove = async (id) => {
    try {
      const response = await approveHost({ id, data: {} }).unwrap(); // Pass an empty data object if not required
      toast.success('Host approved successfully:', response);
      // Optionally trigger a refetch or show a success notification
    } catch (error) {
      toast.error('Error approving host:', error);
    }
  };



  return (
    <div className='grid grid-cols-4 gap-5 items-center justify-center'>
      {
        data?.data?.map((host) => (
          <div key={host._id} className='bg-[#E8E5DA] hover:bg-[#E6E7F4] transition-all flex flex-col items-center py-8 rounded-md shadow-md'>
            <img src={`${imageUrl}/${host.licensePhoto}`} alt={host.name} className='w-16 h-16 rounded-full' />
            <p className='text-[#000B90] text-xl py-2'>{host.name || 'N/A'}</p>
            <p><span>Email:</span> {host.auth.email}</p>
            <p className='pt-2'><span>Contact:</span> {host.phoneNumber || 'N/A'}</p>
           
            <div className='flex items-center gap-5 text-white mt-4'>
              <button className='bg-[#D7263D] rounded-md shadow-md px-2 py-1'>Cancel</button>
              <button
                className='bg-[#000B90] rounded-md shadow-md px-2 py-1'
                onClick={() => handleApprove(host._id)}
              >
                Approve
              </button>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default HostCard;