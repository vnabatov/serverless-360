import React from 'react'
import isAuthorised from './isAuthorised'
import Cookies from 'js-cookie'
import Button from './Button'

export default () => {
  return <>
  360 review App / 
  {
    isAuthorised()
    ? <Button onClick={() => { Cookies.set('sessionId', ''); window.location.reload() }}>Logout</Button>
    : ''
  }
  </>
}
