import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { STORE_KEYS } from '@State/storeKeys'

import { TMeterReading, TMeterReadingPayload } from '@Types/meterReadings'

export const meterReadingsApi = createApi({
  reducerPath: STORE_KEYS.METER_READINGS_API,
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3004/' }),
  tagTypes: ['MeterReadings'],
  endpoints: (builder) => ({
    getMeterReadings: builder.query<TMeterReading[], string | undefined>({
      query: (id) => ({
        url: `accounts/${id}/meter-readings`,
      }),
      providesTags: ['MeterReadings'],
    }),
    addMeterReading: builder.mutation<
      Omit<TMeterReading, 'id'>,
      TMeterReadingPayload
    >({
      query: (body) => ({
        url: `accounts/${body.accountId}/meter-readings`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['MeterReadings'],
    }),
  }),
})

export const { useGetMeterReadingsQuery, useAddMeterReadingMutation } = meterReadingsApi
