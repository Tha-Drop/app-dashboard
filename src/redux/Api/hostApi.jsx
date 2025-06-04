import { baseApi } from "./baseApi";

const hostApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllHost: builder.query({
      query: ({ role = "HOST", isApproved = false, page = 1, limit = 10 }) => ({
        url: `/user/all?role=${role}&isApproved=${isApproved}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["approved"],
    }),
    
    getAllHostApprove: builder.query({
      query: ({ role = "HOST", isApproved = true, page = 1, limit = 10 }) => ({
        url: `/user/all?role=${role}&isApproved=${isApproved}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["approved"],
    }),

    getAllaproved: builder.mutation({
        query: ({ id, data }) => {
          return {
            url: `/user/approve/${id}`,
            method: "POST",
            body: data, // Ensure data is provided here
          };
        },
        invalidatesTags: ["approved"],
      }),
      
  }),
});

export const {
  useGetAllHostQuery,
  useGetAllHostApproveQuery,
  useGetAllaprovedMutation
} = hostApi;
