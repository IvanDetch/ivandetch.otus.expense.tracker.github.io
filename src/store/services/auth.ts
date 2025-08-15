import { api } from './api'

type SigninBody = { email: string; password: string }
type SignupBody = { email: string; password: string; name: string }
type SigninResult = { token: string }
type SignupResult = { token: string }
export type Profile = { id: string; name: string; email: string; signUpDate: string; commandId: string }

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    signin: build.mutation<SigninResult, SigninBody>({
      query: (body) => ({ url: '/signin', method: 'POST', body })
    }),
    signup: build.mutation<SignupResult, SignupBody>({
      query: (body) => ({ url: '/signup', method: 'POST', body })
    }),
    profile: build.query<Profile, void>({
      query: () => ({ url: '/profile', method: 'GET' }),
      providesTags: ['Profile']
    }),
    updateProfile: build.mutation<Profile, { name: string }>({
      query: (body) => ({ url: '/profile', method: 'PATCH', body }),
      invalidatesTags: ['Profile']
    }),
    changePassword: build.mutation<{ success: boolean }, { password: string; newPassword: string }>({
      query: (body) => ({ url: '/profile/change-password', method: 'POST', body })
    })
  })
})

export const { useSigninMutation, useSignupMutation, useProfileQuery, useUpdateProfileMutation, useChangePasswordMutation } = authApi
