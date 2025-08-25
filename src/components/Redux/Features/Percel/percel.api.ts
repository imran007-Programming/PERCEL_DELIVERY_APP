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
          params, // The params will be passed here
        };
      },
      providesTags: ["PERCEL"],
      transformResponse: (arg) => arg.data,
    }),
    cancelPercelStatusBySender: builder.mutation({
      query: ({ percelId, percelStatus }) => ({
        url: `/percel/${percelId}`,
        method: "PATCH",
        data: percelStatus,
      }),
      invalidatesTags: ["PERCEL"],
    }),
  }),
});

export const {
  useCreatePercelMutation,
  useGetPercelBySenderQuery,
  useCancelPercelStatusBySenderMutation,
} = percelApi;
