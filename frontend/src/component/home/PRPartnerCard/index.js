import React from 'react'
import { Card } from 'antd'
import styles from './style.module.scss'
import './style.overwrite.scss'

PRPartnerCard.defaultProps = {
  isBigImage: false,
}

function PRPartnerCard(props) {
  const { title, url, imageUrl, isSmallImage } = props
  return (
    <>
      <Card className={styles['prPartner-card']} hoverable>
        <a href={url} target="_blank" rel="noreferrer">
          <div className={styles.image} style={{ padding: isSmallImage ? '0' : '' }}>
            <img src={imageUrl} alt={title} className={isSmallImage ? '' : 'w-80'} />
          </div>
        </a>
      </Card>
    </>
  )
}

export default PRPartnerCard
