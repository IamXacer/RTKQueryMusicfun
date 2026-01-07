import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { handleErrors } from '@/common/utils/handleErrors.ts'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Playlist'],
  baseQuery: async (args, api, extraOptions) => {
    await new Promise(resolve => setTimeout(resolve, 2000)) // delay

    const result = await fetchBaseQuery({
      baseUrl: 'https://musicfun.it-incubator.app/api/1.0/',
      headers: {
        'API-KEY': 'ef7f4357-4b35-41fb-be46-31efc3bd36c5',
      },
      prepareHeaders: headers => {
        headers.set('Authorization', `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`)
        return headers
      },
    })(args, api, extraOptions)

    if (result.error) {
      debugger
      handleErrors(result.error)
    }
    return result
  },
  endpoints: () => ({}),
})

/*if(isErrorWithError(result.error.data))
{
  toast((result.error.data as {error : string}).error, {type: 'error', theme: 'colored'})

} else {}*/

