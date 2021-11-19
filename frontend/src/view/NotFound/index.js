import React from 'react'
import { Result, Button } from 'antd'
import styles from './style.module.scss'

export default function NotFound() {
  return (
    <div className={styles['not-found']}>
      <Result status="404" title="404" subTitle="Xin lỗi, trang bạn tìm kiếm không tồn tại!" />
    </div>
  )
}
