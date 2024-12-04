import { makeVar } from '@apollo/client'
import type { UpdateTokenResult } from 'cv-graphql'
import { StorageKeys } from 'constants/storage.constants'
import { type JwtPayload, parseJwt } from 'helpers/parse_jwt'
import { client } from 'graphql/client'

export const accessToken$ = makeVar<string>(localStorage.getItem(StorageKeys.AccessToken) || '')
export const refreshToken$ = makeVar<string>(localStorage.getItem(StorageKeys.RefreshToken) || '')
export const session$ = makeVar<JwtPayload | null>(parseJwt(accessToken$()))

const setToken = ({ access_token, refresh_token }: UpdateTokenResult) => {
  accessToken$(access_token)
  refreshToken$(refresh_token)
  localStorage.setItem(StorageKeys.AccessToken, access_token)
  localStorage.setItem(StorageKeys.RefreshToken, refresh_token)
}

export const setSession = ({ access_token, refresh_token }: UpdateTokenResult) => {
  setToken({ access_token, refresh_token })
  session$(parseJwt(access_token))
}

export const logout = () => {
  setToken({ access_token: '', refresh_token: '' })
  session$(null)
  client.clearStore()
}
