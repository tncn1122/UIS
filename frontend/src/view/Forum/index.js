import React, { useEffect, useState } from 'react'
import { Input, Pagination, Row, Col } from 'antd'

import ForumService from 'service/ForumService'
import { PAGINATION_OPTIONS, FE_ROUTE, TEXT_UI_FORUM } from 'config'

import { Link } from 'react-router-dom'

import iconSearch from 'asset/img/icon/search.svg'
import iconNext from 'asset/img/icon/arrow-next.svg'
import iconPrevious from 'asset/img/icon/arrow-previous.svg'
import ForumOverviewCard from './ForumOverviewCard'

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

const TableTitle = ({ id, title }) => (
  <Row className="table-header">
    <Col span={15} className="title">
      {title}
    </Col>
    <Col span={4} className="title">
      {TEXT_UI_FORUM.STATISTICS}
    </Col>
    <Col span={5} className="title">
      {TEXT_UI_FORUM.LASTEST_POST}
    </Col>
  </Row>
)

export default function Forum() {
  const [categories, setCategories] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const fetchData = () => {
      const search = {
        page,
        pageSize: PAGINATION_OPTIONS.FORUM.pageSize,
      }
      ForumService.getCategories(search).then((resp) => {
        setCategories(resp.results)
        setTotal(resp.total)
      })
    }
    fetchData()
  }, [page])

  return (
    <div className={styles.forum}>
      <div className="header">
        <h3>{TEXT_UI_FORUM.FORUM}</h3>
        <Row>
          <Col className="search-bar">
            <Input
              size="large"
              suffix={<img alt="search-icon" src={iconSearch} />}
              placeholder="Tìm tên các chủ đề..."
            />
          </Col>
        </Row>
      </div>
      {categories.map((category) => (
        <div>
          <TableTitle id={category.id} title={category.name} />
          <div className="topics">
            {category.forums && category.forums.length > 0 ? (
              category.forums.map((forum) => (
                <ForumOverviewCard className="forum__topic" forum={forum} key={forum.id} />
              ))
            ) : (
              <div className="forum__no_topic"> {TEXT_UI_FORUM.NO_TOPIC_CREATED} </div>
            )}
          </div>
        </div>
      ))}
      <div className="pagination">
        <Pagination
          total={total}
          simple
          current={page}
          pageSize={PAGINATION_OPTIONS.FORUM.pageSize}
          onChange={(destinationPage) => {
            setPage(destinationPage)
          }}
          itemRender={itemRender}
        />
      </div>
    </div>
  )
}
