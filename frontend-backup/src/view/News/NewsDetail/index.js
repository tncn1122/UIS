import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Button, Breadcrumb } from 'antd'

import { FE_ROUTE } from 'config'
import NewsService from 'service/NewsService'
import { ErrorHandlerUtils } from 'utils'

import iconCommentOutline from 'asset/img/icon/comment-outline.svg'
import iconFacebook from 'asset/img/logo-brand/logo-facebook.svg'
import iconInstagram from 'asset/img/logo-brand/logo-instagram.svg'
import linkedinIcon from 'asset/img/logo-brand/logo-linkedin.svg'
import iconEye from 'asset/img/icon/eye.svg'
import Comments from '../Comments'

import styles from './style.module.scss'

const mapStateToProps = ({ authReducer: { currentUser } }) => ({
  currentUser,
})

const NewsDetail = (props) => {
  const [newsData, setNewsData] = useState([])
  const [countViews, setCountViews] = useState(0)
  const { newsId } = useParams()
  const { currentUser } = props

  useEffect(() => {
    fetchData(newsId)
    updateNewsView()
    return () => {
      ;[]
    }
  }, [])
  const updateNewsView = () => {
    NewsService.postCommentView(newsId)
  }

  const fetchData = (id) => {
    NewsService.getNewsDetails(id)
      .then((resp) => {
        setNewsData(resp)
        setCountViews(resp.countViews)
      })
      .catch((error) => {
        ErrorHandlerUtils.http(error)
      })
  }

  return (
    <div className={styles.news}>
      <Breadcrumb className="breadcrumb" separator=">">
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/news">Tin tức</Breadcrumb.Item>
        <Breadcrumb.Item>{newsData.title}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="post">
        <h2 className="title">{newsData.title}</h2>
        <h5 className="time">{newsData.updatedAt}</h5>
        <div
          className="post__main mb-50"
          dangerouslySetInnerHTML={{ __html: newsData.htmlContent }}
        />
      </div>
      <Row className="footer">
        <Col span={20}>
          <img alt="comment" src={iconCommentOutline} />
          {newsData.countComments}
          <img alt="view" src={iconEye} />
          {countViews}
        </Col>
        <Col span={4} style={{ paddingRight: 5 }}>
          <img alt="facebook" src={iconFacebook} />
          <img alt="instagram" src={iconInstagram} />
          <img alt="linkedin" src={linkedinIcon} />
        </Col>
      </Row>
      {currentUser ? (
        <Comments newsId={newsId} />
      ) : (
        <div className="require-login">
          <Link to={FE_ROUTE.AUTH.LOGIN}>
            <Button type="primary">Vui lòng đăng nhập để bình luận</Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default connect(mapStateToProps)(NewsDetail)
