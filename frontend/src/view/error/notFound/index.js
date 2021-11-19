import React from 'react'
import { Link } from 'react-router-dom'
import { TEXT_UI_ERROR_PAGE, FE_ROUTE } from 'config'
import { Typography } from 'antd'
import { AlignCenterContent } from 'component'
import styles from '../style.module.scss'

const { Text, Title } = Typography

export default function NotFound() {
  return (
    <AlignCenterContent>
      <div className={styles['error-404-view']}>
        <Title level={2}>{TEXT_UI_ERROR_PAGE.NOT_FOUND.TITLE}</Title>
        <Text>
          <Link to={FE_ROUTE.DEFAULT_ROUTE} className="btn">
            &larr; {TEXT_UI_ERROR_PAGE.GO_BACK}
          </Link>
        </Text>
      </div>
    </AlignCenterContent>
  )
}
