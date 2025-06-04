import { baseApi } from "./baseApi";

const hostApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAlldj: builder.query({
      query: ({ role = "DJ", isApproved = false, page = 1, limit = 10 , search = "" }) => ({
        url: `/user/all?role=${role}&isApproved=${isApproved}&page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["approved"],
    }),
    
    getAlldjApprove: builder.query({
      query: ({ role = "DJ", isApproved = true, page = 1, limit = 10 , search = "" }) => ({
        url: `/user/all?role=${role}&isApproved=${isApproved}&page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["approved"],
    }),

    
      
  }),
});

export const {
 useGetAlldjQuery,
 useGetAlldjApproveQuery
 
} = hostApi;
