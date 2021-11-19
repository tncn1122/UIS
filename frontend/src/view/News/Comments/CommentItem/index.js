import React, { createElement, useState } from 'react'
import moment from 'moment'

import HtmlRender from 'component/HtmlRender'
import RichTextEditor from 'component/RichTextEditor'
import iconCommentReply from 'asset/img/icon/comment-reply.svg'
import { Comment, Tooltip, Input, Button, Form } from 'antd'

import { LikeOutlined, LikeFilled } from '@ant-design/icons'

import NewsService from 'service/NewsService'
import { ErrorHandlerUtils, URLUtils } from 'utils'

import styles from './style.module.scss'

const CommentItem = ({ commentData, newsId, replies, handleReplySuccess }) => {
  const [form] = Form.useForm()

  const [comment, setComment] = useState(commentData)
  const [countLikes, setCountLikes] = useState(comment.countLikes ? comment.countLikes : 0)
  const [isLikedByUser, setIsLikedByUser] = useState(comment.isLiked ? comment.isLiked : false)
  const [showReplyTextbox, setShowReplyTextbox] = useState(false)

  const handleLike = () => {
    if (isLikedByUser) {
      NewsService.deleteCommentLike(newsId, comment.id)
        .then((resp) => {
          setCountLikes((prevCountLikes) => prevCountLikes - 1)
          setIsLikedByUser(false)
        })
        .catch((error) => {
          ErrorHandlerUtils.http(error)
        })
    } else {
      NewsService.postCommentLike(newsId, comment.id)
        .then((resp) => {
          setCountLikes((prevCountLikes) => prevCountLikes + 1)
          setIsLikedByUser(true)
        })
        .catch((error) => {
          ErrorHandlerUtils.http(error)
        })
    }
  }

  const handleReplyClick = () => {
    setShowReplyTextbox(!showReplyTextbox)
  }

  const handleSubmitReply = (data) => {
    // toReplyCommentId: Reply only to root parent, not child.
    const toReplyCommentId = comment.newsCommentParentId ? comment.newsCommentParentId : comment.id
    NewsService.postCommentReply(newsId, toReplyCommentId, { text: data.replyData })
      .then((reply) => {
        form.resetFields()
        setShowReplyTextbox(false)
        handleReplySuccess(reply)
      })
      .catch((error) => {
        ErrorHandlerUtils.http(error)
      })
  }

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={handleLike}>
        {createElement(isLikedByUser ? LikeFilled : LikeOutlined)}
        <span className="comment-action">&nbsp;{countLikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to" onClick={handleReplyClick}>
      <img alt="commentReply" src={iconCommentReply} />
      &nbsp;&nbsp;Trả lời
    </span>,
  ]

  return (
    <Comment
      className={styles.comment}
      actions={actions}
      author={comment.user.username}
      avatar={
        comment.user.userProfile
          ? URLUtils.buildAvatarURL(comment.user.userProfile.avatar)
          : URLUtils.buildAvatarURL()
      }
      content={<div dangerouslySetInnerHTML={{ __html: comment.text }} />}
      datetime={moment(comment.createdAt).fromNow()}
    >
      {replies}

      {showReplyTextbox ? (
        <div>
          <Form onFinish={handleSubmitReply} form={form}>
            <Form.Item name="replyData">
              <RichTextEditor placeholder="Trả lời bình luận" />
            </Form.Item>
            <Form.Item className="reply-action">
              <Button type="primary" size="small" htmlType="submit">
                Trả lời
              </Button>
            </Form.Item>
          </Form>
        </div>
      ) : (
        ''
      )}
    </Comment>
  )
}
export default CommentItem
