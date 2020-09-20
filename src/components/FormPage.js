import React, { useState, useEffect } from 'react'
import Questions from './Questions'
import { getUsers, getQuestions } from '../api'

export default ({ answers, setAnswers }) => {
  const [users, setUsers] = useState([])
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    const getData = async () => {
      setUsers(await getUsers())
      setQuestions(await getQuestions())
    }
    getData()
  }, [setUsers, setQuestions])

  const addAnswer = (userId, questionId, value) => {
    if(!answers[userId]) {
      answers[userId] = {}
    }
    answers[userId][questionId] = value
    setAnswers(answers)
  }

  return <>
      {users.length ? users.map(user =>
        <Questions key={user.Id} addAnswer={addAnswer} questions={questions} user={user} />
      ) : 'loading users...'}
 </>
} 
