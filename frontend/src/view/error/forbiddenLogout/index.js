import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Typography } from 'antd'
import { TEXT_UI_ERROR_PAGE, FE_ROUTE } from 'config'
import { MiscUtils } from 'utils'
import { logout } from 'redux/auth/actions'
import { AlignCenterContent } from 'component'
import styles from '../style.module.scss'

const { Text, Title } = Typography

export default function ForbiddenLogout() {
  useEffect(() => {
    setTimeout(() => MiscUtils.dispatchReduxAction(logout()), 3000)
  }, [])

  return (
    <AlignCenterContent>
      <div className={styles['error-view']}>
        <Title level={2}>{TEXT_UI_ERROR_PAGE.FORBIDDEN.TITLE}</Title>
        <Text>
          <Link to={FE_ROUTE.DEFAULT_ROUTE} className="btn">
            &larr; {TEXT_UI_ERROR_PAGE.GO_BACK}
          </Link>
        </Text>
      </div>
    </AlignCenterContent>
  )
}
