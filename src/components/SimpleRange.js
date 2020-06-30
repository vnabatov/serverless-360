import React from 'react'
import { Range } from 'react-range'
import styled from 'styled-components'

const value2smile = (value) => ['?', ':\'(', ':(', ':|', ':)', ':D'][value]
const value2color = (value) => ['gray', '#d81b60', 'orange', '#ffeb3b', 'lightgreen', '#00c853'][value]

const Thumb = styled.div`
height: 30px;
width: 30px;
outline: none;
text-align: center;
line-height: 28px;
border-radius: 30px;
box-shadow: 0 0 0 cyan;

transition: box-shadow .2s;
&:hover {
  box-shadow: 0 0 10px cyan;
}
`

class SimpleRange extends React.Component {
  constructor () {
    super()
    this.state = { values: [0] }
  }

  render () {
    return (
      <Range
        step={1}
        min={0}
        max={5}
        values={this.state.values}
        onChange={values => this.setState({ values })}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '3px',
              width: '50%',
              marginLeft: 15,
              backgroundColor: '#ccc'
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <Thumb
            {...props}
            style={{
              ...props.style,
              backgroundColor: value2color(this.state.values[0])
            }}
          >
            {value2smile(this.state.values[0])}
          </Thumb>
        )}
      />
    )
  }
}

export default SimpleRange
