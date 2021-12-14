
import React, { Component } from "react";
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  notification,
} from "antd";
import signinbg from "../assets/images/img-signin.jpg";
import {
  DribbbleOutlined,
  TwitterOutlined,
  InstagramOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { HttpUtils, URLUtils } from "../utils";
import { useDispatch } from "react-redux"
import { updateUsername } from "../store/userSlice";
import { useHistory } from "react-router-dom";
import Session from "../utils/Session";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;



const SignIn = (props) => {
  const dispatch = useDispatch()
  let history = useHistory()


  const onFinish = (values) => {
    HttpUtils.post(URLUtils.buildBeURL('/users/login'), { ...values })
      .then(resp => {
        if(resp.data[0]){
          const user = resp.data[0]
          dispatch(updateUsername());
          Session.setUserData({
            name: user.name,
            role: user.role,
            email: user.email,
            id: user.id
          })
          Session.setToken(resp.data[0].token)
        }
        history.push("/");
        notification.success({
          message: 'Đăng nhập thành công',
          placement: 'bottomRight'
        })
      })
      .catch(err => {
        notification.error({
          message: 'Thất bại',
          description: err?.response?.data?.message,
          placement: 'bottomRight'
        })
      })
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Layout className="layout-default layout-signin">
        <Header>
          <div className="header-col header-brand">
            <h5>UIS - Quản Lí Sinh Viên</h5>
          </div>
        </Header>
        <Content className="signin">
          <Row gutter={[24, 0]} justify="space-around">
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 6, offset: 2 }}
              md={{ span: 12 }}
            >
              <Title className="mb-15">Đăng nhập</Title>
              <Title className="font-regular text-muted" level={5}>
                Nhập tài khoản và mật khẩu để đăng nhập
              </Title>
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="row-col"
              >
                <Form.Item
                  className="username"
                  label="Tài khoản"
                  name="id"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tài khoản!",
                    },
                  ]}
                >
                  <Input placeholder="Tài khoản" />
                </Form.Item>

                <Form.Item
                  className="username"
                  label="Mật khẩu"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu!",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Mật khẩu"
                    style={{
                      padding: '0px 11px',
                      borderRadius: '6px'
                    }}
                  // iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    ĐĂNG NHẬP
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col
              className="sign-img"
              style={{ padding: 12 }}
              xs={{ span: 24 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
            >
              <img src={signinbg} alt="" />
            </Col>
          </Row>
        </Content>
        <Footer>
          
        </Footer>
      </Layout>
    </>
  );
}

export default SignIn