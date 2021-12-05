import React, { createElement, useState } from 'react'
import { Row, Col } from 'antd'
import moment from 'moment'
import { LikeOutlined, LikeFilled, DislikeOutlined, DislikeFilled } from '@ant-design/icons'
import classnames from 'classnames'

import ForumService from 'service/ForumService'
import { ErrorHandlerUtils, URLUtils } from 'utils'

import styles from './style.module.scss'

export default function TopicDetailCard({ post, className }) {
  const [reply, setReply] = useState(false)
  const [countLikes, setCountLikes] = useState(post.countLikes ? post.countLikes : 0)
  const [countDislikes, setCountDislikes] = useState(post.countDislikes ? post.countDislikes : 0)
  const [isLikedByUser, setIsLikedByUser] = useState(post.isLiked ? post.isLiked : false)
  const [isDislikedByUser, setIsDislikedByUser] = useState(
    post.isDisliked ? post.isDisliked : false,
  )

  const handleLike = () => {
    if (isLikedByUser) {
      ForumService.deletePostLikeDislike(post.id)
        .then((resp) => {
          setCountLikes((prevCountLikes) => prevCountLikes - 1)
          setIsLikedByUser(false)
        })
        .catch((error) => {
          ErrorHandlerUtils.http(error)
        })
    } else {
      ForumService.postPostLike(post.id)
        .then((resp) => {
          setCountLikes((prevCountLikes) => prevCountLikes + 1)
          setIsLikedByUser(true)
          if (isDislikedByUser) {
            setIsDislikedByUser(false)
            setCountDislikes((prevCountDislikes) => prevCountDislikes - 1)
          }
        })
        .catch((error) => {
          ErrorHandlerUtils.http(error)
        })
    }
  }

  const handleDislike = () => {
    if (isDislikedByUser) {
      ForumService.deletePostLikeDislike(post.id)
        .then((resp) => {
          setCountDislikes((prevCountDislikes) => prevCountDislikes - 1)
          setIsDislikedByUser(false)
        })
        .catch((error) => {
          ErrorHandlerUtils.http(error)
        })
    } else {
      ForumService.postPostDislike(post.id)
        .then((resp) => {
          setCountDislikes((prevCountDislikes) => prevCountDislikes + 1)
          setIsDislikedByUser(true)
          if (isLikedByUser) {
            setIsLikedByUser(false)
            setCountLikes((prevCountLikes) => prevCountLikes - 1)
          }
        })
        .catch((error) => {
          ErrorHandlerUtils.http(error)
        })
    }
  }

  return (
    <Row
      span={24}
      className={classnames(styles['topic-detail___card'], className, {
        [styles.owner]: post.type === 'owner',
      })}
    >
      <Col span={4} className="topic__user">
        <img
          src={
            post.user.userProfile
              ? URLUtils.buildAvatarURL(post.user.userProfile.avatar)
              : URLUtils.buildAvatarURL()
          }
          alt=""
        />
        <div className="username">{`@${post.user.username.toLowerCase()}`}</div>
        <div className="fullname">
          {post.user.userProfile && post.user.userProfile.full_name
            ? post.user.userProfile.full_name
            : post.user.username}
        </div>
        <div className="count-posts">Post: {post.user.countPosts}</div>
      </Col>
      <Col span={19} className="post">
        <div className="time">{moment(post.createdAt).fromNow()}</div>
        <div className="content" dangerouslySetInnerHTML={{ __html: post.htmlContent }} />
        <div className="bottom">
          <div className="btn-group">
            <span className="like" onClick={handleLike}>
              {createElement(isLikedByUser ? LikeFilled : LikeOutlined)}
              &nbsp; {countLikes}
            </span>
            <span className="dislike" onClick={handleDislike}>
              {createElement(isDislikedByUser ? DislikeFilled : DislikeOutlined)}
              &nbsp; {countDislikes}
            </span>
            <span className="btn-reply" onClick={() => setReply(!reply)}>
              Trả lời
            </span>
          </div>
        </div>
      </Col>
    </Row>
  )
}
