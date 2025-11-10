import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Playlist'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://musicfun.it-incubator.app/api/1.0/',
    headers: {
      'API-KEY': 'ef7f4357-4b35-41fb-be46-31efc3bd36c5',
    },
    prepareHeaders: (headers, api) => {
      headers.set('Authorization', `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`)
      return headers
    },
  }),
  keepUnusedDataFor: 60,
    endpoints: () => ({}),
})