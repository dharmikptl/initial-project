import { FC, FormEvent, useState } from 'react'
import GoogleLogin from 'react-google-login'
import {
  useGoogleSignInMutation,
  useSignInMutation
} from '../generated/graphql'
import { useAppState } from '../AppState'

export const SignIn: FC = () => {
  const { setAppState, setAccessToken, setAccessTokenExpiry } = useAppState()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signIn] = useSignInMutation({
    fetchPolicy: 'no-cache'
  })
  const [googleSignIn] = useGoogleSignInMutation({
    fetchPolicy: 'no-cache'
  })
  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await signIn({
      variables: {
        email,
        password
      }
    })
    setPassword('')
    if (response.data && response.data.signIn) {
      const {
        userId,
        role,
        email,
        firstName,
        lastName,
        profileImage,
        accessToken,
        expiresAt
      } = response.data.signIn
      setEmail('')
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
  }
  const handleGoogleResponse = async (res: any) => {
    const idToken = res.tokenId
    if (!idToken) return console.log('Google sign in failed')
    const response = await googleSignIn({
      variables: {
        idToken
      }
    })
    setPassword('')
    if (response.data && response.data.googleSignIn) {
      const {
        userId,
        role,
        email,
        firstName,
        lastName,
        profileImage,
        accessToken,
        expiresAt
      } = response.data.googleSignIn
      setEmail('')
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
  }
  return (
    <form onSubmit={handleSignIn}>
      <div>
        <input
          type="email"
          value={email}
          placeholder="Email Address"
          onChange={e => setEmail(e.currentTarget.value)}
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={e => setPassword(e.currentTarget.value)}
        />
      </div>
      <div>
        <button type="submit">Sign In</button>
      </div>
      <div>
        <GoogleLogin
          clientId={`${process.env.REACT_APP_GOOGLE_OAUTH2_CLIENT_ID}`}
          onSuccess={handleGoogleResponse}
          onFailure={handleGoogleResponse}
          cookiePolicy={'single_host_origin'}
          render={renderProps => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <span>Sign In with Google</span>
            </button>
          )}
        ></GoogleLogin>
      </div>
    </form>
  )
}
