import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import './App.css'
import LoginPage from './components/LoginPage'
import FormPage from './components/FormPage'
import PrivateRoute from './components/PrivateRoute'
import Header from './components/Header'

export default function App () {
  const [answers, setAnswers] = useState({})
  console.log('answers', answers)
  return (
    <Router>
      <Switch>
        <Route path='/login'>
          <Header />
          <LoginPage />
        </Route>
        <PrivateRoute path='/'>
          <Header />
          <FormPage answers={answers} setAnswers={(...args) => setAnswers(args)} />
        </PrivateRoute>
      </Switch>
    </Router>
  )
}
