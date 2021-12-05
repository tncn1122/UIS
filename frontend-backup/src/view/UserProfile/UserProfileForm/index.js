import React, { useState, useEffect } from 'react'
import { Input, DatePicker, Form, Divider, Row, Col, Select, Space, Button } from 'antd'
import moment from 'moment'
import { MiscUtils, ErrorHandlerUtils, DisplayUtils, DateTimeUtils } from 'utils'
import { UserService } from 'service'
import { FormattedMessage } from 'react-intl'
import {
  TIME_FORMAT_BIRTH_DATE,
  TEXT_NOTIFICATION_SUCCESS,
  LOCATION,
  TEXT_UI_USER_PROFILE,
} from 'config'
import styles from './style.module.scss'

const UserProfileForm = ({
  formData,
  formEditable,
  setFormEditable,
  fetchData,
  onFinish,
  onFinishFailed,
}) => {
  // TODO select address
  const [provinceOptions, setProvinceOptions] = useState({})
  const [districtOptions, setDistrictOptions] = useState({})
  const [wardOptions, setWardOptions] = useState({})
  const [eduForm] = Form.useForm()

  useEffect(() => {
    formData.birth_date = formData.birth_date
      ? moment(formData.birth_date, TIME_FORMAT_BIRTH_DATE)
      : null
    eduForm.setFieldsValue(formData)
    // init infor in address selector
    // TODO: improve code logic
    const { province } = LOCATION[formData.country] || { province: {} }
    const { district } = province[formData.province] || { district: {} }
    const { ward } = district[formData.district] || { ward: {} }
    setProvinceOptions(province)
    setDistrictOptions(district)
    setWardOptions(ward)
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formEditable])

  const submitForm = (userInfo) => {
    const submitInfo = {
      userProfile: {
        ...userInfo,
        socials: {
          facebook: userInfo.facebook,
          linked: userInfo.linked_in,
        },
      },
    }

    UserService.putUserInfo(submitInfo)
      .then((resp) => {
        DisplayUtils.showNotification(TEXT_NOTIFICATION_SUCCESS.UPDATE_INFO_SUCCESS)
        fetchData()
        eduForm.setFieldsValue(resp)
        setFormEditable(false)
      })
      .catch((error) => {
        ErrorHandlerUtils.http(error)
      })
  }

  const createSelectOption = (menu) => {
    if (!menu) {
      return null
    }
    const options = []
    Object.keys(menu).forEach((key) => {
      const { label } = menu[key]
      options.push(
        <Select.Option className={styles.option} value={key} key={key}>
          {label}
        </Select.Option>,
      )
    })
    return options
  }

  const showUserInfo = (data) => {
    const country = LOCATION[data.country] ? LOCATION[data.country] : null
    const province = country ? country.province : null
    const district = province ? province[data.province].district : null
    const ward = district ? district[data.district].ward : null
    const birthDate = moment(data.birth_date).isValid()
      ? moment(data.birth_date).format(TIME_FORMAT_BIRTH_DATE)
      : '-'
    return (
      <div>
        <Row key={MiscUtils.generateId()} className="typography-menu-subtext">
          <Col span={8}>
            <p className="color-grey-lighter">
              {TEXT_UI_USER_PROFILE.PERSONAL_INFORMATION.FULL_NAME}
            </p>
          </Col>
          <Col span={16}>
            <p>{data.full_name ? data.full_name : '-'}</p>
          </Col>
        </Row>
        <Row key={MiscUtils.generateId()} className="typography-menu-subtext">
          <Col span={8}>
            <p className="color-grey-lighter">
              {TEXT_UI_USER_PROFILE.PERSONAL_INFORMATION.BIRTH_DATE}
            </p>
          </Col>
          <Col span={16}>{birthDate}</Col>
        </Row>
        <Row key={MiscUtils.generateId()} className="typography-menu-subtext">
          <Col span={8}>
            <p className="color-grey-lighter">{TEXT_UI_USER_PROFILE.PERSONAL_INFORMATION.PHONE}</p>
          </Col>
          <Col span={16}>
            <p>{data.phone ? data.phone : '-'}</p>
          </Col>
        </Row>
        <Row key={MiscUtils.generateId()} className="typography-menu-subtext">
          <Col span={8}>
            <p className="color-grey-lighter">{TEXT_UI_USER_PROFILE.PERSONAL_INFORMATION.EMAIL}</p>
          </Col>
          <Col span={16}>
            <p>{data.email}</p>
          </Col>
        </Row>
        <Row key={MiscUtils.generateId()} className="typography-menu-subtext">
          <Col span={8}>
            <p className="color-grey-lighter">
              {TEXT_UI_USER_PROFILE.PERSONAL_INFORMATION.COUNTRY}
            </p>
          </Col>
          <Col span={16}>
            <p>{country ? country.label : '-'}</p>
          </Col>
        </Row>
        <Row key={MiscUtils.generateId()} className="typography-menu-subtext">
          <Col span={8}>
            <p className="color-grey-lighter">
              {TEXT_UI_USER_PROFILE.PERSONAL_INFORMATION.PROVINCE}
            </p>
          </Col>
          <Col span={16}>
            <p>{province ? province[data.province].label : '-'}</p>
          </Col>
        </Row>
        <Row key={MiscUtils.generateId()} className="typography-menu-subtext">
          <Col span={8}>
            <p className="color-grey-lighter">
              {TEXT_UI_USER_PROFILE.PERSONAL_INFORMATION.DISTRICT}
            </p>
          </Col>
          <Col span={16}>
            <p>{district ? district[data.district].label : '-'}</p>
          </Col>
        </Row>
        <Row key={MiscUtils.generateId()} className="typography-menu-subtext">
          <Col span={8}>
            <p className="color-grey-lighter">{TEXT_UI_USER_PROFILE.PERSONAL_INFORMATION.WARD}</p>
          </Col>
          <Col span={16}>
            <p>{ward ? ward[data.ward].label : '-'}</p>
          </Col>
        </Row>
        <Row key={MiscUtils.generateId()} className="typography-menu-subtext">
          <Col span={8}>
            <p className="color-grey-lighter">
              {TEXT_UI_USER_PROFILE.PERSONAL_INFORMATION.ADDRESS}
            </p>
          </Col>
          <Col span={16}>
            <p>{data.address ? data.address : '-'}</p>
          </Col>
        </Row>
        <Row key={MiscUtils.generateId()} className="typography-menu-subtext">
          <Col span={8}>
            <p className="color-grey-lighter">
              {TEXT_UI_USER_PROFILE.PERSONAL_INFORMATION.FACEBOOK}
            </p>
          </Col>
          <Col span={16}>
            <p>{data.facebook}</p>
          </Col>
        </Row>
        <Row key={MiscUtils.generateId()} className="typography-menu-subtext">
          <Col span={8}>
            <p className="color-grey-lighter">
              {TEXT_UI_USER_PROFILE.PERSONAL_INFORMATION.LINKED_IN}
            </p>
          </Col>
          <Col span={16}>
            <p>{data.linked_in}</p>
          </Col>
        </Row>
      </div>
    )
  }

  return formEditable ? (
    <Form
      layout="vertical"
      onFinish={submitForm}
      onFinishFailed={onFinishFailed}
      form={eduForm}
      initialValues={formData}
    >
      <Form.Item
        className={styles['form-item']}
        name="full_name"
        label={TEXT_UI_USER_PROFILE.PERSONAL_INFORMATION.FULL_NAME}
        key="full_name"
        rules={[{ required: true }]}
      >
        <Input className={styles.input} />
      </Form.Item>
      <Form.Item
        className={styles['form-item']}
        name="birth_date"
        label={TEXT_UI_USER_PROFILE.PERSONAL_INFORMATION.BIRTH_DATE}
        key="birth_date"
        rules={[{ required: true }]}
      >
        <DatePicker
          picker="year"
          className={styles['date-picker']}
          format={TIME_FORMAT_BIRTH_DATE}
          defaultPickerValue={moment()}
        />
      </Form.Item>
      <Form.Item
        className={styles['form-item']}
        name="phone"
        label={TEXT_UI_USER_PROFILE.PERSONAL_INFORMATION.PHONE}
        key="phone"
        rules={[{ required: true }]}
      >
        <Input className={styles.input} />
      </Form.Item>
      <Form.Item
        className={styles['form-item']}
        name="email"
        label={TEXT_UI_USER_PROFILE.PERSONAL_INFORMATION.EMAIL}
        key="email"
        rules={[{ required: true }]}
      >
        <Input className={styles.input} disabled />
      </Form.Item>
      <Form.Item
        className={styles['form-item']}
        name="country"
        label={TEXT_UI_USER_PROFILE.PERSONAL_INFORMATION.COUNTRY}
        key="country"
        rules={[{ required: true }]}
      >
        <Select
          className={styles.select}
          size="large"
          onChange={(e) => {
            setProvinceOptions(LOCATION[e].province)
          }}
        >
          {createSelectOption(LOCATION)}
        </Select>
      </Form.Item>
      <Form.Item
        className={styles['form-item']}
        name="province"
        label={TEXT_UI_USER_PROFILE.PERSONAL_INFORMATION.PROVINCE}
        key="province"
        rules={[{ required: true }]}
      >
        <Select
          className={styles.select}
          size="large"
          onChange={(e) => {
            setDistrictOptions(provinceOptions[e].district)
          }}
        >
          {createSelectOption(provinceOptions)}
        </Select>
      </Form.Item>
      <Form.Item
        className={styles['form-item']}
        name="district"
        label={TEXT_UI_USER_PROFILE.PERSONAL_INFORMATION.DISTRICT}
        key="district"
        rules={[{ required: true }]}
      >
        <Select
          className={styles.select}
          size="large"
          onChange={(e) => {
            setWardOptions(districtOptions[e].ward)
          }}
        >
          {createSelectOption(districtOptions)}
        </Select>
      </Form.Item>
      <Form.Item
        className={styles['form-item']}
        name="ward"
        label={TEXT_UI_USER_PROFILE.PERSONAL_INFORMATION.WARD}
        key="ward"
        rules={[{ required: true }]}
      >
        <Select className={styles.select} size="large">
          {createSelectOption(wardOptions)}
        </Select>
      </Form.Item>
      <Form.Item
        className={styles['form-item']}
        name="address"
        label={TEXT_UI_USER_PROFILE.PERSONAL_INFORMATION.ADDRESS}
        key="address"
        rules={[{ required: true }]}
      >
        <Input className={styles.input} />
      </Form.Item>
      <Form.Item
        className={styles['form-item']}
        name="facebook"
        label={TEXT_UI_USER_PROFILE.PERSONAL_INFORMATION.FACEBOOK}
        key="facebook"
      >
        <Input className={styles.input} />
      </Form.Item>
      <Form.Item
        className={styles['form-item']}
        name="linked_in"
        label={TEXT_UI_USER_PROFILE.PERSONAL_INFORMATION.LINKED_IN}
        key="linked_in"
      >
        <Input className={styles.input} />
      </Form.Item>

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
    showUserInfo(formData)
  )
}

export default UserProfileForm
