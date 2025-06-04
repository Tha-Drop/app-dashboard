import { baseApi } from "./baseApi";

const hostApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllbartender: builder.query({
      query: ({ role = "BARTENDER", isApproved = false, page = 1, limit = 10 }) => ({
        url: `/user/all?role=${role}&isApproved=${isApproved}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["approved"],
    }),
    
    getAllbartenderApprove: builder.query({
      query: ({ role = "BARTENDER", isApproved = true, page = 1, limit = 10 }) => ({
        url: `/user/all?role=${role}&isApproved=${isApproved}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["approved"],
    }),

    
      
  }),
});

export const {
 useGetAllbartenderQuery,
 useGetAllbartenderApproveQuery
 
} = hostApi;
