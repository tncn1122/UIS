import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { Row, Col, Typography } from 'antd'
import { TEXT_UI_USER_PROFILE, FE_ROUTE } from 'config'
import { MiscUtils } from 'utils'
import CustomCard from '../CustomCard'
import CustomEditAvatar from '../CustomEditAvatar'
import styles from './style.module.scss'

const { Text } = Typography

const UserProfileComponent = ({ children, pathname }) => {
  const leftMenu = [
    {
      link: FE_ROUTE.USER.INFORMATION,
      label: TEXT_UI_USER_PROFILE.PERSONAL_INFORMATION.TITLE,
    },
    {
      link: FE_ROUTE.USER.CHANGE_PASSWORD,
      label: TEXT_UI_USER_PROFILE.CHANGE_PASSWORD.TITLE,
    },
    {
      link: FE_ROUTE.USER.TEAM_MANAGEMENT,
      label: TEXT_UI_USER_PROFILE.TEAM_MANAGEMENT.TITLE,
    },
  ]

  const generateLeftMenuContent = (leftMenuConfig) =>
    leftMenuConfig.map((item) => (
      <div className="m-t-10" key={MiscUtils.generateId()}>
        <Link to={item.link}>
          <Text
            className={classnames(styles['user-menu'], {
              'text-button-current-selected': pathname === item.link,
            })}
          >
            {item.label}
          </Text>
        </Link>
      </div>
    ))

  return (
    <Row gutter={[32, 32]} className={styles['user-info-row']}>
      <Col span={6}>
        <CustomCard className={styles['user-avatar-block']}>
          <CustomEditAvatar />
          <div className="m-t-10">{generateLeftMenuContent(leftMenu)}</div>
        </CustomCard>
      </Col>
      <Col span={18}>{children}</Col>
    </Row>
  )
}

const mapStateToProps = ({
  router: {
    location: { pathname },
  },
}) => ({
  pathname,
})
export default connect(mapStateToProps)(UserProfileComponent)
