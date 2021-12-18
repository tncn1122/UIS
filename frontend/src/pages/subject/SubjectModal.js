import React, { useEffect, useState } from 'react'
import { Button, Col, DatePicker, Divider, Form, Input, Modal, notification, Row, Select, Space, Tooltip } from 'antd'
import { ALPHANUMBERIC_VALIDATE, ID_VALIDATE, MAIL_VALIDATE, NUMBER_VALIDATE } from '../../value/validate'
import { HttpUtils, URLUtils } from '../../utils'
import ErrorHandler from '../../utils/Error'
import { SafetyOutlined } from '@ant-design/icons'
import { ENUM_ROLE } from '../../value/model'
import moment from 'moment'

const { Option } = Select

const SubjectModal = (props) => {
  const { subjectInfo, modalType, fetchData, listRooms } = props
  const { visible, onCancel } = props
  const [form] = Form.useForm()
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    if (modalType === 'edit') {
      form.setFieldsValue({
        subjectId: subjectInfo.subjectId,
        firstName: subjectInfo.firstName,
        lastName: subjectInfo.lastName,
        email: subjectInfo.email,
        password: 'disabled',
        role: subjectInfo.role,
        majorId: subjectInfo.majorId.majorId,
        birthDate: moment(subjectInfo.birthDate),
        birthplace: subjectInfo.birthplace,
        phone: subjectInfo.phone,
        sex: subjectInfo.sex,
        idNo: subjectInfo.idNo,
        address: subjectInfo.address,
      })
    }
  }, [visible])

  const onSubmit = value => {
    value.startDate = value.startDate.format()
    if (modalType === 'edit') {
      editSubject(value)
    }
    else {
      createNewSubject(value)
    }
    onCancel()
  }

  const createNewSubject = (value) => {
    HttpUtils.post(URLUtils.buildBeURL('/subjects'), value)
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

  const editSubject = (value) => {
    HttpUtils.put(URLUtils.buildBeURL(`/subjects/${subjectInfo.subjectId}`), value)
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


  return (
    <>
      <Modal
        visible={visible}
        title={modalType === 'edit' ? "Chỉnh sửa Môn Học" : "Tạo Môn Học mới"}
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
        <Form form={form} layout="vertical" name="subject-form" onValuesChange={(_, values) => setFormValues(values)}>
          <Row gutter={[40, 10]}>
            <Col span={12}>
              <Form.Item
                label="Mã Môn Học"
                name="subjectId"
                rules={ID_VALIDATE}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Phòng"
                name="roomId"
                rules={[{
                  required: true,
                  message: 'Vui lòng chọn phòng.',
                }]}
              >
                <Select
                  placeholder="Chọn phòng học"
                  size='large'
                  style={{
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                >
                  {listRooms.map(item => (
                    <Option value={item.roomId}>{`${item.roomId} - ${item.slots} chỗ`}</Option>
                  ))}

                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Tên Môn Học"
                name="name"
                rules={ALPHANUMBERIC_VALIDATE}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Học Kì"
                name="semester"
                rules={ALPHANUMBERIC_VALIDATE}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Số Tín Chỉ"
                name="credits"
                rules={NUMBER_VALIDATE}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Số Ngày Học"
                name="days"
                rules={MAIL_VALIDATE}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Buổi Học"
                name="shift"
                rules={[{
                  required: true,
                  message: 'Vui lòng chọn buổi học.',
                }]}
                style={{
                  borderRadius: '6px',
                }}
              >
                <Select
                  size='large'
                  placeholder="Chọn buổi học"
                  style={{
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                >
                  <Option value={0}>Sáng</Option>
                  <Option value={1}>Chiều</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Ngày Học Trong Tuần"
                name="dayOfWeek"
                rules={[{
                  required: true,
                  message: 'Vui lòng chọn ngày học.',
                }]}
                style={{
                  borderRadius: '6px',
                }}
              >
                <Select
                  size='large'
                  placeholder="Chọn ngày học"
                  style={{
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                >
                  <Option key={"2"} value={'2'}>Thứ hai</Option>
                  <Option key={"3"} value={'3'}>Thứ ba</Option>
                  <Option key={"4"} value={'4'}>Thứ tư</Option>
                  <Option key={"5"} value={'5'}>Thứ năm</Option>
                  <Option key={"6"} value={'6'}>Thứ sáu</Option>
                  <Option key={"7"} value={'7'}>Thứ bảy</Option>

                </Select>
              </Form.Item>
            </Col>


            <Col span={12}>
              <Form.Item
                label="Ngày Bắt Đầu"
                name="startDate"
                rules={[{
                  required: true,
                  message: 'Vui lòng chọn ngày bắt đầu môn học.',
                }]}
              >
                <DatePicker size='large' placeholder={'Chọn ngày bắt đầu'} style={{ width: '100%', borderRadius: '6px' }} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Divider>
                Tỉ Lệ Điểm Thành Phần
              </Divider>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Điểm Chuyên Cần"
                name="percentDiligence"
                rules={NUMBER_VALIDATE}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Điểm Kiểm Tra"
                name="percentTest"
                rules={NUMBER_VALIDATE}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Điểm Thực Hành"
                name="percentPractice"
                rules={NUMBER_VALIDATE}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Điểm Tiểu Luận"
                name="percentSerminar"
                rules={NUMBER_VALIDATE}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Điểm Thi"
                name="percentExam"
                rules={NUMBER_VALIDATE}
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

export default SubjectModal