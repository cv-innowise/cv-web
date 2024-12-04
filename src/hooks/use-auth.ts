import { useMutation, useReactiveVar } from '@apollo/client'
import {
  type AuthInput,
  type ForgotPasswordInput,
  type ResetPasswordInput,
  UserRole
} from 'cv-graphql'

import { LOGIN, SIGNUP, FORGOT_PASSWORD, RESET_PASSWORD } from 'graphql/auth'
import { session$ } from 'graphql/auth/session'
import type { LoginResult, SignupResult } from 'graphql/auth/auth.types'
import { publicClient } from 'graphql/client'

type LoginArgs = { variables: { auth: AuthInput } }

export const login = ({ variables }: LoginArgs) => {
  return publicClient.query<LoginResult>({ query: LOGIN, variables })
}

export const signup = ({ variables }: LoginArgs) => {
  return publicClient.mutate<SignupResult>({ mutation: SIGNUP, variables })
}

export const useAuth = () => {
  const session = useReactiveVar(session$)
  const userId = session ? String(session.sub) : ''
  const isAdmin = session?.role === UserRole.Admin

  return { session, userId, isAdmin }
}

export const useForgotPassword = () => {
  return useMutation<void, { auth: ForgotPasswordInput }>(FORGOT_PASSWORD)
}

type ResetPasswordArgs = {
  variables: { auth: ResetPasswordInput }
}

export const resetPassword = ({ variables }: ResetPasswordArgs, token: string) => {
  return publicClient.mutate<void>({
    mutation: RESET_PASSWORD,
    variables,
    context: {
      headers: {
        authorization: `Bearer ${token}`
      }
    }
  })
}
