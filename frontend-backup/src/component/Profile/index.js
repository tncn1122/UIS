import React from 'react'
import { Button, Col, Divider } from 'antd'
import { TEXT_UI_USER_PROFILE } from 'config'
import mailIcon from 'asset/img/icon/email.svg'
import phoneIcon from 'asset/img/icon/phone.svg'
import addressIcon from 'asset/img/icon/address.svg'
import UserAvatar from '../UserAvatar'
import styles from './style.module.scss'

export default function DetailProfile(props) {
  const { avatar, size, username, title, intro } = props

  return (
    <div>
      <div className={styles.top}>
        <UserAvatar avatar={avatar} nickname={username} size={size || 150} />
        <p className={styles['user-name']}>{username}</p>
        <p>{title}</p>
        <Divider style={{ backgroundColor: 'gray', marginBottom: 0 }} />
      </div>
      {intro && (
        <div id="info">
          <h3>{TEXT_UI_USER_PROFILE.INFORMATION}</h3>
          <div className={styles.intro}>
            <img src={mailIcon} alt="Mail" className={styles.icon} />
            {intro.email}
          </div>
          <div className={styles.intro}>
            <img src={phoneIcon} alt="Phone" className={styles.icon} />
            {intro.phone}
          </div>
          <div className={styles.intro}>
            <img src={addressIcon} alt="Address" className={styles.icon} />
            {intro.location}
          </div>
          <div className={styles.intro} style={{ paddingLeft: '25px' }}>
            {intro.date}
          </div>
        </div>
      )}
    </div>
  )
}
