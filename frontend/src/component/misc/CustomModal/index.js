import React from 'react'
import { Modal, Typography } from 'antd'
import topRight from 'asset/img/modal/top-right.png'
import bottomLeft from 'asset/img/modal/bottom-left.png'
import styles from './style.module.scss'

const { Title } = Typography

export default function CustomModal({
  onOk,
  onCancel,
  okText,
  cancelText,
  okButtonProps,
  title,
  visible,
  disableClosable,
  children,
  width,
  footer,
}) {
  return (
    <Modal
      title={<Title level={4}>{title}</Title>}
      visible={visible}
      maskClosable={!disableClosable}
      className={styles['modal-view']}
      onCancel={onCancel}
      cancelText={cancelText}
      cancelButtonProps={{ className: 'ant-btn-cancel' }}
      onOk={onOk}
      okType="primary"
      okText={okText}
      okButtonProps={okButtonProps}
      width={width}
      footer={footer}
    >
      <img src={topRight} alt="top-right" className={styles['img-top-right']} />
      <img src={bottomLeft} alt="bottom-left" className={styles['img-bottom-left']} />
      <div className={styles.content}>{children}</div>
    </Modal>
  )
}
