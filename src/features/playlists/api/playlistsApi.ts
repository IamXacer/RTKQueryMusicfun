import type { PlaylistsResponse } from '@/features/playlists/api/playlistsApi.types.ts'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const playlistsApi = createApi({
  reducerPath: 'playlistsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: "https://musicfun.it-incubator.app/api/1.0/",
    headers: {
      'API-KEY': "ef7f4357-4b35-41fb-be46-31efc3bd36c5",
    },
  }),
  endpoints: (build) => ({
    fetchPlaylists: build.query<PlaylistsResponse, void>({
      query: () => 'playlists',
    }),
  }),
})

export const { useFetchPlaylistsQuery } = playlistsApi
