import React, { useState, useEffect } from 'react'
import Questions from './Questions'
import { getUsers, getQuestions } from '../api'
import Context360 from './Context360'

export default () => {
  const [users, setUsers] = useState([])
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    const getData = async () => {
      setUsers(await getUsers())
      setQuestions(await getQuestions())
    }
    getData()
  }, [setUsers, setQuestions])

  return <>
      <Context360.Consumer>
        {value => {
          console.log(value)
          return '123'+value
        }}
      </Context360.Consumer>

      {users.length ? users.map(user =>
        <Questions key={user.id} questions={questions} user={user} />
      ) : 'loading users...'}
 </>
} 
