import React, { useState } from 'react'
import { Button, Checkbox, Divider, Form, Input, Typography } from 'antd'
import { FE_ROUTE, TEXT_UI_AUTH, TEXT_VALIDATOR } from 'config'
import { ErrorHandlerUtils, MiscUtils, URLUtils } from 'utils'
import { AuthService } from 'service'
import { loginSetCurrentUserAction } from 'redux/auth/actions'
import { ForgotPasswordModal } from 'component'
import styles from './style.module.scss'

const { Text } = Typography

export default function Login({ setIsLoadingShown }) {
  const [form] = Form.useForm()
  const [isForgotPasswordShown, setIsForgotPasswordShown] = useState(false)

  const submitLogin = (data) => {
    setIsLoadingShown(true)
    AuthService.login(data)
      .then((user) => {
        const { next } = URLUtils.getParamsInURL()
        const redirect = next === FE_ROUTE.DEFAULT_ROUTE ? null : next
        MiscUtils.dispatchReduxAction(loginSetCurrentUserAction(user, redirect))
      })
      .catch((error) => {
        setIsLoadingShown(false)
        ErrorHandlerUtils.http(error)
      })
  }

  return (
    <div className={styles['form-layout']}>
      <ForgotPasswordModal
        isShown={isForgotPasswordShown}
        onClose={() => setIsForgotPasswordShown(false)}
        ModelService={AuthService}
      />
      <Form
        layout="vertical"
        name="form-login"
        form={form}
        initialValues={{ remember: true }}
        onFinish={submitLogin}
      >
        <Form.Item
          name="username_email"
          label={<Text>{TEXT_UI_AUTH.LOGIN.USERNAME_EMAIL}</Text>}
          rules={[
            {
              required: true,
              message: TEXT_VALIDATOR.USERNAME_OR_EMAIL_REQUIRED,
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label={<Text>{TEXT_UI_AUTH.LOGIN.PASSWORD}</Text>}
          rules={[
            {
              required: true,
              message: TEXT_VALIDATOR.PASSWORD_REQUIRED,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>
              <Text>{TEXT_UI_AUTH.LOGIN.REMEMBER_ME}</Text>
            </Checkbox>
          </Form.Item>
          <a className="float-right text-underline" onClick={() => setIsForgotPasswordShown(true)}>
            <span className="typography-main">{TEXT_UI_AUTH.LOGIN.FORGOT_PASSWORD}</span>
          </a>
        </Form.Item>

        <Form.Item className="ta-center">
          <Button type="primary" size="large" htmlType="submit">
            <span className="typography-main">{TEXT_UI_AUTH.LOGIN.LOGIN}</span>
          </Button>
        </Form.Item>
      </Form>
      <Divider />
    </div>
  )
}
