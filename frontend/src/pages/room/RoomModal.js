import React, { useEffect, useState } from 'react'
import { Form, Input, Modal, notification } from 'antd'
import { ALPHANUMBERIC_VALIDATE, ID_VALIDATE, NUMBER_VALIDATE } from '../../value/validate'
import { HttpUtils, URLUtils } from '../../utils'
import ErrorHandler from '../../utils/Error'



const RoomModal = (props) => {
  const { roomId, slots, modalType, fetchData } = props
  const { visible, onCancel } = props
  const [form] = Form.useForm()

  useEffect(() => {
    if (modalType === 'edit') {
      form.setFieldsValue({
        roomId,
        slots
      })
    }
  }, [visible])

  const onSubmit = value => {
    if (modalType === 'edit') {
      editRoom(value)
    }
    else {
      createNewRoom(value)
    }
    onCancel()
  }

  const createNewRoom = (value) => {
    HttpUtils.post(URLUtils.buildBeURL('/rooms'), value)
      .then(resp => {
        notification.success({
          message: 'Tạo mới thành công',
          placement: 'bottomRight'
        })
        fetchData()
      })
      .catch(err => {
        ErrorHandler.handle(err)
      })
  }

  const editRoom = (value) => {
    HttpUtils.put(URLUtils.buildBeURL(`/rooms/${roomId}`), value)
      .then(resp => {
        notification.success({
          message: 'Chỉnh sửa thành công',
          placement: 'bottomRight'
        })
        fetchData()
      })
      .catch(err => {
        ErrorHandler.handle(err)
      })
  }


  return (
    <>
      <Modal
        visible={visible}
        title={modalType === 'edit' ? "Chỉnh sửa Khoa" : "Tạo Khoa mới"}
        okText="OK"
        cancelText="Hủy"
        onCancel={() => {
          form.resetFields()
          onCancel()
        }}
        onOk={() => {
          form
            .validateFields()
            .then(value => {
              onSubmit(value)
              form.resetFields()
            })
            .catch(info => {
              console.log('Validate Failed:', info)
            })
        }}
        forceRender
      >
        <Form form={form} layout="vertical" name="room-form">
          <Form.Item
            label="Mã Phòng"
            name="roomId"
            rules={ID_VALIDATE}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số Lượng Chỗ Ngồi"
            name="slots"
            rules={NUMBER_VALIDATE}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>

  )
}

export default RoomModal