import React from 'react'
import classnames from 'classnames'
import { Card, Avatar } from 'antd'
import styles from './style.module.scss'

function Testimonial(props) {
  const { testimonial } = props

  return (
    <Card className={styles.testimonialCard} hoverable>
      <div>
        <Avatar src={testimonial.user.photo} size="large" />
      </div>
      <p className={classnames(styles.content, 'typography-main')}>{testimonial.testimonial}</p>
      <p className="mb-no typography-h4">{testimonial.user.fullName}</p>
      <p className={classnames(styles.contest, 'typography-small')}>
        {testimonial.attendedContest}
      </p>
    </Card>
  )
}

export default Testimonial
