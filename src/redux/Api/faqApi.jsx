import { baseApi } from "./baseApi";


const faq = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /** Setting APIs */
    getFaq: builder.query({
      query: () => {
        return {
          url: "/faq/",
          method: "GET",
        };
      },
      providesTags: ["terms"],
    }),

    addFaq: builder.mutation({
      query: (data) => {
        return {
          url: "/faq/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["faq"],
    }),

    getFaqUpdate: builder.mutation({
      query: ({ id, data }) => {
        console.log(id, data);
        return {
          url: `/faq/update/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["faq"],
    }),

    deleteFaq: builder.mutation({
      query: (id) => {
        return {
          url: `/faq/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["faq"],
    }),
  }),
});

export const {
  useAddFaqMutation,
  useDeleteFaqMutation,
  useGetFaqQuery,
  useGetFaqUpdateMutation,
} = faq;
