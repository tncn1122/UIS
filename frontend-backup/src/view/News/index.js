import React, { useEffect, useState } from 'react'
import { List, Spin, Layout } from 'antd'
import { Link } from 'react-router-dom'
import iconComment from 'asset/img/icon/comment.svg'
import moment from 'moment'
import { PAGINATION_OPTIONS, TIME_FORMAT_NEWS } from 'config'
import NewsService from 'service/NewsService'
import { ErrorHandlerUtils, URLUtils } from 'utils'
import styles from './style.module.scss'

const { Header, Footer, Sider, Content } = Layout;

export default function NewsHomePage(props) {
  const [loading, setLoading] = useState(false)
  const [textLoading, setTextLoading] = useState(false)
  const [listNews, setListNews] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const fetchData = () => {
      const search = { page }
      NewsService.getNews(search).then((resp) => {
        setListNews(resp.results)
        setTotal(resp.total)
      })
    }
    fetchData()
  }, [page])

  return (
    <div className={styles.main}>
      <Spin spinning={loading} tip={textLoading}>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            total,
            simple: true,
            current: page,
            pageSize: PAGINATION_OPTIONS.NEWS.pageSize,
            onChange: (destinationPage) => {
              console.log('CHANGE TO PAGE', destinationPage)
              setPage(destinationPage)
            },
          }}
          dataSource={listNews}
          renderItem={(item) => (
            <div className={styles.card} key={item.id}>
              <div className="card__left">
                <h3>
                  {' '}
                  <Link to={`/news/${item.id}`} className="link">
                    {item.title.toUpperCase()}
                  </Link>
                </h3>
                <div className="description">{item.summary}</div>
                <div className="view-more">
                  <Link className="link" to={`/news/${item.id}`}>
                    Xem thêm
                  </Link>
                </div>
                <div className="footer">
                  {moment(item.createdAt).format(TIME_FORMAT_NEWS)} &nbsp;&nbsp;&nbsp;
                  <div className="right">
                    {item.countComments}
                    <img alt="comment" src={iconComment} /> &nbsp;
                  </div>
                </div>
              </div>
              <div className="card__right">
                <img
                  alt="thumbnail"
                  src={
                    item.thumbnailURL
                      ? URLUtils.buildThumbnailURL(item.thumbnailURL)
                      : URLUtils.buildThumbnailURL()
                  }
                />
              </div>
            </div>
          )}
        />
      </Spin>
    </div>
  )
}
