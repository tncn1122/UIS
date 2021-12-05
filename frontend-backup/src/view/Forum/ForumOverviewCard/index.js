import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { Row, Col } from 'antd'
import iconTopic from 'asset/img/icon/topic.svg'
import { PAGINATION_OPTIONS, FE_ROUTE, TEXT_UI_FORUM } from 'config'

import styles from './style.module.scss'

export default function TopicOverviewCard({ forum, className }) {
  const { id, name } = forum

  return (
    <div className={classnames([styles['topic-overview-card'], className])}>
      <Row>
        <Col span={15} className="content">
          <Row>
            <Col>
              <img alt="topic-icon" src={iconTopic} />
            </Col>
            <Col>
              <Link to={`/forums/${id}`} className="topic-title">
                {name}
              </Link>
            </Col>
          </Row>
        </Col>
        <Col span={4} className="statistic">
          <div className="top">
            {TEXT_UI_FORUM.THREADS}: {forum.countTopics}
          </div>
          <div className="bottom">
            {TEXT_UI_FORUM.MESSAGES}: {forum.countPosts}
          </div>
        </Col>
        <Col span={5} className="last-post">
          {forum.forumTopics && forum.forumTopics.length > 0 ? (
            <div>
              <div className="top">
                <Link className="link" to={`/forums/${id}`}>
                  {`${forum.forumTopics[0].title.replace(/^(.{30}[^\s]*).*/, '$1')}...`}
                </Link>
              </div>
              <div className="bottom">{forum.forumTopics[0].updatedAt}</div>
            </div>
          ) : (
            'Chưa có bài đăng'
          )}
        </Col>
      </Row>
    </div>
  )
}
