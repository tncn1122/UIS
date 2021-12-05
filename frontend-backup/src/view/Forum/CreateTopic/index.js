import React, { useState } from 'react'
import { Input, Button, Form, Row, Col, Tag, Breadcrumb } from 'antd'
import { ErrorHandlerUtils, URLUtils } from 'utils'
import { Link, useParams } from 'react-router-dom'
import { FE_ROUTE } from 'config'

import ForumService from 'service/ForumService'

import styles from './style.module.scss'

const { TextArea } = Input
const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 },
}

export default function CreateTopicModal({ onFinish, visible }) {
  const [content, setContent] = useState('')
  const [isContentTouched, setIsContentTouched] = useState(false)
  const [title, setTitle] = useState('')
  const [form] = Form.useForm()

  const { forumId } = useParams()

  const submitForm = (data) => {
    ForumService.createTopic(forumId, { title: data.title, summary: data.topicSummary })
      .then((newComment) => {
        URLUtils.moveToURL(`${FE_ROUTE.FORUM.HOME}/${forumId}`)
      })
      .catch((error) => {
        ErrorHandlerUtils.http(error)
      })
  }

  const submit = () => {
    if (!content && !isContentTouched) setIsContentTouched(true)
    form.submit()
  }
  return (
    <div className={styles.main}>
      <Breadcrumb className={styles.breadcrumb} separator=">">
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/forums">Forum</Breadcrumb.Item>
        <Breadcrumb.Item>Create Topic</Breadcrumb.Item>
      </Breadcrumb>
      <div className={styles.title}>
        <div>Tạo chủ đề mới</div>
      </div>
      <div className={styles.topic}>
        <Form
          layout="vertical"
          {...layout}
          name="basic"
          form={form}
          onFinish={submitForm}
          initialValues={{
            description: '',
            title: '',
          }}
        >
          <Form.Item
            name="title"
            label={<div className="form-title">Nhập tiêu đề</div>}
            key="title"
            rules={[
              {
                required: true,
                message: <div className="content-validation">Chủ đề không được để trống!</div>,
              },
            ]}
          >
            <Input className="input" type="title" value={title} />
          </Form.Item>

          <Form.Item name="topicSummary">
            <TextArea rows={4} type="text" placeholder="Viết mô tả chủ đề" />
          </Form.Item>
          <Form.Item>
            {/* <CKEditor
              editor={ClassicEditor}
              data={content}
              onChange={(event, editor) => setContent(editor.getData())}
              onFocus={() => setIsContentTouched(true)}
              onReady={(editor) => {
                console.log('Editor1 is ready to use!', editor)
                editor.editing.view.change((writer) => {
                  writer.setStyle('height', '200px', editor.editing.view.document.getRoot())
                  writer.setStyle(
                    'border-radius',
                    '0px 0px 5px 5px',
                    editor.editing.view.document.getRoot(),
                  )
                  writer.setStyle('border', '1px solid #E6E6E6', editor.editing.view.document.getRoot())
                })
              }}
            />
            {!content && isContentTouched ? (
              <div className="content-validation">Nội dung bài viết không được để trống!</div>
            ) : (
              ''
            )} */}
            <Row className={styles.footer}>
              <Col span={14} className={styles.left}>
                <Col span={16}>
                  <Button type="text" size="small">
                    golang
                  </Button>
                  <Button type="text" size="small">
                    linux
                  </Button>
                  <Button type="text" size="small">
                    overflow
                  </Button>
                </Col>
              </Col>
              <Col span={10} className={styles.right}>
                <Button className={styles['button-inactive']} type="text">
                  <Link className="link" to="/forums/group/1">
                    Huỷ
                  </Link>
                </Button>
                <Button className={styles['button-inactive']} type="text">
                  Xem trước
                </Button>
                <Button className={styles['button-active']} type="primary" htmlType="submit">
                  Tạo
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
