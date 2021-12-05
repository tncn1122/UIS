import React from 'react'
import classnames from 'classnames'
import CountDown from 'ant-design-pro/lib/CountDown'
import { Row } from 'antd'
import { DateTimeUtils } from 'utils'
import './style.overwrite.scss'

export default function CountDownNumberic({ targetTime, isDisabled }) {
  return (
    <CountDown
      target={DateTimeUtils.toMiliseconds(targetTime)}
      format={(currentTime) => {
        const seconds = Math.floor((currentTime / 1000) % 60)
        const minutes = Math.floor((currentTime / (1000 * 60)) % 60)
        const hours = Math.floor((currentTime / (1000 * 60 * 60)) % 24)
        const days = Math.floor(currentTime / (1000 * 60 * 60 * 24))

        const secondTxt = `0${seconds.toString()}`.slice(-2)
        const minuteTxt = `0${minutes.toString()}`.slice(-2)
        const hourTxt = `0${hours.toString()}`.slice(-2)
        const dayTxt = `0${days.toString()}`.slice(-2)
        return (
          <div className={classnames({ disabled: isDisabled })}>
            <Row style={{ marginBottom: '0px', lineHeight: '20px' }} className="typography-h3 bold">
              <span style={{ marginRight: '12px' }}>{dayTxt}</span>
              <span style={{ marginRight: '12px' }}>:</span>
              <span style={{ marginRight: '12px' }}>{hourTxt}</span>
              <span style={{ marginRight: '12px' }}>:</span>
              <span style={{ marginRight: '12px' }}>{minuteTxt}</span>
              <span style={{ marginRight: '12px' }}>:</span>
              <span>{secondTxt}</span>
            </Row>
            <Row className="typography-menu-subtext">
              <span style={{ marginLeft: '2px', marginRight: '32px' }}>Day</span>
              <span style={{ marginRight: '24px' }}>Hour</span>
              <span style={{ marginRight: '13px' }}>Minute</span>
              <span>Second</span>
            </Row>
          </div>
        )
      }}
    />
  )
}
