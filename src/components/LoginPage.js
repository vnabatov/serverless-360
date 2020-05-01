import React, { useState } from 'react'
import { login } from '../api'
import {
  useHistory,
  useLocation
} from 'react-router-dom'
import styled from 'styled-components'


const FormWrapper = styled.div`  
  width: 300px;          
  height: 200px;          
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -100px;     
  margin-left: -150px;    
`

const HeaderButton = styled.button`
border: none;
font-size: 2rem;
background: white;
outline: none;
display: block;
width:100%;
transition: all .2s;
cursor: pointer;
border: 3px solid cyan;
border-radius: 3px;
&:hover{
  background: cyan
}
`

const HeaderInput = styled.input`
margin-bottom: 1rem;
border: none;
background: white;
font-size: 2rem;
outline: none;
width:100%;
text-align: center;
background: lightcyan
`

export default () => {
  const history = useHistory()
  const location = useLocation()
  const [email, setEmail] = useState('vnabatov@wiley.com')
  const [password, setPassword] = useState('123456')

  const { from } = location.state || { from: { pathname: '/' } }
  const loginHandle = async () => {
    await login(email, password)
    history.replace(from)
  }

  return (
    <FormWrapper>
      <HeaderInput placeholder="email" type="text" onChange={(e)=>setEmail(e.target.value)} />
      <HeaderInput placeholder="password" type="password" onChange={(e)=>setPassword(e.target.value)} />
      <HeaderButton onClick={loginHandle}>Login</HeaderButton>
    </FormWrapper>
  )
}