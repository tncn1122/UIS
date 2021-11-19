import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Input, Form, Space, Button, Divider, List } from 'antd'

import NewsService from 'service/NewsService'
import { ErrorHandlerUtils, DisplayUtils } from 'utils'
import { TEXT_NOTIFICATION_SUCCESS, TEXT_BUTTON } from 'config'
import RichTextEditor from 'component/RichTextEditor'
import CommentItem from './CommentItem'
import styles from './style.module.scss'

const { TextArea } = Input

const mapStateToProps = ({ authReducer: { currentUser } }) => ({
  currentUser,
})

const Comments = (props) => {
  const [form] = Form.useForm()
  const { newsId, currentUser } = props

  const [comments, setComments] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const handleSubmitComment = (data) => {
    NewsService.postComment(newsId, { text: data.commentData })
      .then((newComment) => {
        form.resetFields()
        newComment.replies = []
        setComments([
          {
            ...newComment,
            user: currentUser,
          },
          ...comments,
        ])
      })
      .catch((error) => {
        ErrorHandlerUtils.http(error)
      })
  }

  useEffect(() => {
    const fetchData = () => {
      const search = { page }
      NewsService.getComments(newsId, search).then((resp) => {
        setComments(resp.results)
        setTotal(resp.total)
      })
    }
    fetchData()
  }, [])

  const handleReplySuccess = (reply) => {
    reply.user = currentUser
    // append reply to repliedComment
    const repliedComment = _.find(comments, (comment) => comment.id === reply.newsCommentParentId)
    const newReplies = [...repliedComment.replies]
    newReplies.push(reply)
    repliedComment.replies = newReplies
    // replace repliedComment in comments
    const index = _.findIndex(comments, { id: repliedComment.id })
    const newComments = [...comments]
    newComments.splice(index, 1, repliedComment)
    setComments(newComments)
  }

  return (
    <div className={styles.comments}>
      <Form className="input-comment" onFinish={handleSubmitComment} form={form}>
        <Form.Item name="commentData">
          <RichTextEditor placeholder="Viết bình luận" />
          {/* <TextArea rows={4} type="text" placeholder="Viết bình luận" /> */}
        </Form.Item>
        <div className="ta-right">
          <Space>
            <Button type="cancel">{TEXT_BUTTON.CANCEL}</Button>
            <Button type="primary" size="large" htmlType="submit">
              {TEXT_BUTTON.SAVE}
            </Button>
          </Space>
        </div>
      </Form>
      <Divider />
      <h3>COMMENTS</h3>
      <Divider />
      <List
        className="comment-list"
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={(comment) => (
          <CommentItem
            key={comment.id}
            newsId={newsId}
            commentData={comment}
            handleReplySuccess={handleReplySuccess}
            replies={
              comment.replies && comment.replies != null && comment.replies.length > 0 ? (
                <List
                  className="comment-list"
                  itemLayout="horizontal"
                  dataSource={comment.replies}
                  renderItem={(reply) => (
                    <CommentItem
                      key={reply.id}
                      commentData={reply}
                      newsId={newsId}
                      handleReplySuccess={handleReplySuccess}
                    />
                  )}
                />
              ) : (
                ''
              )
            }
          />
        )}
      />
    </div>
  )
}

export default connect(mapStateToProps)(Comments)
