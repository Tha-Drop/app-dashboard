import { baseApi } from "./baseApi";

const hostApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllbottole: builder.query({
      query: ({ role = "BOTTLEGIRL", isApproved = false, page = 1, limit = 10 }) => ({
        url: `/user/all?role=${role}&isApproved=${isApproved}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["approved"],
    }),
    
    getAllbottoleApprove: builder.query({
      query: ({ role = "BOTTLEGIRL", isApproved = true, page = 1, limit = 10 }) => ({
        url: `/user/all?role=${role}&isApproved=${isApproved}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["approved"],
    }),

    
      
  }),
});

export const {
useGetAllbottoleQuery,
useGetAllbottoleApproveQuery
 
} = hostApi;
