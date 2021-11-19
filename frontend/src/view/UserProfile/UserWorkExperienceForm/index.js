import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Input, DatePicker, Form, Row, Col, Space, Button, Checkbox } from 'antd'
import moment from 'moment'
import { FormattedMessage } from 'react-intl'
import { MiscUtils, ErrorHandlerUtils, DisplayUtils, DateTimeUtils } from 'utils'
import { TIME_FORMAT_DATE_ONLY, TEXT_NOTIFICATION_SUCCESS, TEXT_UI_USER_PROFILE } from 'config'
import { UserService } from 'service'
import styles from './style.module.scss'

const UserWorkExperienceForm = (props) => {
  const { formData, formEditable, setFormEditable, fetchData } = props
  const { onFinish, onFinishFailed } = props
  const [isCurrentJob, setIsCurrentJob] = useState(false)
  const [workForm] = Form.useForm()

  useEffect(() => {
    formData.time_begin = formData.time_begin ? moment(formData.time_begin) : null
    formData.time_end = formData.time_end ? moment(formData.time_end) : null
    workForm.setFieldsValue(formData)
    setIsCurrentJob(formData.at_current)
    // eslint-disable-next-line
  }, [formEditable])

  const submitForm = (userInfo) => {
    const submitInfo = {
      userWorkExperience: {
        ...userInfo,
      },
    }
    UserService.putUserInfo(submitInfo)
      .then((resp) => {
        DisplayUtils.showNotification(TEXT_NOTIFICATION_SUCCESS.UPDATE_INFO_SUCCESS)
        setFormEditable(false)
        fetchData()
      })
      .catch((error) => {
        ErrorHandlerUtils.http(error)
      })
  }

  const showWorkExperienceInfo = (data) => {
    const workTime = data.at_current
      ? `${moment(data.time_begin).format(TIME_FORMAT_DATE_ONLY)} - ${TEXT_UI_USER_PROFILE.NOW}`
      : data.work_time
    return (
      <div>
        <Row key={MiscUtils.generateId()} className="typography-menu-subtext">
          <Col span={8}>
            <p className="color-grey-lighter">{TEXT_UI_USER_PROFILE.WORK_EXPERIENCE.WORK_TITLE}</p>
          </Col>
          <Col span={16}>
            <p>{data.title || '-'}</p>
          </Col>
        </Row>
        <Row key={MiscUtils.generateId()} className="typography-menu-subtext">
          <Col span={8}>
            <p className="color-grey-lighter">{TEXT_UI_USER_PROFILE.WORK_EXPERIENCE.COMPANY}</p>
          </Col>
          <Col span={16}>
            <p>{data.company || '-'}</p>
          </Col>
        </Row>
        <Row key={MiscUtils.generateId()} className="typography-menu-subtext">
          <Col span={8}>
            <p className="color-grey-lighter">{TEXT_UI_USER_PROFILE.WORK_EXPERIENCE.WORK_TIME}</p>
          </Col>
          <Col span={16}>
            <p>{workTime || '-'}</p>
          </Col>
        </Row>
      </div>
    )
  }

  // TODO: add time validation
  return formEditable ? (
    <Form
      layout="vertical"
      name="userWorkExperience"
      onFinish={submitForm}
      onFinishFailed={onFinishFailed}
      form={workForm}
      initialValues={formData}
    >
      <Form.Item
        className={styles['form-item']}
        name="title"
        label={TEXT_UI_USER_PROFILE.WORK_EXPERIENCE.WORK_TITLE}
        key="title"
        rules={[{ required: true }]}
      >
        <Input className={styles.input} />
      </Form.Item>
      <Form.Item
        className={styles['form-item']}
        name="company"
        label={TEXT_UI_USER_PROFILE.WORK_EXPERIENCE.COMPANY}
        key="company"
        rules={[{ required: true }]}
      >
        <Input className={styles.input} />
      </Form.Item>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            className={styles['form-item']}
            name="time_begin"
            label={TEXT_UI_USER_PROFILE.FROM}
            key="time_begin"
            rules={[{ required: true }]}
          >
            <DatePicker
              format={TIME_FORMAT_DATE_ONLY}
              className={styles['date-picker']}
              defaultPickerValue={moment()}
              key={MiscUtils.generateId()}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            className={styles['form-item']}
            name="time_end"
            label={TEXT_UI_USER_PROFILE.TO}
            key="time_end"
            rules={[{ required: true }]}
          >
            <DatePicker
              disabled={isCurrentJob}
              format={TIME_FORMAT_DATE_ONLY}
              className={styles['date-picker']}
              defaultPickerValue={moment()}
              key={MiscUtils.generateId()}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Form.Item
          className={styles['form-item']}
          name="at_current"
          key="at_current"
          valuePropName="checked"
        >
          <Checkbox
            className={styles.input}
            onChange={(value) => {
              workForm.setFields([{ name: 'time_end', value: moment() }])
              setIsCurrentJob(value.target.checked)
            }}
          >
            {TEXT_UI_USER_PROFILE.WORK_EXPERIENCE.CURRENT_JOB}
          </Checkbox>
        </Form.Item>
      </Row>
      {formEditable && (
        <Row justify="end">
          <Form.Item style={{ marginBottom: '0px' }}>
            <Space>
              <Button
                type="cancel"
                onClick={() => {
                  setFormEditable(false)
                }}
              >
                <FormattedMessage id="button.cancel" />
              </Button>
              <Button type="primary" htmlType="submit">
                <FormattedMessage id="button.save" />
              </Button>
            </Space>
          </Form.Item>
        </Row>
      )}
    </Form>
  ) : (
    showWorkExperienceInfo(formData)
  )
}

export default UserWorkExperienceForm
