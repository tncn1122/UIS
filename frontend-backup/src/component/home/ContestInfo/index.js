import React from 'react'
import PropTypes from 'prop-types'
import { Card, Typography } from 'antd'
import { ExportOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import styles from './style.module.scss'

const { Text } = Typography

export default function ContestInfo({
  hoverable,
  contest: { name, isActive, scheduleDate, scheduleTime, location, url },
}) {
  const defaultStyle = {}
  const color = isActive ? 'white' : 'black'
  return (
    <Card
      type="primary"
      style={{
        ...defaultStyle,
        backgroundColor: isActive ? '#F15A29' : '#FFF',
      }}
      className={styles.contestInfo}
      hoverable={hoverable}
    >
      <>
        <h3 className="typography-h3 bold" style={{ color }}>
          {name}
        </h3>

        <div>
          <Text style={{ color }}>
            <strong>Thời gian:</strong> {scheduleTime}
          </Text>
        </div>

        <div>
          <Text style={{ color }}>
            <strong>Ngày:</strong> {scheduleDate}
          </Text>
        </div>

        <div style={{ marginBottom: 100 }}>
          <Text style={{ color }}>
            <strong>Địa điểm:</strong> {location}
          </Text>
        </div>

        <div>
          <Link to={url}>
            <Text style={{ color, fontSize: 10 }} italic>
              Xem chi tiết <ExportOutlined />
            </Text>
          </Link>
        </div>
      </>
    </Card>
  )
}
