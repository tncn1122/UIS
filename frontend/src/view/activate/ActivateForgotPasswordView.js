import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button, Typography } from 'antd'
import { CloseCircleTwoTone, CheckCircleTwoTone } from '@ant-design/icons'
import { AlignCenterContent, LoadingIndicator } from 'component'
import { ErrorHandlerUtils, URLUtils, ValidationUtils } from 'utils'
import { ActivateService } from 'service'
import {
  FE_ROUTE,
  TEXT_BUTTON,
  TEXT_UI_ERROR_PAGE,
  TEXT_UI_USER_PROFILE,
  TEXT_UI_AUTH,
} from 'config'
import styles from './style.module.scss'

const { Title, Text } = Typography

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}
const tailLayout = {
  wrapperCol: { span: 24 },
}

export default function ActivateForgotPasswordView() {
  const [token, setToken] = useState(true)
  const [isLoadingShown, setIsLoadingShown] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [changeSuccess, setChangeSuccess] = useState(false)

  useEffect(() => {
    const queryParams = URLUtils.getParamsInURL()
    const tokenVal = queryParams.token
    ActivateService.forgotPassword({ token: tokenVal })
      .then(() => {
        setIsLoadingShown(false)
        setToken(tokenVal)
      })
      .catch((error) => {
        setIsLoadingShown(false)
        setErrorMessage(ErrorHandlerUtils.extractErrorMessage(error))
      })
  }, []) // run once in page loaded

  const submitForgotPassword = (data) => {
    ActivateService.forgotPassword({ ...data, token })
      .then(() => {
        setIsLoadingShown(false)
        setChangeSuccess(true)
      })
      .catch((error) => {
        setIsLoadingShown(false)
        setErrorMessage(ErrorHandlerUtils.extractErrorMessage(error))
      })
  }

  return (
    <AlignCenterContent>
      <LoadingIndicator isHidden={!isLoadingShown}>
        <div className={styles['activate-forgot-password-view']}>
          {!isLoadingShown && (
            <>
              {errorMessage && (
                <div>
                  <Title level={3}>
                    {errorMessage} <CloseCircleTwoTone twoToneColor="red" />
                  </Title>
                  <Text>
                    <Link to={FE_ROUTE.DEFAULT_ROUTE} className="btn">
                      &larr; {TEXT_UI_ERROR_PAGE.GO_BACK}
                    </Link>
                  </Text>
                </div>
              )}

              {!errorMessage && (
                <>
                  {changeSuccess && (
                    <div>
                      <Title level={3}>
                        Đổi mật khẩu thành công <CheckCircleTwoTone twoToneColor="#52c41a" />
                      </Title>
                      <Text>
                        <Link to={FE_ROUTE.AUTH.LOGIN} className="btn">
                          {TEXT_UI_AUTH.LOGIN.LOGIN}
                        </Link>
                        &nbsp;để tiếp tục
                      </Text>
                    </div>
                  )}
                  {!changeSuccess && (
                    <>
                      <div className="mb-30 label-3 ta-center">
                        {TEXT_UI_USER_PROFILE.CHANGE_PASSWORD.TITLE}
                      </div>
                      <div>
                        <Form
                          {...layout}
                          name="basic"
                          initialValues={{
                            password: '',
                            'password-confirm': '',
                          }}
                          onFinish={submitForgotPassword}
                        >
                          <Form.Item
                            name="password"
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
                            name="passwordConfirm"
                            label={TEXT_UI_USER_PROFILE.CHANGE_PASSWORD.NEW_PASSWORD_CONFIRM}
                            className="custom-form-item-label-required"
                            hasFeedback
                            dependencies={['password']}
                            rules={[
                              ({ getFieldValue }) => ({
                                validator(_, value) {
                                  return ValidationUtils.textUserInfo(value).then(() =>
                                    ValidationUtils.passwordConfirm(
                                      getFieldValue('password'),
                                      value,
                                    ),
                                  )
                                },
                              }),
                            ]}
                          >
                            <Input.Password />
                          </Form.Item>

                          <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                              {TEXT_BUTTON.SAVE}
                            </Button>
                          </Form.Item>
                        </Form>
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </LoadingIndicator>
    </AlignCenterContent>
  )
}
