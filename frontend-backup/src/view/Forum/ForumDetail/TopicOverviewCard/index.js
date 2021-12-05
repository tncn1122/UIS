import React from 'react'
import moment from 'moment'
import classnames from 'classnames'
import { Row, Col } from 'antd'
import { TEXT_UI_FORUM } from 'config'
import { Link } from 'react-router-dom'

import { ErrorHandlerUtils, URLUtils } from 'utils'

import styles from './style.module.scss'

export default function TopicOverviewCard({ topic, className }) {
  return (
    <div className={classnames([styles['topic-overview-card'], className])}>
      <Row>
        <Col span={20} className="content">
          <Row className="top">
            <Col>
              <img
                alt="avatar"
                src={
                  topic.user.userProfile
                    ? URLUtils.buildAvatarURL(topic.user.userProfile.avatar)
                    : URLUtils.buildAvatarURL()
                }
              />
            </Col>
            <Col>
              <div className="author">
                {topic.user.userProfile ? topic.user.userProfile.full_name : topic.user.username}
              </div>
              <div className="time">
                {moment(topic.updatedAt ? topic.updatedAt : topic.createdAt).fromNow()}
              </div>
            </Col>
          </Row>
          <Row>
            <div className="title">
              <Link to={`/forums/topics/${topic.id}`} className="link">
                {topic.title}
              </Link>
            </div>
          </Row>
          <Row>
            <div className="des">{topic.summary}</div>
          </Row>
        </Col>
        <Col span={4} className="statistic">
          <div className="top">
            {TEXT_UI_FORUM.VIEWS}: {topic.countViews}
          </div>
          <div className="bottom">
            {TEXT_UI_FORUM.REPLIES}: {topic.countPosts}
          </div>
        </Col>
      </Row>
    </div>
  )
}
