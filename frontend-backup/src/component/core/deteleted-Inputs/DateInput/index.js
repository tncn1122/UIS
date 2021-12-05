import React, { useState } from 'react'
import { DatePicker } from 'antd'
import PropTypes from 'prop-types'
import styles from './style.module.scss'

export default function TextInput(props) {
  const { label, validationMsg, onChange, value, required, defaultValue, disabled } = props

  return (
    <div className={styles['text-input']}>
      <div className={styles.label}>
        {label}
        {required ? <span className={styles.star}> *</span> : ''}
      </div>
      <DatePicker
        className={styles.input}
        defaultValue={defaultValue}
        onChange={onChange}
        value={value}
        disabled={disabled}
      />
      {validationMsg ? <div className={styles.validation}>{validationMsg}</div> : ''}
    </div>
  )
}

TextInput.defaultProps = {
  onChange: () => {},
  defaultValue: '',
  validationMsg: '',
  disabled: false,
  required: false,
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  validationMsg: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
}
