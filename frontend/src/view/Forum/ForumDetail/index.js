import React, { useEffect, useState } from 'react'

import ForumService from 'service/ForumService'
import { PAGINATION_OPTIONS } from 'config'

import { Input, Pagination, Button, Row, Col } from 'antd'
import { Link, useParams } from 'react-router-dom'
import iconSearch from 'asset/img/icon/search.svg'
import iconNext from 'asset/img/icon/arrow-next.svg'
import iconPrevious from 'asset/img/icon/arrow-previous.svg'
import TopicOverviewComponent from './TopicOverviewCard'

import styles from './style.module.scss'

const itemRender = (current, type, originalElement) => {
  if (type === 'prev') {
    return <img alt="previous" src={iconPrevious} />
  }
  if (type === 'next') {
    return <img alt="next" src={iconNext} />
  }
  return originalElement
}

const TableTitle = () => (
  <Row className="table-header">
    <Col span={20} className="title">
      Titles
    </Col>
    <Col span={4} className="statistic">
      Statistics
    </Col>
  </Row>
)

export default function Forum() {
  const [topics, setTopics] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [forumName, setForumName] = useState('')

  const { forumId } = useParams()

  useEffect(() => {
    const fetchData = () => {
      const search = {
        page,
        pageSize: PAGINATION_OPTIONS.FORUM_TOPIC.pageSize,
      }
      ForumService.getTopicsByForum(search, forumId).then((resp) => {
        setTopics(resp.results)
        setTotal(resp.total)
      })
    }
    fetchData()
  }, [page])

  useEffect(() => {
    const fetchData = () => {
      ForumService.getForumDetails(forumId).then((resp) => {
        setForumName(resp.name)
      })
    }
    fetchData()
  }, [])

  return (
    <div className={styles.forum}>
      <div className="header">
        <h3>{forumName}</h3>
        <Row>
          <Col className="search-bar">
            <Input
              suffix={<img alt="search-icon" src={iconSearch} />}
              placeholder="Tìm tên các chủ đề..."
            />
          </Col>
          <Col className="btn-add-topic">
            <Button type="primary">
              <Link className="link" to={`/forums/${forumId}/new-topic`}>
                TẠO CHỦ ĐỀ
              </Link>
            </Button>
          </Col>
        </Row>
      </div>
      <div className="topics">
        {topics && topics.length > 0
          ? topics.map((topic) => (
              <TopicOverviewComponent className="forum__topic" topic={topic} key={topic.id} />
            ))
          : 'No topic in this forum'}
      </div>
      <div className="pagination">
        <Pagination
          total={total}
          simple
          current={page}
          pageSize={PAGINATION_OPTIONS.FORUM_TOPIC.pageSize}
          onChange={(destinationPage) => {
            setPage(destinationPage)
          }}
          itemRender={itemRender}
        />
      </div>
    </div>
  )
}
