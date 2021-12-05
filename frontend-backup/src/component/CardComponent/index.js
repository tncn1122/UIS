import React, { Component } from 'react'
import { Card, Col, Row } from 'antd'

class CardComponent extends Component {
  render() {
    return (
      <div className="site-card-wrapper">
        <Row gutter={12} style={{ marginTop: '20px', marginLeft: '25%', marginBottom: '20px' }}>
          <Col span={4}>
            <Card title="Card title">Card content</Card>
          </Col>
          <Col span={4}>
            <Card title="Card title">Card Content</Card>
          </Col>
          <Col span={4}>
            <Card title="Card title">Card content</Card>
          </Col>
          <Col span={4}>
            <Card title="Card title">Card content</Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default CardComponent
