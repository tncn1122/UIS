import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Row, List, Modal, Form, Input, Spin } from 'antd'
import CustomCard from 'component/CustomCard'
import { FormattedMessage } from 'react-intl'
import { TEXT_UI_USER_PROFILE } from 'config'
import styles from './style.module.scss'
import UserAvatar from '../UserAvatar'

const ChallengeList = (props) => {
  const { challenges } = props

  return (
    <CustomCard className={styles.card}>
      <Row style={{ justifyContent: 'space-between' }}>
        <span className={styles.title}>
          {TEXT_UI_USER_PROFILE.PARTICIPATED_CONTEST.TITLE}
          &nbsp;&#40;{challenges.length}&#41;
        </span>

        <span className={styles.sum}>
          {TEXT_UI_USER_PROFILE.PARTICIPATED_CONTEST.CONTEST_SUM}
          :&nbsp;{challenges.reduce((a, b) => a + (b.score || 0), 0)}
        </span>
      </Row>
      <List
        style={{ fontSize: 16 }}
        itemLayout="horizontal"
        dataSource={challenges}
        renderItem={(item) => (
          <List.Item key={item.id} style={{ padding: 12 }}>
            <List.Item.Meta
              avatar={<UserAvatar size={50} avatar={item.image} nickname={item.name} />}
              title={
                <a className={styles['contest-name']} href={item.url}>
                  {item.name}
                </a>
              }
              description={item.subtitle}
            />
            <div>
              <div className="mb-0">
                {item.score}/{item.total}
              </div>
              <small>{item.status}</small>
            </div>
          </List.Item>
        )}
      />
    </CustomCard>
  )
}

export default ChallengeList
