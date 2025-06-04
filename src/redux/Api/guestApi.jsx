import { baseApi } from "./baseApi";



const guestApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      getAllGuest: builder.query({
        query: ({ role = "GUEST", isApproved = true, page = 1, limit = 10 , search = "" }) => ({
          url: `/user/all?role=${role}&isApproved=${isApproved}&page=${page}&limit=${limit}&search=${search}`,
          method: "GET",
        }),
        providesTags: ["approved"],
      }),

      getBlock: builder.mutation({
        query: ({ id, data }) => {
          return {
            url: `/user/block/${id}`,
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["approved"], 
      }),

      getUnBlock: builder.mutation({
        query: ({ id, data }) => {
          return {
            url: `/user/unblock/${id}`,
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["approved"], 
      }),
    }),
  });
  

export const { useGetAllGuestQuery , useGetBlockMutation, useGetUnBlockMutation} = guestApi;