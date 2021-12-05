import React, { useState } from 'react'
import { AiFillDislike, AiFillLike } from 'react-icons/ai'
import { Input } from 'antd'
import RichTextEditor from 'components/RichTextEditor'
import styles from './style.module.scss'

export default function CommentItem({ commentData }) {
  const [comment, setComment] = useState(commentData)
  const [reply, setReply] = useState(null)

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      const newReply = {
        id: `reply-${Math.random()}`,
        username: 'User',
        comment: e.target.value,
        likes: 0,
        dislikes: 0,
        image: 'https://rockandbluescruise.com/wp-content/uploads/2020/10/tieu-su-ronaldo.jpg',
      }
      const newComment = { ...comment }
      newComment.replies.push(newReply)
      setComment(newComment)
      setReply('')
    }
  }

  return (
    <div className={styles.comment}>
      <div className="user">
        <img src={comment.image} alt="" />
        <span> {comment.username}</span>
      </div>
      <p className="comment__text">{comment.comment}</p>
      <div className="btn-group">
        <span className="like">
          <AiFillLike className="like-icon" />
          &nbsp; {comment.likes}
        </span>
        <span className="dislike">
          <AiFillDislike className="dislike-icon" />
          &nbsp; {comment.dislikes}
        </span>
        <span className="btn-reply" onClick={() => setReply('')}>
          Trả lời
        </span>
      </div>
      {comment.replies.length ? <div>{comment.replies.length} replies</div> : ''}
      <div className="replies">
        {comment.replies.map((rep) => (
          <div className="reply" key={rep.id}>
            <div className="user">
              <img src={rep.image} alt="" />
              <span> {rep.username}</span>
            </div>
            <p>{rep.comment}</p>
            <div className="btn-group">
              <span className="like">
                <AiFillLike className="like-icon" />
                &nbsp; {rep.likes}
              </span>
              <span className="dislike">
                <AiFillDislike className="dislike-icon" />
                &nbsp; {rep.dislikes}
              </span>
              <span className="btn-reply" onClick={() => setReply('')}>
                Trả lời
              </span>
            </div>
          </div>
        ))}
        {reply !== null ? (
          <div className="input-reply">
            {/* <Input
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Viết bình luận"
            /> */}
            <RichTextEditor
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Viết bình luận hehe"
            />
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
