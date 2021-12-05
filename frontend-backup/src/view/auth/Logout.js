import React, { useState, useEffect } from 'react'
import { LoadingIndicator } from 'component'
import { MiscUtils } from 'utils'
import { logout } from 'redux/auth/actions'

export default function Logout() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      MiscUtils.dispatchReduxAction(logout())
    }, 100)
  }, [])

  return <LoadingIndicator isHidden={!isLoading} />
}
