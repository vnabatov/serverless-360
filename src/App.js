import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useLocation
} from 'react-router-dom'
import Cookies from 'js-cookie'
import { login } from './api'
import './App.css'

const authState = {
  authorised: true
}

const isAuthorised = () => authState.authorised || !Cookies.get('sessionId') || !Cookies.get('sessionId').length

const Header = () => {
  return isAuthorised()
    ? <button onClick={() => { Cookies.set('sessionId', ''); authState.authorised = false; window.location.reload()}}>Logout</button>
    : ''
}

export default function App () {
  return (
    <Router>
      <Switch>
        <Route path='/login'>
          <Header />
          <LoginPage />
        </Route>
        <PrivateRoute path='/'>
          <Header />
          <FormPage />
        </PrivateRoute>
      </Switch>
    </Router>
  )
}

function PrivateRoute ({ children, ...rest }) {
  const history = useHistory()

  return (
    <Route
      {...rest}
      render={() => {
        if (!isAuthorised()) {
          history.replace('/login')
        }
        return children
      }}
    />
  )
}

function LoginPage () {
  const history = useHistory()
  const location = useLocation()

  const { from } = location.state || { from: { pathname: '/' } }
  const loginHandle = async () => {
    await login('vnabatov@wiley.com', '123456')
    history.replace(from)
  }

  return (
    <div>
      <button onClick={loginHandle}>Log in</button>
    </div>
  )
}

function FormPage () {
  return <h3>FormPage</h3>
}
