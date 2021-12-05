import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { LoadingIndicator } from 'component'
import { MiscUtils, URLUtils, ValidationUtils } from 'utils'
import { FE_ROUTE } from 'config'
import { UserService } from 'service'
import { setCurrentUserAction } from 'redux/auth/actions'

function InitialCheck({ currentUser, children }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!ValidationUtils.empty(currentUser))
      // async, we dont care if if failed (un-login) or not because it will be checked in route later
      UserService.sync().then((user) => {
        MiscUtils.dispatchReduxAction(setCurrentUserAction(user))
      })

    const currentPathname = URLUtils.getPathnameInURL()
    setTimeout(() => {
      if (
        !ValidationUtils.empty(currentUser) &&
        (currentPathname.indexOf(FE_ROUTE.AUTH.ROOT) === 0 ||
          currentPathname.indexOf(FE_ROUTE.ACTIVATE.ROOT) === 0)
      )
        URLUtils.moveToURL(FE_ROUTE.DEFAULT_ROUTE)
      else setIsLoading(false)
    }, 100)
  }, [])

  return (
    <>
      {isLoading && <LoadingIndicator isHidden={!isLoading} />}
      {!isLoading && children}
    </>
  )
}

const mapStateToProps = ({ authReducer: { currentUser } }) => ({
  currentUser,
})

export default connect(mapStateToProps)(InitialCheck)
