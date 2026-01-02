import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { toast } from 'react-toastify'
import { isErrorWithMessage } from '@/common/utils'
import { isErrorWithError } from '@/common/utils/isErrorWithError.ts'
import { isErrorWithProperty } from '@/common/utils/isErrorWithProperty.ts'

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
      switch (result.error.status) {
        case 'TIMEOUT_ERROR':
          toast(result.error.error)
          break

        case 404:
          if (isErrorWithProperty(result.error.data, 'error')) {
            toast(result.error.data.error, { type: 'error', theme: 'colored' })
          } else {
            toast(JSON.stringify(result.error.data), { type: 'error', theme: 'colored' })
          }
          break


        /*      toast((result.error.data as {error : string}).error, {type: 'error', theme: 'colored'})
              break*/

        case 429:
          if (isErrorWithProperty(result.error.data, 'message')) {
            toast(result.error.data.message, { type: 'error', theme: 'colored' })
          } else {
            toast(JSON.stringify(result.error.data), { type: 'error', theme: 'colored' })
          }
          break

        default:
          toast('Some error occurred', { type: 'error', theme: 'colored' })
      }
    }
    return result
  },
  endpoints: () => ({}),
})

/*if(isErrorWithError(result.error.data))
{
  toast((result.error.data as {error : string}).error, {type: 'error', theme: 'colored'})

} else {}*/

