import React from 'react'
import { Button } from 'antd'
import styles from './style.module.scss'

export default function IconButton(props) {
  const { type, icon, text, shape, colorType } = props
  return (
    <Button
      type={type || 'text'}
      icon={icon}
      shape={shape}
      className={`${styles[colorType || 'default']}`}
      {...props}
    >
      {text}
    </Button>
  )
}
