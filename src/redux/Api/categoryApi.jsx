import { baseApi } from "./baseApi";

const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => {
        return {
          url: "/category",
          method: "GET",
        };
      },
      providesTags: ["category"],
    }),
    updateCategory: builder.mutation({
      query: (data) => {
        return {
          url: "/category/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["category"],
    }),

    categoryUp: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/category/update/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["category"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => {
        return {
          url: `/category/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["category"],
    }),

    //subcategory

    getSubCategory: builder.query({
      query: () => {
        return {
          url: "/subCategory",
          method: "GET",
        };
      },
      providesTags: ["subCategory"],
    }),

    subAddCategory: builder.mutation({
      query: (data) => {
        return {
          url: "/subcategory/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["subCategory"],
    }),


    subCategoryUpdate: builder.mutation({
      query: ({id, data}) => {
        return {
          url: `/subCategory/update/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["subCategory"],
    }),

    deleteSubCategory: builder.mutation({
      query: (id) => {
        return {
          url: `/subCategory/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["subCategory"],
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useUpdateCategoryMutation,
  useCategoryUpMutation,
  useDeleteCategoryMutation,

  useSubAddCategoryMutation,
  useSubCategoryUpdateMutation,
  useDeleteSubCategoryMutation,
  useGetSubCategoryQuery,
} = settingApi;
