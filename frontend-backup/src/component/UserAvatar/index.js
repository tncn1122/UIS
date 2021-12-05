import React from 'react'
import { Avatar } from 'antd'
import { AVATAR_COLORS } from './constant'

export default function UserAvatar(props) {
  const { avatar, nickname, shape, size, style } = props
  return (
    <Avatar
      {...props}
      src={avatar}
      style={{
        backgroundColor: nickname
          ? `#${AVATAR_COLORS[nickname.toLowerCase().charCodeAt(0)]}`
          : 'inherit',
        verticalAlign: 'middle',
        ...style,
      }}
      gap={2}
      shape={shape || 'circle'}
      size={size || 32}
    >
      <p>{nickname && nickname[0].toUpperCase()}</p>
    </Avatar>
  )
}
