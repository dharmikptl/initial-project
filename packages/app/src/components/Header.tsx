import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useMeQuery, useSignOutMutation } from '../generated/graphql'
import { defaultAppState, useAppState } from '../AppState'

export const Header: FC = () => {
  const { setAppState } = useAppState()
  const { data } = useMeQuery()
  const [signOut] = useSignOutMutation()
  return (
    <div>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/signIn">Sign In</Link>
      </div>
      <div>
        <Link to="/profile">Profile</Link>
      </div>
      <div>
        <Link to="/activeSessions">Active Sessions</Link>
      </div>
      Status: {data && data.me ? data.me.id : 'Not logged in'}
      <div>
        <button
          onClick={async () => {
            await signOut()
            setAppState({ ...defaultAppState })
            window.location.href = '/'
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}
