import React, { useEffect, useState } from 'react'
import { Form, Input, Modal, notification } from 'antd'
import { ALPHANUMBERIC_VALIDATE, ID_VALIDATE } from '../../value/validate'
import { HttpUtils, URLUtils } from '../../utils'
import ErrorHandler from '../../utils/Error'



const DepartmentModal = (props) => {
  const { departmentId, name, modalType, fetchData } = props
  const { visible, onCancel } = props
  const [form] = Form.useForm()

  useEffect(() => {
    if (modalType === 'edit') {
      console.log(departmentId, name);
      form.setFieldsValue({
        departmentId,
        name
      })
    }
  }, [visible])

  const onSubmit = value => {
    if (modalType === 'edit') {
      editDepartment(value)
    }
    else {
      createNewDepartment(value)
    }
    onCancel()
  }

  const createNewDepartment = (value) => {
    HttpUtils.post(URLUtils.buildBeURL('/departments'), value)
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

  const editDepartment = (value) => {
    HttpUtils.put(URLUtils.buildBeURL(`/departments/${departmentId}`), value)
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
        title={modalType === 'edit' ? "Chỉnh sửa Sinh Viên" : "Tạo Sinh Viên mới"}
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
        <Form form={form} layout="vertical" name="department-form">
          <Form.Item
            label="Mã Sinh Viên"
            name="departmentId"
            rules={ID_VALIDATE}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tên Khoa"
            name="name"
            rules={ALPHANUMBERIC_VALIDATE}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>

  )
}

export default DepartmentModal