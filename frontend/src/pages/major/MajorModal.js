import React, { useEffect, useState } from 'react'
import { Form, Input, Modal, notification, Select } from 'antd'
import { ALPHANUMBERIC_VALIDATE, ID_VALIDATE } from '../../value/validate'
import { HttpUtils, URLUtils } from '../../utils'
import ErrorHandler from '../../utils/Error'

const { Option } = Select;

const MajorModal = (props) => {
  const { currentData, modalType, fetchData, listDepartment } = props
  const { visible, onCancel } = props
  const [form] = Form.useForm()

  useEffect(() => {
    if (modalType === 'edit') {
      form.setFieldsValue({
        majorId: currentData.majorId,
        name: currentData.name,
        departmentId: currentData.departmentId
      })
    }
  }, [visible])

  const onSubmit = value => {
    if (modalType === 'edit') {
      editMajor(value)
    }
    else {
      createNewMajor(value)
    }
    onCancel()
  }

  const createNewMajor = (value) => {
    HttpUtils.post(URLUtils.buildBeURL('/majors'), value)
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

  const editMajor = (value) => {
    HttpUtils.put(URLUtils.buildBeURL(`/majors/${currentData.majorId}`), value)
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
        title={modalType === 'edit' ? "Chỉnh sửa Chuyên Ngành" : "Tạo Chuyên Ngành mới"}
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
              form.resetFields()
              onSubmit(value)
            })
            .catch(info => {
              console.log('Validate Failed:', info)
            })
        }}
        forceRender
      >
        <Form form={form} layout="vertical" name="major-form">
          <Form.Item
            label="Mã Chuyên Ngành"
            name="majorId"
            rules={ID_VALIDATE}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tên Chuyên Ngành"
            name="name"
            rules={ALPHANUMBERIC_VALIDATE}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Khoa Đào Tạo"
            name="departmentId"
            rules={[{
              required: true,
              message: 'Vui lòng chọn khoa đào tạo.',
            }]}
          >
            <Select
              placeholder="Chọn khoa đào tạo"
            >
              {listDepartment.map(item => (
                <Option value={item.departmentId}>{item.name}</Option>
              ))}

            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>

  )
}

export default MajorModal