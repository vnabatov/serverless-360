import React from 'react'
import isAuthorised from './isAuthorised'
import Cookies from 'js-cookie'
import styled from 'styled-components'

const HeaderButton = styled.button`
border: none;
background: white;
outline: none;
transition: all .2s;
&:hover{
  background: cyan;
  font-size: 2rem;
}
`

export default () => {
  return isAuthorised()
    ? <HeaderButton onClick={() => { Cookies.set('sessionId', ''); window.location.reload() }}>Logout</HeaderButton>
    : ''
}