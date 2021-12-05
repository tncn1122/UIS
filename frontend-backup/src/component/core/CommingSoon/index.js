import React from 'react'
import { Popover } from 'antd'
import styles from './style.module.scss'

export default function CommingSoon({ children }) {
  return (
    <Popover content="Comming soon" trigger="click" className={styles['comming-soon']}>
      {children}
    </Popover>
  )
}
