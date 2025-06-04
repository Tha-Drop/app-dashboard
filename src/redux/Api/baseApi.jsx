// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseQuery = fetchBaseQuery({
//   baseUrl: "143.110.241.146:8080",
//   prepareHeaders: (headers) => {
//     const token = JSON.parse(localStorage.getItem("accessToken"));
//     const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
//     console.log(token);
//     if (token) {
//       headers.set("Authorization", `Bearer ${token}`);
//     }

//     return headers;
//   },
// });

// export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery: baseQuery,
//   tagTypes: ["overview", "host"],
//   endpoints: () => ({}),
// });

// export const imageUrl = "143.110.241.146:8080";


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://143.110.241.146:8080",
  // https://backend.volunhelp.com/api/v1
  // 10.0.60.118:7000
  
  prepareHeaders: (headers, { getState }) => {
    const token = getState().logInUser.token;
  
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: ["overview", "host"],
  endpoints: () => ({}),
});

export const imageUrl = "143.110.241.146:8080";

