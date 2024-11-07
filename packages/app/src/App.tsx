import { FC, useEffect, useMemo, useState } from 'react'
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { IDefaultAppState, defaultAppState, AppStateContext } from './AppState'
import { fetchRefreshToken } from './fetchRefreshToken'
import { Routes } from './components/Routes'

let accessTokenExpiry: number = 0
const setAccessTokenExpiry = (expiresAt: number) => {
  accessTokenExpiry = expiresAt
}

export const App: FC = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [appState, setAppState] = useState<IDefaultAppState>({
    ...defaultAppState
  })
  const [accessToken, setAccessToken] = useState('')
  useEffect(() => {
    console.log('Effect called')
    fetchRefreshToken()
      .then(res => res.json())
      .then(json => {
        if (
          json &&
          json.data &&
          json.data.refreshToken &&
          json.data.refreshToken.accessToken
        ) {
          const {
            userId,
            role,
            email,
            firstName,
            lastName,
            profileImage,
            accessToken,
            expiresAt
          } = json.data.refreshToken
          setAppState({
            signedIn: true,
            userId,
            role,
            email,
            firstName,
            lastName,
            profileImage: profileImage || ''
          })
          setAccessToken(accessToken)
          setAccessTokenExpiry(expiresAt * 1000)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to refresh token', err)
        setLoading(false)
        setError(true)
      })
  }, [])
  const apolloClient = useMemo(() => {
    console.log('Memo called')
    const authLink = setContext((_, { headers }) => ({
      headers: {
        ...headers,
        authorization: accessToken
      }
    }))

    const httpLink = createHttpLink({
      uri: process.env.REACT_APP_API_URL + '/graphql',
      credentials: 'include',
      fetch: (uri, options: any) => {
        if (
          options &&
          options.headers &&
          options.headers.authorization &&
          accessTokenExpiry < Date.now()
        ) {
          return fetchRefreshToken()
            .then(res => res.json())
            .then(json => {
              if (
                json &&
                json.data &&
                json.data.refreshToken &&
                json.data.refreshToken.accessToken
              ) {
                const {
                  userId,
                  role,
                  email,
                  firstName,
                  lastName,
                  profileImage,
                  accessToken,
                  expiresAt
                } = json.data.refreshToken
                setAppState({
                  signedIn: true,
                  userId,
                  role,
                  email,
                  firstName,
                  lastName,
                  profileImage: profileImage || ''
                })
                options.headers.authorization = accessToken
                setAccessToken(accessToken)
                setAccessTokenExpiry(expiresAt * 1000)
              }
              return fetch(uri, options)
            })
            .catch(err => {
              console.error('Failed to refresh token', err)
              return fetch(uri, options)
            })
        } else return fetch(uri, options)
      }
    })

    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache()
    })
    return client
  }, [accessToken])
  if (loading) return <div>Loading...</div>
  if (error) return <div>Oops, unable to access servers</div>
  return (
    <ApolloProvider client={apolloClient}>
      <AppStateContext.Provider
        value={{ appState, setAppState, setAccessToken, setAccessTokenExpiry }}
      >
        <Routes />
      </AppStateContext.Provider>
    </ApolloProvider>
  )
}
