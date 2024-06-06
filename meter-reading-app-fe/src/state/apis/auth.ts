import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { STORE_KEYS } from '@State/storeKeys'

import { TLogInUserPayload, TUser } from '@Types/user'

import { meterReadingsApi } from './meterReadings'

export const authApi = createApi({
  reducerPath: STORE_KEYS.AUTH_API,
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3004/' }),
  endpoints: (builder) => ({
    login: builder.mutation<TUser | null, TLogInUserPayload>({
      query: ({ username, password }) => ({
        url: 'login',
        method: 'POST',
        body: {
          username,
          password,
        },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled
        dispatch(meterReadingsApi.util.invalidateTags(['MeterReadings']))
      },
    }),
  }),
})

export const { useLoginMutation } = authApi
