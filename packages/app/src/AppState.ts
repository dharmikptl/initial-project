import { createContext, useContext } from 'react'

export interface IDefaultAppState {
  signedIn: boolean
  userId: string
  role: string
  email: string
  firstName: string
  lastName: string
  profileImage: string
}

export const defaultAppState: IDefaultAppState = {
  signedIn: false,
  userId: '',
  role: '',
  email: '',
  firstName: '',
  lastName: '',
  profileImage: ''
}

export const AppStateContext = createContext({
  appState: { ...defaultAppState },
  setAppState: (obj: IDefaultAppState) => console.log(obj),
  setAccessToken: (token: string) => console.log(token),
  setAccessTokenExpiry: (expiresAt: number) => console.log(expiresAt)
})

export const useAppState = () => {
  const { appState, setAppState, setAccessToken, setAccessTokenExpiry } =
    useContext(AppStateContext)
  return { appState, setAppState, setAccessToken, setAccessTokenExpiry }
}
