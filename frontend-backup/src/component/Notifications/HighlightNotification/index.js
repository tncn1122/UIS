import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import closeIcon from 'asset/img/icon/close.svg'
import styles from './style.module.scss'
import './style.overwrite.scss'

export default function HighlightNotification({ news, action, onClose, style }) {
  return (
    <Row className={[styles['highlight-notification']].join(' ')} style={style}>
      <Col flex="auto" className={styles['news-container']}>
        <Row justify="space-around" style={{ width: '100%' }}>
          <Col className={styles.news}>{news}</Col>
          <Col>{action}</Col>
        </Row>
      </Col>

      <Col flex="40px" className={styles.close} onClick={onClose}>
        <img src={closeIcon} style={{ width: '36px' }} alt="Close" />
      </Col>
    </Row>
  )
}

HighlightNotification.defaultProps = {
  action: <></>,
  onClose: () => {},
  style: {},
}

HighlightNotification.propTypes = {
  news: PropTypes.string.isRequired,
  action: PropTypes.element,
  onClose: PropTypes.func,
  style: PropTypes.object,
}
