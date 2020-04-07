import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useState, 
  useLocation
} from 'react-router-dom'
import Cookies from 'js-cookie'
import { login } from './api'
import './App.css'

const isAuthorised = () => !Cookies.get('sessionId') || !Cookies.get('sessionId').length

const Header = () => {
  return isAuthorised()
    ? <button onClick={() => { Cookies.set('sessionId', ''); window.location.reload() }}>Logout</button>
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
  const [login, setLogin] = useState()
  const [password, setPassword] = useState()
  
  const history = useHistory()
  const location = useLocation()

  const { from } = location.state || { from: { pathname: '/' } }
  const loginHandle = async () => {
    await login(login, password)
    history.replace(from)
  }

  return (
    <div>
      <input type="text" defaultValue="vnabatov@wiley.com" onChange={e => setLogin(e.target.value)} />
      <input type="password" defaultValue="123456" onChange={e => setPassword(e.target.value)} />
      <button onClick={loginHandle}>Log in</button>
    </div>
  )
}

function FormPage () {
  return <h3>FormPage</h3>
}
