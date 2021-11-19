import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Button, Pagination, Breadcrumb } from 'antd'
import { Link, useParams } from 'react-router-dom'

import { PAGINATION_OPTIONS, TEXT_UI_FORUM } from 'config'
import ForumService from 'service/ForumService'

import iconComment from 'asset/img/icon/comment.svg'
import iconNext from 'asset/img/icon/arrow-next.svg'
import iconPrevious from 'asset/img/icon/arrow-previous.svg'
import TopicDetailCard from './TopicDetailCard'
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

const mapStateToProps = ({ authReducer: { currentUser } }) => ({
  currentUser,
})

const TopicDetail = (props) => {
  const [content, setContent] = useState('')
  const [topicTitle, setTopicTitle] = useState('')
  const [forumId, setForumId] = useState(0)
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [forumName, setForumName] = useState('')

  const { topicId } = useParams()

  const { currentUser } = props

  useEffect(() => {
    const newPosts = []

    const fetchData = () => {
      const search = {
        page,
        pageSize: PAGINATION_OPTIONS.FORUM_POST.pageSize,
      }
      ForumService.getPostsByTopic(search, topicId).then((resp) => {
        setPosts(resp.results)
        setTotal(resp.total)
      })
    }
    fetchData()
  }, [page])

  useEffect(() => {
    const fetchData = () => {
      ForumService.getTopicDetails(topicId).then((topic) => {
        setTopicTitle(topic.title)
        ForumService.getForumDetails(topic.forumId).then((resp) => {
          setForumName(resp.name)
          setForumId(resp.id)
        })
      })
    }

    const updateNewsView = () => {
      ForumService.postTopicView(topicId)
    }
    updateNewsView()
    fetchData()
  }, [])

  useEffect(() => {}, [])

  const handleSubmit = () => {
    const htmlContent = content
    ForumService.postPost(topicId, { htmlContent }).then((post) => {
      setPosts([
        ...posts,
        {
          ...post,
          user: currentUser,
        },
      ])
      console.log('Success post: ', post)
    })
  }
  return (
    <div className={styles['topic-detail']}>
      <Breadcrumb className="breadcrumb" separator=">">
        <Breadcrumb.Item href="/">{TEXT_UI_FORUM.HOME}</Breadcrumb.Item>
        <Breadcrumb.Item href="/forums">{TEXT_UI_FORUM.FORUM}</Breadcrumb.Item>
        <Breadcrumb.Item href={`/forums/${forumId}`}>{forumName}</Breadcrumb.Item>
        <Breadcrumb.Item>{topicTitle}</Breadcrumb.Item>
      </Breadcrumb>
      {posts.map((post) => (
        <TopicDetailCard className="topic-detail__item" key={post.id} post={post} />
      ))}
      <div className="suggestion">
        <div className="create-post">
          <CKEditor
            editor={ClassicEditor}
            data={content}
            onChange={(event, editor) => setContent(editor.getData())}
            onReady={(editor) => {
              editor.editing.view.change((writer) => {
                writer.setStyle('height', '50px', editor.editing.view.document.getRoot())
              })
            }}
            onSubmit={handleSubmit}
          />
          <div className="btn-group">
            <Button type="text" className="button-inactive">
              Cancel
            </Button>
            <Button type="text" className="button-active" onClick={handleSubmit}>
              <img alt="comment" src={iconComment} />
              Trả lời
            </Button>
          </div>
        </div>
      </div>
      <div className="pagination">
        <Pagination
          total={total}
          simple
          current={page}
          pageSize={PAGINATION_OPTIONS.FORUM_POST.pageSize}
          onChange={(destinationPage) => {
            setPage(destinationPage)
          }}
          itemRender={itemRender}
        />
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(TopicDetail)
