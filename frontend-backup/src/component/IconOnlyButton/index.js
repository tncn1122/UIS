import React from 'react'
import { Button } from 'antd'
import './style.overwrite.scss'

export default function IconOnlyButton(props) {
  const { icon, shape } = props
  return <Button id="iconOnlyButton" icon={icon} shape={shape} {...props} />
}
