import { baseApi } from "../../baseApi";

export const percelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPercel: builder.mutation({
      query: (percelInfo) => ({
        url: "/percel/create",
        method: "POST",
        data: percelInfo,
      }),
    }),
    getPercelBySender: builder.query({
      query: ({ senderId, params }) => {
        return {
          url: `/percel/getpercelInfo/${senderId}`,
          method: "GET",
          params,
        };
      },
      providesTags: ["PERCEL"],
      transformResponse: (arg) => arg.data,
    }),
    getPercelByReceiver: builder.query({
      query: ({ receiverId, params }) => {
        return {
          url: `/percel/getpercelinfo-receiver/${receiverId}`,
          method: "GET",
          params,
        };
      },
      providesTags: ["PERCEL"],
      transformResponse: (arg) => arg.data,
    }),
    getPercelByAdmin: builder.query({
      query: (params) => {
        return {
          url: `/percel/getallpercel`,
          method: "GET",
          params,
        };
      },
      providesTags: ["PERCEL"],
      transformResponse: (arg) => arg.data,
    }),

    updatePercelStatusByAdmin: builder.mutation({
      query: ({percelId,statusData}) => ({
        url: `/percel/${percelId}`,
        method: "PATCH",
        data: statusData,
      }),
      invalidatesTags: ["PERCEL"],
    }),
    
    cancelPercelStatusBySender: builder.mutation({
      query: ({ percelId, percelStatus }) => ({
        url: `/percel/${percelId}`,
        method: "PATCH",
        data: percelStatus,
      }),
      invalidatesTags: ["PERCEL"],
    }),
    percelConfirmationByReceiver: builder.mutation({
      query: (percelId) => ({
        url: `/percel/confirmation/${percelId}`,
        method: "PATCH",
     
      }),
      invalidatesTags: ["PERCEL"],
    }),
  }),
});

export const {
  useCreatePercelMutation,
  useGetPercelBySenderQuery,
  useUpdatePercelStatusByAdminMutation,
  useCancelPercelStatusBySenderMutation,
  useGetPercelByReceiverQuery,
  usePercelConfirmationByReceiverMutation,
  useGetPercelByAdminQuery
} = percelApi;
