import React, { useState, useEffect } from 'react'
import { Upload, Image, Button, Badge, List, Spin, Typography } from 'antd'
import { CameraOutlined, CloseCircleTwoTone } from '@ant-design/icons'
import { connect } from 'react-redux'
import { URLUtils, ErrorHandlerUtils, MiscUtils } from 'utils'
import { updateCurrentUserAction } from 'redux/auth/actions'
import { UserService } from 'service'
import { BE_ROUTE, DEFAULT_AVT } from 'config'
import ImgCrop from 'antd-img-crop'
import { CustomModal, IconOnlyButton } from 'component'
import styles from './style.module.scss'
import './style.overwrite.scss'

const { Text } = Typography

const CustomEditAvatar = (props) => {
  const { currentUser } = props
  const [avatarChanging, setAvatarChanging] = useState(false)
  const [fileList, setFileList] = useState([])
  const [uploadedAvatar, setUploadedAvatar] = useState([])
  const [loadingUploadedAvatar, setLoadingUploadedAvatar] = useState(false)

  useEffect(() => {
    getUploadedAvatar()

    // eslint-disable-next-line
  }, [currentUser])

  const openChangeAvatarModal = () => {
    getUploadedAvatar()
    setAvatarChanging(true)
  }

  // after uploaded a new avatar, fetch uploaded avatars from server and update file list
  const onUploadNewAvatar = ({ fileList: newFileList }) => {
    getUploadedAvatar()
    setFileList(newFileList)
  }

  // get uploaded avatars from server
  const getUploadedAvatar = () => {
    setLoadingUploadedAvatar(true)
    UserService.getUserAvatar()
      .then((resp) => {
        generateUploadedImg(resp)
        setLoadingUploadedAvatar(false)
      })
      .catch((error) => {
        ErrorHandlerUtils.http(error)
        setLoadingUploadedAvatar(false)
      })
  }

  // send name of avatar to server to delete
  const handleDeleteAvatar = (name) => {
    setLoadingUploadedAvatar(true)
    UserService.deleteUserAvatar({ filename: name })
      .then((resp) => {
        getUploadedAvatar()
      })
      .catch((error) => {
        ErrorHandlerUtils.http(error)
        setLoadingUploadedAvatar(false)
      })
  }

  // set current selected image to be user avatar
  const handleSelectAvatar = (name) => {
    setLoadingUploadedAvatar(true)
    UserService.setUserAvatar({ filename: name })
      .then((resp) => {
        const { user } = resp
        MiscUtils.dispatchReduxAction(updateCurrentUserAction(user))
        getUploadedAvatar()
        setLoadingUploadedAvatar(false)
      })
      .catch((error) => {
        ErrorHandlerUtils.http(error)
        setLoadingUploadedAvatar(false)
      })
  }

  // generate list uploaded avatar
  const generateUploadedImg = (data) => {
    data = data.map((item) => (
      <List.Item>
        <Badge
          className={styles.badge}
          count={
            item !== DEFAULT_AVT && item !== currentUser.avatar ? (
              <Button id="deleteBtn" onClick={() => handleDeleteAvatar(item)}>
                <CloseCircleTwoTone twoToneColor="red" />
              </Button>
            ) : null
          }
        >
          <Button
            id="avatarBtn"
            className={styles['img-button']}
            onClick={() => handleSelectAvatar(item)}
          >
            <img
              className={styles['img-uploaded']}
              src={URLUtils.buildBeURL(BE_ROUTE.INFORMATION.PATH.PUBLIC_AVATAR, `/${item}`)}
              alt={item}
            />
          </Button>
        </Badge>
      </List.Item>
    ))
    setUploadedAvatar(data)
  }

  return (
    <div>
      <CustomModal
        visible={avatarChanging}
        onCancel={() => {
          setAvatarChanging(false)
        }}
        title="Đổi ảnh đại diện"
        width={650}
        footer={null}
      >
        <Spin spinning={loadingUploadedAvatar}>
          <div style={{ textAlign: 'center' }}>
            <ImgCrop rotate shape="round">
              <Upload
                action={URLUtils.buildBeURL(
                  BE_ROUTE.INFORMATION.BASE,
                  BE_ROUTE.INFORMATION.PATH.AVATAR,
                )}
                withCredentials="true"
                fileList={fileList}
                onChange={onUploadNewAvatar}
                maxCount={1}
                multiple={false}
                showUploadList={false}
              >
                <Button type="primary">Tải ảnh lên</Button>
              </Upload>
            </ImgCrop>
          </div>

          <p style={{ fontSize: '16px', fontWeight: '400' }}>Ảnh đã tải lên</p>

          <List
            grid={{ gutter: 12, column: 5 }}
            dataSource={uploadedAvatar}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
          <Button id="load-more"> Xem Thêm </Button>
        </Spin>
      </CustomModal>
      {currentUser.avatar && (
        <Image
          alt="user avatar"
          className={styles['edit-avatar']}
          size="massive"
          src={URLUtils.buildBeURL(
            BE_ROUTE.INFORMATION.PATH.PUBLIC_AVATAR,
            `/${currentUser.avatar}`,
          )}
          onClick={openChangeAvatarModal}
          preview={{
            visible: false,
            maskClassName: styles['customize-mask'],
            mask: <CameraOutlined />,
          }}
        />
      )}
      <Text className="bold">{currentUser.username}</Text>
    </div>
  )
}

const mapStateToProps = ({ authReducer: { currentUser } }) => ({
  currentUser,
})
export default connect(mapStateToProps)(CustomEditAvatar)
