import React, { useEffect, useState } from 'react'
import { Button, Col, DatePicker, Form, Input, Modal, notification, Row, Select, Space, Tooltip } from 'antd'
import { ALPHANUMBERIC_VALIDATE, ID_VALIDATE, MAIL_VALIDATE, NUMBER_VALIDATE } from '../../value/validate'
import { HttpUtils, URLUtils } from '../../utils'
import ErrorHandler from '../../utils/Error'
import { SafetyOutlined } from '@ant-design/icons'
import { ENUM_ROLE } from '../../value/model'
import moment from 'moment'

const { Option } = Select

const StudentModal = (props) => {
  const { userInfo, modalType, fetchData, listMajors } = props
  const { visible, onCancel } = props
  const [form] = Form.useForm()
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    if (modalType === 'edit') {
      form.setFieldsValue({
        userId: userInfo.userId,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        password: 'disabled',
        role: userInfo.role,
        majorId: userInfo.majorId.majorId,
        birthDate: moment(userInfo.birthDate),
        birthplace: userInfo.birthplace,
        phone: userInfo.phone,
        sex: userInfo.sex,
        idNo: userInfo.idNo,
        address: userInfo.address,
      })
    }
  }, [visible])

  const onSubmit = value => {
    value.birthDate = value.birthDate.format()
    value.role = ENUM_ROLE[0] // student
    if (modalType === 'edit') {
      editStudent(value)
    }
    else {
      createNewStudent(value)
    }
    onCancel()
  }

  const createNewStudent = (value) => {
    HttpUtils.post(URLUtils.buildBeURL('/users'), value)
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

  const editStudent = (value) => {
    HttpUtils.put(URLUtils.buildBeURL(`/users/${userInfo.userId}`), value)
      .then(resp => {
        console.log(resp);
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

  const generatePassword = () => {
    const userId = formValues.userId
    form.setFieldsValue({
      password: userId
    })
  }

  return (
    <>
      <Modal
        visible={visible}
        title={modalType === 'edit' ? "Chỉnh sửa Sinh Viên" : "Tạo Sinh Viên mới"}
        okText="OK"
        width={1000}
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
              // form.resetFields()
            })
            .catch(info => {
              console.log('Validate Failed:', info)
            })
        }}
        forceRender
      >
        <Form form={form} layout="vertical" name="student-form" onValuesChange={(_, values) => setFormValues(values)}>
          <Row gutter={[40, 10]}>
            <Col span={12}>
              <Form.Item
                label="Mã Sinh Viên"
                name="userId"
                rules={ID_VALIDATE}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Row gutter={[10, 20]}>
                <Col span={21}>
                  <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={ALPHANUMBERIC_VALIDATE}

                  >
                    <Input.Password
                      style={{
                        padding: '0px 11px',
                        borderRadius: '6px',
                      }}
                      disabled={modalType === 'edit'}
                    />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Tooltip placement="bottom" title={'Sinh mật khẩu dựa trên mã sinh viên.'}>
                    <Button
                      style={{
                        marginTop: '30px',
                        padding: '0px 0px',
                        fontSize: '20px',
                        boxShadow: 'none',
                        borderRadius: '6px',
                        width: '50px',
                        height: '42px'
                      }}
                      icon={<SafetyOutlined style={{ fontSize: '20px' }} />}
                      disabled={modalType === 'edit'}
                      onClick={generatePassword}
                    />
                  </Tooltip>
                </Col>
              </Row>

            </Col>

            <Col span={12}>
              <Form.Item
                label="Họ Sinh Viên"
                name="lastName"
                rules={ALPHANUMBERIC_VALIDATE}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Tên Sinh Viên"
                name="firstName"
                rules={ALPHANUMBERIC_VALIDATE}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Số Điện Thoại"
                name="phone"
                rules={NUMBER_VALIDATE}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Giới Tính"
                name="sex"
                rules={[{
                  required: true,
                  message: 'Vui lòng chọn giới tính.',
                }]}
                style={{
                  borderRadius: '6px',
                }}
              >
                <Select
                  size='large'
                  placeholder="Chọn giới tính"
                  style={{
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                >
                  <Option value={0}>Nam</Option>
                  <Option value={1}>Nữ</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={MAIL_VALIDATE}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Chuyên Ngành"
                name="majorId"
                rules={[{
                  required: true,
                  message: 'Vui lòng chọn chuyên ngành.',
                }]}
              >
                <Select
                  placeholder="Chọn chuyên ngành đào tạo"
                  size='large'
                  style={{
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                >
                  {listMajors.map(item => (
                    <Option value={item.majorId}>{item.name}</Option>
                  ))}

                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Ngày Sinh"
                name="birthDate"
                rules={[{
                  required: true,
                  message: 'Vui lòng chọn ngày sinh.',
                }]}
              >
                <DatePicker size='large' placeholder={'Chọn ngày sinh'} style={{ width: '100%', borderRadius: '6px' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Nơi Sinh"
                name="birthplace"
                rules={ALPHANUMBERIC_VALIDATE}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Chứng Minh Thư"
                name="idNo"
                rules={NUMBER_VALIDATE}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Địa Chỉ"
                name="address"
                rules={ALPHANUMBERIC_VALIDATE}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>

  )
}

export default StudentModal