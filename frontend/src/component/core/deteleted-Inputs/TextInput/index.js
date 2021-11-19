import React, { useState } from 'react'
import { Input } from 'antd'
import PropTypes from 'prop-types'
import styles from './style.module.scss'

export default function TextInput(props) {
  const { label, validationMsg, onChange, value, required, addonAfter, defaultValue, disabled } =
    props
  return (
    <div className={styles['text-input']}>
      <div className={styles.label}>
        {label}
        {required ? <span className={styles.star}> *</span> : ''}
      </div>
      <Input
        className={styles.input}
        addonAfter={addonAfter}
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
  addonAfter: null,
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
  addonAfter: PropTypes.element,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
}
