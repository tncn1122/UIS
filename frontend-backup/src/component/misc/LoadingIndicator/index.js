import React from 'react'
import { Spin } from 'antd'
import styles from './style.module.scss'

export default function LoadingIndicator({ children, isHidden = true, isFull = true }) {
  return (
    <Spin
      size="large"
      // tip="Loading..."
      spinning={!isHidden}
      className={{
        [styles.full]: isFull,
        [styles.hidden]: isHidden,
      }}
    >
      {children}
    </Spin>
  )
}
