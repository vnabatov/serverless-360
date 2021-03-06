import React from 'react'
import { useHistory, Route } from 'react-router-dom'

import isAuthorised from './isAuthorised'

export default ({ children, ...rest }) => {
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
