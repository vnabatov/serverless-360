import React from 'react'
import SimpleRange from './SimpleRange'
import styled from 'styled-components'

const User = styled.div`
margin: 30px;
h1 {
    transition: all .2s;
    position: sticky;
    top: 0;
    display: block;
    background: white;
    box-shadow: 0 0 10px 10px white;
    z-index: 10;
}
&:hover {
    h1 {
        color: #00c853
    }
}
`

const QuestionsSet = styled.div`
display: grid;
gap: 10px 10px;
grid-template-columns: repeat(3, 1fr);

@media(min-width: 900px) {
    grid-template-columns: repeat(6, 1fr);
}
`

const Question = styled.div`
display: grid;
grid-template-columns: 1fr;
grid-template-rows: 1fr 1fr;
gap: 10px 10px;
`
export default ({ questions, user }) => {
  return (
    <User><h1>{user.Name}</h1>
      <QuestionsSet>
        {questions.length ? questions.map(({ Text, Description }, key) => (
          <Question key={key}>
            <div>{key + 1}.{Text} - {Description}</div>
            <SimpleRange />
          </Question>
        )) : 'loading...'}
      </QuestionsSet>
    </User>
  )
}
