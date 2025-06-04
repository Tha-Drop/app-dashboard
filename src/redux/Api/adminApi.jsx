import { baseApi } from "./baseApi";

const hostApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAdmin: builder.query({
      query: () => ({
        url: `/user/all?role=ADMIN&isApproved=false&page=1&limit=1`,
        method: "GET",
      }),
      providesTags: ["ADMIN"],
    }),

    updateProfilee: builder.mutation({
        query: (data) => {
          return {
            url: "/user/update",
            method: "PUT",
            body: data,
          };
        },
        invalidatesTags: ["ADMIN"],
      }),
      
  }),
});

export const {
 useGetAllAdminQuery,
 useUpdateProfileeMutation
 
} = hostApi;
