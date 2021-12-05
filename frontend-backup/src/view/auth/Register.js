import React, { useState } from 'react'
import classnames from 'classnames'
import { Button, Checkbox, Divider, Form, Input, Typography } from 'antd'
import { MailTwoTone, CheckCircleTwoTone, ReloadOutlined } from '@ant-design/icons'
import { ValidationUtils, ErrorHandlerUtils } from 'utils'
import { TEXT_UI_AUTH, FE_ROUTE, TEXT_VALIDATOR } from 'config'
import { AuthService } from 'service'
import { ResendRegisterEmailModal } from 'component'
import styles from './style.module.scss'

const { Text } = Typography

export default function Register({ setIsLoadingShown }) {
  const [isShowForm, setIsShowForm] = useState(true)
  const [isShowSuccess, setIsShowSuccess] = useState(false)
  const [isTermAgreed, setIsTermAgreed] = useState(false)
  const [isResendEmailShown, setIsResendEmailShown] = useState(false)
  const [form] = Form.useForm()

  const toggleIsTermAgreed = (event) => {
    setIsTermAgreed(event.target.checked)
  }

  const submitRegister = (data) => {
    setIsLoadingShown(true)
    AuthService.register(data)
      .then(() => {
        form.resetFields()
        setIsLoadingShown(false)
        setIsShowForm(false)
        setIsShowSuccess(true)
      })
      .catch((error) => {
        setIsLoadingShown(false)
        ErrorHandlerUtils.http(error)
      })
  }

  return (
    <>
      <ResendRegisterEmailModal
        isShown={isResendEmailShown}
        onClose={() => setIsResendEmailShown(false)}
        ModelService={AuthService}
      />
      {/* ----- Register success ----- */}
      {isShowSuccess && (
        <div className={styles['page-success-layout']}>
          <p className="ta-center typography-h3">
            Cảm ơn bạn đã quan tâm CodeTour <CheckCircleTwoTone twoToneColor="#52c41a" />
          </p>
          <MailTwoTone twoToneColor="#f15a29" /> &nbsp;{' '}
          <Text>
            Bạn vui lòng kiểm tra email và thực hiện theo hướng dẫn để xác thực email và hoàn thành
            đăng ký tài khoản trên CodeTour.
          </Text>
          <br />
          <ReloadOutlined style={{ color: '#f15a29' }} /> &nbsp;{' '}
          <Text>
            Nếu vẫn chưa nhận được email, bạn vui lòng nhấn vào{' '}
            <a className="text-underline" onClick={() => setIsResendEmailShown(true)}>
              đây
            </a>{' '}
            để được gửi lại.
          </Text>
          <Divider />
        </div>
      )}

      {/* ----- Register form ----- */}
      {isShowForm && (
        <div className={styles['form-layout']}>
          <Form
            layout="vertical"
            name="form-register"
            form={form}
            initialValues={{ isTermAgreed }}
            onFinish={submitRegister}
          >
            <Form.Item
              name="username"
              label={<Text>{TEXT_UI_AUTH.REGISTER.USERNAME}</Text>}
              className="custom-form-item-label-required"
              hasFeedback
              rules={[
                () => ({
                  validator(_, value) {
                    return ValidationUtils.textUserInfo(value)
                  },
                }),
              ]}
            >
              <Input onChange={(e) => form.setFieldsValue({ username: e.target.value })} />
            </Form.Item>
            <Form.Item
              name="email"
              label={<Text>{TEXT_UI_AUTH.REGISTER.EMAIL}</Text>}
              className="custom-form-item-label-required"
              hasFeedback
              rules={[
                () => ({
                  validator(_, value) {
                    if (!ValidationUtils.email(value))
                      return Promise.reject(new Error(TEXT_VALIDATOR.INVALID_EMAIL_FORMAT))
                    return ValidationUtils.textUserInfo(value)
                  },
                }),
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label={<Text>{TEXT_UI_AUTH.REGISTER.PASSWORD}</Text>}
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
              label={<Text>{TEXT_UI_AUTH.REGISTER.PASSWORD_CONFIRM}</Text>}
              className="custom-form-item-label-required"
              hasFeedback
              dependencies={['password']}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    return ValidationUtils.textUserInfo(value).then(() =>
                      ValidationUtils.passwordConfirm(getFieldValue('password'), value),
                    )
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="isTermAgreed"
              valuePropName="checked"
              // We will handle it by making submit button disabled
              // rules={[
              //   // when submit
              //   {
              //     required: true,
              //     message: 'Please read the terms and accept',
              //   },
              //   // when toggle
              //   () => ({
              //     validator(_, value) {
              //       if (value) {
              //         return Promise.resolve()
              //       }
              //       return Promise.reject(new Error('Please read the terms and accept'))
              //     },
              //   }),
              // ]}
            >
              <Checkbox onChange={toggleIsTermAgreed}>
                <Text>
                  Tôi đồng ý với{' '}
                  <Typography.Link href={FE_ROUTE.MISC.TOS} target="_blank" underline>
                    Điều khoản sử dụng
                  </Typography.Link>{' '}
                  của Code Tour
                </Text>
              </Checkbox>
            </Form.Item>
            <Form.Item className="ta-center">
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                disabled={!isTermAgreed}
                className={classnames({ 'ant-btn-primary-disabled': !isTermAgreed })}
              >
                <span className="typography-main">{TEXT_UI_AUTH.REGISTER.REGISTER}</span>
              </Button>
            </Form.Item>
          </Form>
          <Divider />
        </div>
      )}
    </>
  )
}
