import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Col, Row, List, Table, Form, Input, Spin } from 'antd'
import { FormattedMessage } from 'react-intl'
import CustomCard from 'component/CustomCard'
import { MiscUtils } from 'utils'
import { TEXT_UI_USER_PROFILE, TEXT_UI_PROBLEM } from 'config'
import styles from './style.module.scss'

const UserPractice = (props) => {
  const { assignments, overalls } = props

  const columns = [
    {
      title: TEXT_UI_PROBLEM.PROBLEM_NAME,
      dataIndex: 'name',
      width: '40%',
    },
    {
      title: TEXT_UI_PROBLEM.TYPE.TITLE,
      dataIndex: 'type',
      width: '20%',
    },
    {
      title: TEXT_UI_PROBLEM.DIFFICULTY.TITLE,
      dataIndex: 'level',
      width: '20%',
    },
    {
      title: TEXT_UI_PROBLEM.SCORE,
      dataIndex: 'score',
      width: '20%',
    },
  ]

  const generateContent = (data) => {
    const config = [
      {
        title: TEXT_UI_PROBLEM.DIFFICULTY.EASY,
        number: data.easy || 0,
        style: `${styles.overalls} ${styles.left}`,
        labelStyle: `${styles.label} ${styles.easy}`,
      },
      {
        title: TEXT_UI_PROBLEM.DIFFICULTY.MEDIUM,
        number: data.medium || 0,
        style: `${styles.overalls}`,
        labelStyle: `${styles.label} ${styles.medium}`,
      },
      {
        title: TEXT_UI_PROBLEM.DIFFICULTY.HARD,
        number: data.hard || 0,
        style: `${styles.overalls}`,
        labelStyle: `${styles.label} ${styles.hard}`,
      },
      {
        title: TEXT_UI_PROBLEM.TOTAL_SCORE,
        number: data.total || 0,
        style: `${styles.overalls} ${styles.right}`,
        labelStyle: `${styles.label} ${styles.total}`,
      },
    ]

    return config.map((item) => (
      <Col key={MiscUtils.generateId()} style={{ marginBottom: 0 }}>
        <Card className={item.style}>
          {!(item.title === TEXT_UI_PROBLEM.TOTAL_SCORE) && (
            <div>{TEXT_UI_USER_PROFILE.TRAINING.SOLVED}</div>
          )}
          <h2>{item.number}</h2>
        </Card>

        <Card className={item.labelStyle}>
          <p className={styles['label-text']}>{item.title}</p>
        </Card>
      </Col>
    ))
  }

  return (
    <CustomCard className={styles.card}>
      <Row style={{ justifyContent: 'space-between' }}>
        <span className={styles.title}>{TEXT_UI_USER_PROFILE.TRAINING.TITLE}</span>

        <span className={styles.sum}>
          {TEXT_UI_USER_PROFILE.TRAINING.TRAINING_SUM}
          :&nbsp;{overalls.created}
        </span>
      </Row>
      <Card className={styles['card-overalls']}>
        <Row>{generateContent(overalls)}</Row>
      </Card>
      <Row>
        <Card className={styles['card-overalls']}>
          <h2 style={{ textAlign: 'left', marginLeft: '1rem' }}>
            <FormattedMessage id="profile.resolvedAssignments" />
          </h2>
          <Table
            dataSource={assignments}
            columns={columns}
            scroll={{ y: 300 }}
            pagination={false}
          />
        </Card>
      </Row>
    </CustomCard>
  )
}

export default UserPractice
