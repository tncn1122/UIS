import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

class ListButton extends Component {
  render() {
    return (
      <div style={{ marginTop: '20px', marginBottom: '20px' }}>
        <Link to="/contest?challenge=1">
          <Button size="large">THÔNG TIN CHUNG</Button>
        </Link>
        <Link to="/contest/waiting-room">
          <Button size="large">PHÒNG CHỜ</Button>
        </Link>
        <Link to="/contest/rankings">
          <Button size="large">BẢNG XẾP HẠNG</Button>
        </Link>
      </div>
    )
  }
}

export default ListButton
