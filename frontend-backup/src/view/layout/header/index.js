import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import Logo from 'asset/img/logo.svg'
import { HiBell } from 'react-icons/hi'
import { Popover, Menu, Dropdown, Space, Button } from 'antd'
import { TEXT_UI_LAYOUT, FE_ROUTE, APP_MODULES, BE_ROUTE } from 'config'
import { MiscUtils, URLUtils } from 'utils'
import engFlag from 'asset/img/icon/eng.svg'
import styles from './style.module.scss'
import './style.overwrite.scss'

const Header = ({ currentUser, pathname }) => (
  <div className={styles.header}>
    <div className={styles.logo}>
      <Link to={FE_ROUTE.DEFAULT_ROUTE}>
        {' '}
        <img src={Logo} alt="Codetour" />
      </Link>
    </div>
    <div className={styles['menu-container']}>
      <div className={styles['menu-list']}>
        {APP_MODULES.map((module) => (
          <Link to={module.link} key={MiscUtils.generateId()}>
            <div
              className={classnames(styles['top-menu'], 'typography-menu', {
                'text-button-current-selected': pathname.indexOf(module.link) >= 0,
              })}
            >
              {module.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
    <div className={styles['group-control']}>
      <img className={styles.flag} src={engFlag} alt="..." />
      {currentUser ? (
        <>
          <Popover
            trigger="hover"
            placement="bottom"
            title={<div className="label-1">Thông báo mới</div>}
            content={<div>Hiện tại chưa có thông báo mới!</div>}
          >
            <div className={styles.bell}>
              <HiBell />
            </div>
          </Popover>

          <Dropdown
            placement="bottomRight"
            className={styles['avatar-dropdown']}
            overlayClassName={styles['avatar-dropdown']}
            size="large"
            overlay={
              <Menu>
                <Menu.Item key={MiscUtils.generateId()}>
                  <Link to={FE_ROUTE.USER.INFORMATION}>Thông tin chung</Link>
                </Menu.Item>
                <Menu.Item key={MiscUtils.generateId()}>
                  <Link to={`${FE_ROUTE.USER.PROFILE}/${currentUser.id}`}>Hồ sơ của tôi</Link>
                </Menu.Item>
                <Menu.Item key={MiscUtils.generateId()}>
                  <Link to={FE_ROUTE.USER.CHANGE_PASSWORD}>Đổi mật khẩu</Link>
                </Menu.Item>
                <Menu.Item key={MiscUtils.generateId()}>
                  <Link to={FE_ROUTE.USER.TEAM_MANAGEMENT}>Quản lý đội</Link>
                </Menu.Item>
                <Menu.Item key={MiscUtils.generateId()}>
                  <Link to={FE_ROUTE.AUTH.LOGOUT}>Đăng xuất</Link>
                </Menu.Item>
              </Menu>
            }
          >
            <div className={styles['avatar-container']}>
              <img src={URLUtils.buildAvatarURL(currentUser.avatar)} alt="" />
              {/* <div className={styles.overlay}></div> */}
            </div>
          </Dropdown>
        </>
      ) : (
        <>
          <Space>
            <Link to={FE_ROUTE.AUTH.LOGIN}>
              <Button>
                <span className="typography-menu-subtext">{TEXT_UI_LAYOUT.HEADER.LOGIN}</span>
              </Button>
            </Link>

            <Link to={FE_ROUTE.AUTH.REGISTER}>
              <Button>
                <span className="typography-menu-subtext">{TEXT_UI_LAYOUT.HEADER.REGISTER}</span>
              </Button>
            </Link>
          </Space>
        </>
      )}
    </div>
  </div>
)

const mapStateToProps = ({
  authReducer: { currentUser },
  router: {
    location: { pathname },
  },
}) => ({
  currentUser,
  pathname,
})
export default connect(mapStateToProps)(Header)
