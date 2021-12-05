import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import { Input } from 'antd'
import { CustomModal } from 'component'
import { TEXT_BUTTON, TEXT_NOTIFICATION_SUCCESS, TEXT_UI_AUTH } from 'config'
import { DisplayUtils, ErrorHandlerUtils } from 'utils'

export default function ForgotPasswordModal({ isShown, onClose, currentUserEmail, ModelService }) {
  const [modalVisible, setModalVisible] = useState(isShown)
  const [usernameEmail, setUsernameEmail] = useState(currentUserEmail)
  const [usernameEmailValidation, setUsernameEmailValidation] = useState('')
  const okButtonProps = {
    disabled: !usernameEmail,
    className: classnames({ 'ant-btn-primary-disabled': !usernameEmail }),
  }

  useEffect(() => {
    setModalVisible(isShown)
  }, [isShown])

  const closeModal = () => {
    setModalVisible(false)
    onClose()
  }

  const onOk = () => {
    if (usernameEmail) {
      ModelService.forgotPassword({ username_email: usernameEmail })
        .then(() => {
          setUsernameEmail('')
          setUsernameEmailValidation('')
          closeModal()
          DisplayUtils.showNotification(TEXT_NOTIFICATION_SUCCESS.EMAIL_SENT_SUCCESS)
        })
        .catch((error) => {
          ErrorHandlerUtils.http(error)
        })
    } else setUsernameEmailValidation('Thông tin định danh không được để trống!')
  }

  return (
    <CustomModal
      title={<span className="typography-menu">{TEXT_UI_AUTH.LOGIN.FORGOT_PASSWORD}</span>}
      visible={modalVisible}
      onCancel={closeModal}
      cancelText={TEXT_BUTTON.CANCEL}
      onOk={onOk}
      okText={TEXT_BUTTON.GET_NEW_PASSWORD}
      okButtonProps={okButtonProps}
    >
      <div className="mb-20">
        <span className="typography-menu-subtext">
          Làm theo các bước sau để thiết lập lại tài khoản
        </span>
        <div>
          <span className="typography-menu-subtext">1. Nhập tên đăng nhập hoặc email</span>
        </div>
        <div>
          <span className="typography-menu-subtext">
            2. Chờ thông tin khôi phục được gửi đến địa chỉ email đã đăng kí trên Code Tour
          </span>
        </div>
        <div>
          <span className="typography-menu-subtext">3. Làm theo hướng dẫn trong email</span>
        </div>
      </div>

      <div className="mb-30">
        <div>
          <span className="color-red">*</span>{' '}
          <span className="typography-menu-subtext">{TEXT_UI_AUTH.LOGIN.USERNAME_EMAIL}</span>
        </div>
        <Input
          type="text"
          name="username"
          value={usernameEmail}
          onChange={(e) => setUsernameEmail(e.target.value)}
          disabled={currentUserEmail}
        />
        {usernameEmailValidation ? <div className="color-red">{usernameEmailValidation}</div> : ''}
      </div>
    </CustomModal>
  )
}
