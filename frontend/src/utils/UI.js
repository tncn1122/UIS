import { Tag } from 'antd';
import { ENUM_ROLE, ROLLCALL_STATUS, STATUS } from '../value/model';
import { FULL_DATE_FORMAT } from '../value/time';
const moment = require('moment-timezone');



export default class UI {
  static renderStatusTag = (status, text) => {
    let tagColor = 'blue'
    if(status === STATUS.ACTIVE || status === ROLLCALL_STATUS.ONTIME){
      tagColor = 'green'
    }
  
    if(status === STATUS.DELETED || status === ROLLCALL_STATUS.ABSENT){
      tagColor = 'red'
    }

    if(status === ROLLCALL_STATUS.LATE){
      tagColor = 'orange'
    }
  
  
    return (
      <Tag color={tagColor}>{text ? text : status}</Tag>
    )
  }

  static formatDate = (stringDate, formatForm = FULL_DATE_FORMAT) => {
    if(!stringDate){
      return '-'
    }

    return moment(stringDate).format(formatForm);

  }

  static filterData = (data, filter) => {
    return data.filter((item) => {
      for(const [key, value] of Object.entries(filter)){
        if(value){
          if(!value.includes(item[key])){
            return false
          }
        }
      }
      return true
    })
  }

  static renderRole = (role) => {
    let renderedRole = ''
    if(role === ENUM_ROLE[0]){
      renderedRole = 'Quản Trị Viên'
    }
    if(role === ENUM_ROLE[1]){
      return 'Sinh Viên'
    }
    if(role === ENUM_ROLE[2]){
      return 'Giảng Viên'
    }

    return renderedRole
  }
}

