import React, { Component } from 'react'
import styles from './style.module.scss'

const ContentComponent = (props) => {
  const { title, description, children } = props

  return (
    <div className={styles.content}>
      <h1>{title}</h1>
      <div className={styles.description}>{description}</div>
      {children}
    </div>
  )
}

export default ContentComponent
