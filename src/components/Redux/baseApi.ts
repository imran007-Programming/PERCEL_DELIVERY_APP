import { createApi } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from './AxiosBaseQuery'

export const baseApi=createApi({
   reducerPath:"baseApi",
   baseQuery:axiosBaseQuery(),
   tagTypes: ['User',"TOUR"],
   endpoints:()=>({})
})