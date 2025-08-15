import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = import.meta.env.VITE_API_URL ?? 'http://19429ba06ff2.vps.myjino.ru/api'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // @ts-ignore
      const token = (getState() as any).auth.token as string | null
      if (token) headers.set('Authorization', `Bearer ${token}`)
      return headers
    }
  }),
  tagTypes: ['Profile','Category','Operation'],
  endpoints: () => ({})
})
