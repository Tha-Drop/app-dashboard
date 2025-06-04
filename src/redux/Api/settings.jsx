import { baseApi } from "./baseApi";

const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
     /** Setting API */
     getTermsConditions: builder.query({
        query: () => {
            return {
                url: '/tac/',
                method: 'GET'
            }
        },
        providesTags: ['terms']
    }),
    updateTermsCondition: builder.mutation({
        query: (data) => {
            return {
                url: '/tac/create',
                method: "POST",
                body: data
            }
        }, invalidatesTags: ['terms']
    }),

    getTermsUpdate: builder.mutation({
        query: ({ id, data }) => {
            console.log(id, data)
          return {
            url: `/tac/update/${id}`,
            method: "PUT",
            body: data,
          };
        },
        invalidatesTags: ["terms"], 
      }),


      getprivecyConditions: builder.query({
        query: () => {
            return {
                url: '/privacy/',
                method: 'GET'
            }
        },
        providesTags: ['terms']
    }),
    updateprivecyCondition: builder.mutation({
        query: (data) => {
            return {
                url: '/privacy/create',
                method: "POST",
                body: data
            }
        }, invalidatesTags: ['terms']
    }),

    getprivecyUpdate: builder.mutation({
        query: ({ id, data }) => {
            console.log(id, data)
          return {
            url: `/privacy/update/${id}`,
            method: "PUT",
            body: data,
          };
        },
        invalidatesTags: ["terms"], 
      }),


    

    
      
  }),
});

export const {
 useGetTermsConditionsQuery,
 useUpdateTermsConditionMutation,
 
 useGetTermsUpdateMutation,
 useGetprivecyConditionsQuery,
 useUpdateprivecyConditionMutation,
 useGetprivecyUpdateMutation,

 
} = settingApi;
