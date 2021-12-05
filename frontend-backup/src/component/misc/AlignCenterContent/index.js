import React from 'react'
import { Card } from 'antd'
import styles from './style.module.scss'

export default function AlignCenterContent({ children }) {
  return (
    <div className={styles.centerAlignContent}>
      <Card className={styles.content}>{children}</Card>
    </div>
  )
}
