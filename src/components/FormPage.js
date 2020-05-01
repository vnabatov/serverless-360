import React, { useState, useEffect } from 'react'
import Questions from './Questions'
import { getUsers, getQuestions } from '../api'

export default () => {
  const [users, setUsers] = useState([])
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    const getData = async () => {
      setUsers(await getUsers())
      setQuestions(await getQuestions())
    }
    getData()
  }, [setUsers,setQuestions]);

  return <div>
    {users.length ? users.map(user => 
      <Questions questions={questions} user={user} />
    ) : 'loading users...'}
  </div>
}