import React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { Card, Tabs, Button, Typography } from 'antd'
import { MiscUtils, URLUtils } from 'utils'
import { TEXT_UI_AUTH, FE_ROUTE } from 'config'
import topLeft from 'asset/img/auth/top-left.svg'
import bottomRight from 'asset/img/auth/bottom-right.svg'
import logoGoogle from 'asset/img/logo-brand/logo-google.png'
import logoMicrosoft from 'asset/img/logo-brand/logo-microsoft.png'
import logoFacebook from 'asset/img/logo-brand/logo-facebook.png'
import logoZalo from 'asset/img/logo-brand/logo-zalo.png'
import { LoadingIndicator } from 'component'
import Login from './Login'
import Register from './Register'
import styles from './style.module.scss'
import './style.overwrite.scss'

const { Text } = Typography
const { TabPane } = Tabs
const SOCIAL_BUTTONS = [
  {
    title: 'Google',
    logo: logoGoogle,
  },
  {
    title: 'Microsoft',
    logo: logoMicrosoft,
  },
  {
    title: 'Facebook',
    logo: logoFacebook,
  },
  {
    title: 'Zalo',
    logo: logoZalo,
  },
]

const mapStateToProps = ({ authReducer: { currentUser } }) => ({
  currentUser,
})

@connect(mapStateToProps)
export default class AuthView extends React.Component {
  state = {
    isLoadingShown: false,
  }

  setIsLoadingShown = (val) => {
    this.setState({ isLoadingShown: val })
  }

  renderComingSoon = () => {
    MiscUtils.showComingSoon('Login with social account')
  }

  renderSocialBtn = () => (
    <div id="social-layout">
      {SOCIAL_BUTTONS.map((social) => (
        <Button
          key={MiscUtils.generateId()}
          onClick={this.renderComingSoon}
          className={styles['btn-social']}
          icon={<img src={social.logo} alt="" />}
        >
          <span className="typography-small">{social.title}</span>
        </Button>
      ))}
    </div>
  )

  render() {
    const { isLoadingShown } = this.state
    const {
      currentUser,
      match: { path },
    } = this.props
    if (currentUser) URLUtils.moveToURL(FE_ROUTE.DEFAULT_ROUTE)
    return (
      <div className={styles['auth-view']}>
        <img src={topLeft} alt="top-left" className={styles['img-top-left']} />
        <img src={bottomRight} alt="bottom-right" className={styles['img-bottom-right']} />
        <div className={styles['auth-view-content']}>
          <LoadingIndicator isHidden={!isLoadingShown}>
            <Card className={styles.content}>
              <Tabs id="authTabs" defaultActiveKey={path || FE_ROUTE.AUTH.LOGIN} centered>
                <TabPane
                  tab={
                    <span className={classnames(styles.title, 'typography-h3')}>
                      {TEXT_UI_AUTH.LOGIN.LOGIN}
                    </span>
                  }
                  key={FE_ROUTE.AUTH.LOGIN}
                >
                  <Login setIsLoadingShown={this.setIsLoadingShown} />
                </TabPane>
                <TabPane
                  tab={
                    <span className={classnames(styles.title, 'typography-h3')}>
                      {TEXT_UI_AUTH.REGISTER.REGISTER}
                    </span>
                  }
                  key={FE_ROUTE.AUTH.REGISTER}
                >
                  <Register setIsLoadingShown={this.setIsLoadingShown} />
                </TabPane>
              </Tabs>
              <div className="ta-center">
                <Text>{TEXT_UI_AUTH.SOCIAL_LOGIN}</Text>
              </div>
              {/* todo: need apply captcha when register or login */}
              {this.renderSocialBtn()}
            </Card>
          </LoadingIndicator>
        </div>
      </div>
    )
  }
}
