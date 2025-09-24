import type {
  CreatePlaylistArgs,
  PlaylistData,
  PlaylistsResponse
} from '@/features/playlists/api/playlistsApi.types.ts'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const playlistsApi = createApi({
  reducerPath: 'playlistsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: "https://musicfun.it-incubator.app/api/1.0/",
    headers: {
      'API-KEY': "ef7f4357-4b35-41fb-be46-31efc3bd36c5",
    },
    prepareHeaders: (headers,api) => {
      
      headers.set('Authorization', `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`)
      return headers
    },
  }),
  endpoints: (build) => ({
    fetchPlaylists: build.query<PlaylistsResponse, void>({
      query: () => 'playlists',
    }),
    createPlaylist: build.mutation<{data:PlaylistData}, CreatePlaylistArgs>({
      query: body => ({
        method: 'post',
        url: 'playlists',
        body,
      }),
    }),
  }),
})

export const { useFetchPlaylistsQuery,useCreatePlaylistMutation } = playlistsApi
