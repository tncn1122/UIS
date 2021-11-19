import React from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import { Row, Col, Space } from 'antd'
import logoCodeTour from 'asset/img/logo-code-tour-footer.svg'
import logoVNG from 'asset/img/logo-brand/logo-vng-small.svg'
import iconFacebook from 'asset/img/logo-brand/logo-facebook.svg'
import iconInstagram from 'asset/img/logo-brand/logo-instagram.svg'
import iconLinkedin from 'asset/img/logo-brand/logo-linkedin.svg'
import youtubeIcon from 'asset/img/logo-brand/logo-youtube.svg'
import { TEXT_UI_LAYOUT, FE_ROUTE, APP_MODULES } from 'config'
import { MiscUtils } from 'utils'
import styles from './style.module.scss'

const linkConfig = [
  {
    type: 'title',
    label: TEXT_UI_LAYOUT.FOOTER.LINKS,
  },
]
APP_MODULES.forEach((module) => {
  linkConfig.push({
    type: 'body',
    ...module,
  })
})

const infoConfig = [
  {
    type: 'title',
    label: TEXT_UI_LAYOUT.FOOTER.INFORMATION,
  },
  {
    type: 'body',
    label: TEXT_UI_LAYOUT.FOOTER.ABOUT_US,
    link: FE_ROUTE.MISC.ABOUT_US,
  },
  {
    type: 'body',
    label: TEXT_UI_LAYOUT.FOOTER.TOS,
    link: FE_ROUTE.MISC.TOS,
  },
  {
    type: 'body',
    label: TEXT_UI_LAYOUT.FOOTER.FAQ,
    link: FE_ROUTE.MISC.FAQ,
  },
]

const generateFooterContent = (content) =>
  content.map((item) => {
    if (item.type === 'title') {
      return (
        <p
          key={MiscUtils.generateId()}
          className={classnames(styles['row-title'], 'typography-small')}
        >
          {item.label}
        </p>
      )
    }
    return (
      <a key={MiscUtils.generateId()} href={item.link}>
        <p className={classnames(styles['row-link'], 'typography-small')}>{item.label}</p>
      </a>
    )
  })

export default class Footer extends React.Component {
  render() {
    const { FACEBOOK, INSTAGRAM, LINKEDIN, YOUTUBE } = FE_ROUTE.MISC.VNG_CHANNEL
    return (
      <div className={styles.footer}>
        <Row>
          <Col span={8} justify="center">
            <Link to={FE_ROUTE.DEFAULT_ROUTE} className="pb-20 display-block">
              <img src={logoCodeTour} alt="..." />
            </Link>
            <Space size="large">
              <a href={FACEBOOK} target="_blank" rel="noreferrer">
                <img src={iconFacebook} alt="Facebook" />
              </a>
              <a href={INSTAGRAM} target="_blank" rel="noreferrer">
                <img src={iconInstagram} alt="Instagram" />
              </a>
              <a href={LINKEDIN} target="_blank" rel="noreferrer">
                <img src={iconLinkedin} alt="LinkedIn" />
              </a>
              <a href={YOUTUBE} target="_blank" rel="noreferrer">
                <img src={youtubeIcon} alt="Youtube" />
              </a>
            </Space>
          </Col>
          <Col span={4} className={styles.linkList}>
            {generateFooterContent(linkConfig)}
          </Col>
          <Col span={4} className={styles.linkList}>
            {generateFooterContent(infoConfig)}
          </Col>
          <Col span={8} justify="right">
            <img src={logoVNG} alt="VNG" />
            <span className={classnames(styles['row-description'], 'typography-small')}>
              {TEXT_UI_LAYOUT.FOOTER.PROVIDED_BY}
            </span>
          </Col>
        </Row>
      </div>
    )
  }
}
