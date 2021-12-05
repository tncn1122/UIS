import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Space, Card } from 'antd'
import { TEXT_UI_USER_PROFILE, TEXT_BUTTON, TEXT_NOTIFICATION_SUCCESS, TEXT_UI_AUTH } from 'config'
import UserProfileComponent from 'component/UserProfileComponent'
import { LoadingIndicator, ForgotPasswordModal } from 'component'
import { ErrorHandlerUtils, ValidationUtils, DisplayUtils } from 'utils'
import { UserService } from 'service'
import styles from './style.module.scss'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 19 },
}
const tailLayout = {
  wrapperCol: { offset: 4, span: 19 },
}

const mapStateToProps = ({ authReducer: { currentUser } }) => ({
  currentUser,
})

const ChangePassword = ({ currentUser }) => {
  const [form] = Form.useForm()
  const [isLoadingShown, setIsLoadingShown] = useState(false)
  const [isForgotPasswordShown, setIsForgotPasswordShown] = useState(false)

  const submitChangePassword = (data) => {
    setIsLoadingShown(true)
    UserService.changePassword(data)
      .then(() => {
        form.resetFields()
        setIsLoadingShown(false)
        DisplayUtils.showNotification(TEXT_NOTIFICATION_SUCCESS.UPDATE_INFO_SUCCESS)
      })
      .catch((error) => {
        setIsLoadingShown(false)
        ErrorHandlerUtils.http(error)
      })
  }

  return (
    <div className={styles['user-info-body']}>
      <h2 className={styles['user-info-title']}>{TEXT_UI_USER_PROFILE.GENERAL_INFORMATION}</h2>
      <LoadingIndicator isHidden={!isLoadingShown}>
        <UserProfileComponent>
          <ForgotPasswordModal
            isShown={isForgotPasswordShown}
            onClose={() => setIsForgotPasswordShown(false)}
            currentUserEmail={currentUser.email}
            ModelService={UserService}
          />
          <Card title={TEXT_UI_USER_PROFILE.CHANGE_PASSWORD.TITLE}>
            <Form
              {...layout}
              name="basic"
              form={form}
              initialValues={{
                oldPassword: '',
                newPassword: '',
                newPasswordConfirm: '',
              }}
              onFinish={submitChangePassword}
            >
              <Form.Item
                labelCol={{ span: 6 }}
                name="oldPassword"
                label={TEXT_UI_USER_PROFILE.CHANGE_PASSWORD.OLD_PASSWORD}
                className="custom-form-item-label-required"
                hasFeedback
                rules={[
                  () => ({
                    validator(_, value) {
                      return ValidationUtils.password(value)
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 6 }}
                name="newPassword"
                label={TEXT_UI_USER_PROFILE.CHANGE_PASSWORD.NEW_PASSWORD}
                className="custom-form-item-label-required"
                hasFeedback
                rules={[
                  () => ({
                    validator(_, value) {
                      return ValidationUtils.password(value)
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 6 }}
                name="newPasswordConfirm"
                label={TEXT_UI_USER_PROFILE.CHANGE_PASSWORD.NEW_PASSWORD_CONFIRM}
                className="custom-form-item-label-required"
                hasFeedback
                dependencies={['newPassword']}
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      return ValidationUtils.textUserInfo(value).then(() =>
                        ValidationUtils.passwordConfirm(getFieldValue('newPassword'), value),
                      )
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <div className={styles['form-footer']}>
                  <Space>
                    <Button type="cancel">{TEXT_BUTTON.CANCEL}</Button>
                    <Button type="primary" htmlType="submit">
                      {TEXT_BUTTON.SAVE}
                    </Button>
                  </Space>
                  <div className={styles['link-forgot-pwd']}>
                    <a
                      className="float-right text-underline typography-small"
                      onClick={() => setIsForgotPasswordShown(true)}
                    >
                      {TEXT_UI_AUTH.LOGIN.FORGOT_PASSWORD}
                    </a>
                  </div>
                </div>
              </Form.Item>
            </Form>
          </Card>
        </UserProfileComponent>
      </LoadingIndicator>
    </div>
  )
}

export default connect(mapStateToProps)(ChangePassword)
