import React, { useEffect, useState } from 'react'

import { Modal, Input } from 'antd'
import PropTypes from 'prop-types'

export default function ChangeUsername({ onClose, onFinish }) {
  const maxChangeNum = 3
  const curChangeNum = 0

  const [modalVisible, setModalVisible] = useState(true)
  const [username, setUsername] = useState('')
  const [usernameValidation, setUsernameValidation] = useState('')
  const [usernameTouched, setUsernameTouched] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordValidation, setPasswordValidation] = useState('')
  const [pwdTouched, setPwdTouched] = useState('')
  const btnDisabled = !usernameTouched || !pwdTouched || usernameValidation || passwordValidation

  useEffect(() => {
    if (username) setUsernameValidation('')
    else setUsernameValidation('Tên người dùng không được để tróng!')
    if (password) setPasswordValidation('')
    else setPasswordValidation('Mật khẩu không được để tróng!')
  }, [username, password])

  function closeModal() {
    setModalVisible(false)
    onClose()
  }

  function onOk() {
    setModalVisible(false)
    onFinish(username)
  }

  return (
    <div>
      <Modal
        title={
          <div className="modal__header">
            <span className="modal__title">Đổi tên người dùng</span>
          </div>
        }
        maskClosable={false}
        onCancel={closeModal}
        visible={modalVisible}
        onOk={onOk}
        okButtonProps={{ disabled: btnDisabled }}
        okText="Xác nhận"
        className="h4"
      >
        <div className="mb-20">
          Sau khi nhập tên người dùng, tên hiện thị của bạn trên hệ thống sẽ được đổi thành tên mới,
          số lần còn lại
          <span className="color-red">
            {' '}
            {maxChangeNum - curChangeNum}/{maxChangeNum}
          </span>
        </div>

        <div className="mb-30">
          <div>
            Tên người dùng <span className="color-red">*</span>
          </div>
          <Input
            type="text"
            name="username"
            value={username}
            onFocus={() => setUsernameTouched(true)}
            onChange={(e) => setUsername(e.target.value)}
          />
          {usernameTouched && usernameValidation ? (
            <div className="color-red">{usernameValidation}</div>
          ) : (
            ''
          )}
        </div>

        <div className="mg-10">
          <div>
            Xác nhận mật khẩu <span className="color-red">*</span>
          </div>
          <Input
            type="text"
            name="password"
            value={password}
            onFocus={() => setPwdTouched(true)}
            onChange={(e) => setPassword(e.target.value)}
          />
          {pwdTouched && passwordValidation ? (
            <div className="color-red">{passwordValidation}</div>
          ) : (
            ''
          )}
        </div>

        <div className="float-right">
          <a href="/user/forgot-pwd" target="_blank">
            Quên mật khẩu
          </a>
        </div>
        <br />
      </Modal>
    </div>
  )
}

ChangeUsername.propTypes = {
  onClose: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
}
