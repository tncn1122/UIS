import React from 'react'
import CustomCard from 'component/CustomCard'
import { TEXT_UI_USER_PROFILE } from 'config'
import { Card, Row, Col } from 'antd'
import { MiscUtils } from 'utils'
import createdIcon from 'asset/img/icon/created.svg'
import commentIcon from 'asset/img/icon/comment.svg'
import likeIcon from 'asset/img/icon/like.svg'
import styles from './style.module.scss'

const UserForum = (props) => {
  const { forumData } = props

  const config = [
    {
      imgSrc: createdIcon,
      label: TEXT_UI_USER_PROFILE.FORUM.CREATED,
      count: forumData.created,
      style: `${styles.overalls} ${styles.edge}`,
    },
    {
      imgSrc: commentIcon,
      label: TEXT_UI_USER_PROFILE.FORUM.COMMENTS,
      count: forumData.comments,
      style: styles.overalls,
    },
    {
      imgSrc: likeIcon,
      label: TEXT_UI_USER_PROFILE.FORUM.LIKES,
      count: forumData.likes,
      style: `${styles.overalls} ${styles.edge}`,
    },
  ]

  const generateContent = (dataConfig) =>
    dataConfig.map((item) => (
      <Col key={MiscUtils.generateId()}>
        <Card className={item.style}>
          <img src={item.imgSrc} alt={item.label} />
          <p className={styles.label}>{item.label}</p>
          <p className={styles.count}>{item.count}</p>
        </Card>
      </Col>
    ))

  return (
    <CustomCard className={styles.card}>
      <Row style={{ justifyContent: 'space-between' }}>
        <span className={styles.title}>{TEXT_UI_USER_PROFILE.FORUM.TITLE}</span>
      </Row>
      <Row className={styles['card-overalls']}>{generateContent(config)}</Row>
    </CustomCard>
  )
}

export default UserForum
