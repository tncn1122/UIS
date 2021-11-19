import React from 'react'
import { Card, Typography } from 'antd'
import styles from './style.module.scss'

PartnerCard.defaultProps = {
  isBigImage: true,
}

function PartnerCard(props) {
  const { title, url, imageUrl, isSmallImage } = props

  return (
    <>
      <p className="typography-h3">{title}</p>
      <Card className={styles['partner-card']} hoverable>
        <a href={url} target="_blank" rel="noreferrer" className="button-hover">
          <div className={styles.image} style={{ padding: isSmallImage ? '0' : '' }}>
            <img src={imageUrl} alt={title} className={isSmallImage ? '' : 'w-60'} />
          </div>
        </a>
      </Card>
    </>
  )
}

export default PartnerCard
