import { FC } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { useAppState } from '../AppState'
import { Header } from './Header'
import { Home } from '../pages/Home'
import { SignIn } from '../pages/SignIn'
import { Profile } from '../pages/Profile'
import { ActiveSessions } from '../pages/ActiveSessions'

export const Routes: FC = () => {
  const { appState } = useAppState()
  return (
    <BrowserRouter>
      {appState.signedIn && <Header />}
      {!appState.signedIn ? (
        <Switch>
          <Route path="/" component={SignIn} exact />
          <div>Sign In</div>
        </Switch>
      ) : (
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/profile" component={Profile} exact />
          <Route path="/activeSessions" component={ActiveSessions} exact />
        </Switch>
      )}
    </BrowserRouter>
  )
}
