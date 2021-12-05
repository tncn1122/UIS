import React, { useState } from 'react'
import { Modal } from 'antd'
import { CloseCircleFilled } from '@ant-design/icons'
import styles from './style.module.scss'

const CustomModal = (props) => {
  const { userData } = props
  const {
    children,
    contentList,
    isModalVisible,
    setIsModalVisible,
    title,
    footer,
    width,
    wrapClassName,
  } = props

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <Modal
      title={title}
      footer={footer}
      visible={isModalVisible}
      width={width}
      wrapClassName={wrapClassName}
      onOk={handleOk}
      onCancel={handleCancel}
      closeIcon={<CloseCircleFilled className={styles['close-icon']} />}
    >
      {children || contentList[currentTab] || 'Empty Content'}
    </Modal>
  )
}

export default CustomModal
