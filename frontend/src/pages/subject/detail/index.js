/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import {
  Row,
  Col,
  Card,
  Button,
  List,
  Descriptions,
  Avatar,
} from "antd";

import { PlusOutlined, ExclamationOutlined } from "@ant-design/icons";
import mastercard from "../../../assets/images/mastercard-logo.png";
import visa from "../../../assets/images/visa-logo.png";
import { useEffect, useState } from "react";
import { HttpUtils, URLUtils } from "../../../utils";
import ErrorHandler from "../../../utils/Error";

function SubjectDetail(props) {
  const subjectId = props.match.params.id
  const semester = props.match.params.semester
  const [listStudents, setListStudents] = useState([])
  const [teacherInfo, setTeacherInfo] = useState({})
  const [subjectInfo, setSubjectInfo] = useState({})

  useEffect(() => {
    fetchData()
  }, [subjectId, semester])


  const fetchData = () => {
    HttpUtils.get(URLUtils.buildBeURL(`/subjects/${subjectId}/${semester}`))
      .then(resp => {
        const { data } = resp
        if (data && data.length > 0) {
          setSubjectInfo(data[0])
          setTeacherInfo(data[0].teacher)
          setListStudents(preProcessingListStudent(data[0].students))
        }
      })
      .catch(err => {
        ErrorHandler.handle(err)
      })
  }




  const preProcessingListStudent = (data) => {
    return data.map(item => {
      return {
        name: `${item.lastName} ${item.firstName}`,
        major: item.majorId.name,
        email: item.email,
        phone: item.phone
      }
    })
  }

  const yesterday = [
    {
      avatar: <PlusOutlined style={{ fontSize: 10 }} />,
      title: "Stripe",
      description: "26 March 2021, at 12:30 AM",
      amount: "+ $750",
      textclass: "text-fill",
      amountcolor: "text-success",
    }
  ];

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col xs={24} md={24}>
          <Row gutter={[24, 0]}>
            <Col xs={24} className="mb-24">
              <Card
                className="header-solid h-full ant-card-p-0"
                title={
                  <>
                    <Row
                      gutter={[24, 0]}
                      className="ant-row-flex ant-row-flex-middle"
                    >
                      <Col xs={24} md={12}>
                        <h6 className="font-semibold m-0">{subjectInfo.name}</h6>
                      </Col>
                      <Col xs={24} md={12} className="d-flex">
                        <Button type="primary" href={URLUtils.buildBeURL(`/reports/${subjectId}/${semester}/download-all`)}>Xuất danh sách</Button>
                      </Col>
                    </Row>
                  </>
                }
              >
                <Row gutter={[24, 0]} style={{ padding: '0 20px' }}>
                  <Descriptions>
                    <Descriptions.Item label="Giảng Viên" >
                      {teacherInfo ? `${teacherInfo?.lastName} ${teacherInfo?.firstName}` : '-'}
                    </Descriptions.Item>

                    <Descriptions.Item label="Email" >
                      {teacherInfo?.email || '-'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại" >
                      {teacherInfo?.phone || '-'}
                    </Descriptions.Item>
                  </Descriptions>
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>

      </Row>
      <Row gutter={[24, 0]}>
        <Col span={24} md={16} className="mb-24">
          <Card
            className="header-solid h-full"
            bordered={false}
            title={[<h6 className="font-semibold m-0">{`Danh Sách Sinh Viên - ${listStudents.length}`}</h6>]}
            bodyStyle={{ paddingTop: "0" }}
          >
            <Row gutter={[24, 24]}>
              {listStudents.map((i, index) => (
                <Col span={24} key={index}>
                  <Card className="card-billing-info" bordered="false">
                    <Descriptions title={i.name}>
                      <Descriptions.Item label="Chuyên ngành" >
                        {i.major}
                      </Descriptions.Item>

                      <Descriptions.Item label="Email" >
                        {i.email}
                      </Descriptions.Item>
                      <Descriptions.Item label="Số điện thoại" >
                        {i.phone}
                      </Descriptions.Item>
                    </Descriptions>

                    {/* <div className="col-action">
                      <Button type="link" danger>
                        {deletebtn}DELETE
                      </Button>
                      <Button type="link" className="darkbtn">
                        {pencil} EDIT
                      </Button>
                    </div> */}
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            bodyStyle={{ paddingTop: 0 }}
            className="header-solid h-full  ant-list-yes"
            title={<h6 className="font-semibold m-0">Lịch sử điểm danh</h6>}
            extra={
              <Button className="darkbtn" href={`/reports/${subjectId}/${semester}/status`}>
                Điểm danh
              </Button>
            }
          >

            <List
              className="yestday transactions-list"
              itemLayout="horizontal"
              dataSource={yesterday}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar size="small" className={item.textclass}>
                        {item.avatar}
                      </Avatar>
                    }
                    title={item.title}
                    description={item.description}
                  />
                  <div className="amount">
                    <span className={item.amountcolor}>{item.amount}</span>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default SubjectDetail;
