import React from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import LogoVtv from 'asset/img/logo-brand/logo-vtv.png'
import { Row, Col, Card } from 'antd'
import styles from './style.module.scss'

export default function Home() {
  return (
    <div className={styles.Partner}>
      <h1 style={{ fontWeight: 'bold' }}>Đối tác</h1>
      <Row gutter={12} className={styles.PartnerList}>
        <Col span={4} className={styles.PartnerChild}>
          <Card hoverable cover={<img src={LogoVtv} alt="..." />}></Card>
        </Col>
        <Col span={4} className={styles.PartnerChild}>
          <Card hoverable cover={<img src={LogoVtv} alt="..." />}></Card>
        </Col>
        <Col span={4} className={styles.PartnerChild}>
          <Card hoverable cover={<img src={LogoVtv} alt="..." />}></Card>
        </Col>
        <Col span={4} className={styles.PartnerChild}>
          <Card hoverable cover={<img src={LogoVtv} alt="..." />}></Card>
        </Col>

        <Col span={4} className={styles.PartnerChild}>
          <Card hoverable cover={<img src={LogoVtv} alt="..." />}></Card>
        </Col>
        <Col span={4} className={styles.PartnerChild}>
          <Card hoverable cover={<img src={LogoVtv} alt="..." />}></Card>
        </Col>
        <Col span={4} className={styles.PartnerChild}>
          <Card hoverable cover={<img src={LogoVtv} alt="..." />}></Card>
        </Col>
        <Col span={4} className={styles.PartnerChild}>
          <Card hoverable cover={<img src={LogoVtv} alt="..." />}></Card>
        </Col>
        <Col span={4} className={styles.PartnerChild}>
          <Card hoverable cover={<img src={LogoVtv} alt="..." />}></Card>
        </Col>
        <Col span={4} className={styles.PartnerChild}>
          <Card hoverable cover={<img src={LogoVtv} alt="..." />}></Card>
        </Col>
        <Col span={4} className={styles.PartnerChild}>
          <Card hoverable cover={<img src={LogoVtv} alt="..." />}></Card>
        </Col>
        <Col span={4} className={styles.PartnerChild}>
          <Card hoverable cover={<img src={LogoVtv} alt="..." />}></Card>
        </Col>
      </Row>
    </div>
  )
}
