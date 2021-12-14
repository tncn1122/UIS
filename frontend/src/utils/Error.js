import { notification } from "antd"
import { Redirect } from "react-router-dom";
import Session from "./Session";

export default class ErrorHandler {
  static handle(err) {
    if(err?.response?.status === 401){
      Session.clear()
    }
    notification.error({
      message: 'Thất bại',
      description: err?.response?.data?.message,
      placement: 'bottomRight'
    })
  }
}