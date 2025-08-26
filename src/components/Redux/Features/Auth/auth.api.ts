import { baseApi } from "../../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/user/login",
        method: "POST",
        data: userInfo,
      }),
      invalidatesTags:["USER"]
    }),
  
    logout: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER"],  
    }),
    blockUser: builder.mutation({
      query: (userId) => ({
        url: `/user/block/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],  
    }),

    unBlockUser: builder.mutation({
      query: (userId) => ({
        url: `/user/unblock/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],  
    }),





      userInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],  
    }),
      getAlluser: builder.query({
      query: (params) => ({
        url: "/user/getalluser",
        method: "GET",
        params
      }),
      providesTags: ["USER"],  
    }),



  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useUserInfoQuery,
  useGetAlluserQuery,
  useBlockUserMutation,
  useUnBlockUserMutation
} = authApi;
