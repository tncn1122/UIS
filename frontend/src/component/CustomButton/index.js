import React, { useState } from 'react'
import { Button } from 'antd'
import styles from './style.module.scss'

const CustomButton = (props) => {
  const { children, onClick, contentList, htmlType, type = 'normal' } = props

  const [currentTab, setcurrentTab] = useState('details')

  const onTabChange = (key) => {
    setcurrentTab(key)
  }

  return (
    <Button htmlType={htmlType} className={styles[`button-${type}`]} onClick={onClick}>
      {children || contentList[currentTab] || 'Empty Content'}
    </Button>
  )
}

export default CustomButton
