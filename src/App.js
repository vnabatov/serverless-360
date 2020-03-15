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

const Header = () => {
  return Cookies.get('sessionId')
    ? <button onClick={() => { Cookies.set('sessionId', ''); window.location.reload() }}>Logout</button>
    : ''
}
export default function AuthExample () {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/login'>
          <LoginPage />
        </Route>
        <PrivateRoute path='/'>
          <FormPage />
        </PrivateRoute>
      </Switch>
    </Router>
  )
}

function PrivateRoute ({ children, ...rest }) {
  console.log(Cookies.get('sessionId'))
  return (
    <Route
      {...rest}
      render={() => {
        if (!Cookies.get('sessionId') || !Cookies.get('sessionId').length) {
          window.location.href = '/login'
        }
        return children
      }}
    />
  )
}

function FormPage () {
  return <h3>FormPage</h3>
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
