import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { ValidationUtils, URLUtils } from 'utils'
import { FE_ROUTE } from 'config'

function PrivateRoute({ currentUser, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !ValidationUtils.empty(currentUser) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: FE_ROUTE.AUTH.LOGIN,
              state: { from: URLUtils.getPathnameInURL() },
            }}
          />
        )
      }
    />
  )
}

const mapStateToProps = ({ authReducer: { currentUser } }) => ({
  currentUser,
})
export default connect(mapStateToProps)(PrivateRoute)
