import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Input, DatePicker, Form, Row, Col, Select, Space, Button, Checkbox } from 'antd'
import CustomButton from 'component/CustomButton'
import moment from 'moment'
import { MiscUtils, ErrorHandlerUtils, DisplayUtils, DateTimeUtils } from 'utils'
import { UserService } from 'service'
import { FormattedMessage } from 'react-intl'
import {
  TIME_FORMAT_DATE_ONLY,
  TEXT_NOTIFICATION_SUCCESS,
  UNIVERSITY,
  TEXT_UI_USER_PROFILE,
} from 'config'
import styles from './style.module.scss'

const UserEducationForm = (props) => {
  const { formData, formEditable, setFormEditable, fetchData } = props
  const { onFinish, onFinishFailed } = props
  const [isCurrentSchool, setIsCurrentSchool] = useState(false)
  const [eduForm] = Form.useForm()

  useEffect(() => {
    formData.time_begin = formData.time_begin ? moment(formData.time_begin) : null
    formData.time_end = formData.time_end ? moment(formData.time_end) : null
    eduForm.setFieldsValue(formData)

    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formEditable])

  const layout = {
    layout: 'vertical',
  }

  const submitForm = (userInfo) => {
    const submitInfo = {
      userEducation: {
        ...userInfo,
      },
    }

    UserService.putUserInfo(submitInfo)
      .then((resp) => {
        const data = {
          ...resp,
        }
        DisplayUtils.showNotification(TEXT_NOTIFICATION_SUCCESS.UPDATE_INFO_SUCCESS)
        setFormEditable(false)
        fetchData()
      })
      .catch((error) => {
        ErrorHandlerUtils.http(error)
      })
  }

  const createSelectOption = () => {
    const options = []
    Object.keys(UNIVERSITY).forEach((key) => {
      const label = UNIVERSITY[key]
      options.push(
        <Select.Option className={styles.option} value={key} key={key}>
          {label}
        </Select.Option>,
      )
    })
    return options
  }

  const showEducationInfo = (data) => {
    const studyTime = data.at_current
      ? `${moment(data.time_begin).format(TIME_FORMAT_DATE_ONLY)} - ${TEXT_UI_USER_PROFILE.NOW}`
      : data.study_time
    const schoolName = UNIVERSITY[data.school] ? UNIVERSITY[data.school] : data.school
    return (
      <div>
        <Row key={MiscUtils.generateId()} className="typography-menu-subtext">
          <Col span={8}>
            <p className="color-grey-lighter">{TEXT_UI_USER_PROFILE.EDUCATION.SCHOOL}</p>
          </Col>
          <Col span={16}>
            <p>{schoolName || '-'}</p>
          </Col>
        </Row>
        <Row key={MiscUtils.generateId()} className="typography-menu-subtext">
          <Col span={8}>
            <p className="color-grey-lighter">{TEXT_UI_USER_PROFILE.EDUCATION.MAJOR}</p>
          </Col>
          <Col span={16}>
            <p>{data.major || '-'}</p>
          </Col>
        </Row>
        <Row key={MiscUtils.generateId()} className="typography-menu-subtext">
          <Col span={8}>
            <p className="color-grey-lighter">{TEXT_UI_USER_PROFILE.EDUCATION.STUDY_TIME}</p>
          </Col>
          <Col span={16}>
            <p>{studyTime || '-'}</p>
          </Col>
        </Row>
      </div>
    )
  }

  return formEditable ? (
    <Form
      layout="vertical"
      name="userEducation"
      onFinish={submitForm}
      onFinishFailed={onFinishFailed}
      form={eduForm}
      initialValues={formData}
    >
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            className={styles['form-item']}
            name="school"
            label={TEXT_UI_USER_PROFILE.EDUCATION.SCHOOL}
            key="school"
            rules={[{ required: true }]}
          >
            <Select className={styles.select} size="large" onChange={(e) => {}}>
              {createSelectOption()}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            className={styles['form-item']}
            name="anotherSchoolName"
            label="Khác"
            key="tanotherSchoolName"
          >
            <Input className={styles.input} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        className={styles['form-item']}
        name="major"
        label={TEXT_UI_USER_PROFILE.EDUCATION.MAJOR}
        key="major"
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
              disabled={isCurrentSchool}
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
              eduForm.setFields([{ name: 'time_end', value: moment() }])
              setIsCurrentSchool(value.target.checked)
            }}
          >
            {TEXT_UI_USER_PROFILE.EDUCATION.CURRENT_SCHOOL}
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
    showEducationInfo(formData)
  )
}

export default UserEducationForm
