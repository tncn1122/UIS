import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { FaRegEdit } from 'react-icons/fa'
import { ErrorHandlerUtils } from 'utils'
import { Card } from 'antd'
import { TEXT_UI_USER_PROFILE } from 'config'
import { UserService } from 'service'
import UserProfileComponent from 'component/UserProfileComponent'
import CustomCard from 'component/CustomCard'
import UserProfileForm from './UserProfileForm'
import UserEducationForm from './UserEducationForm'
import UserWorkExperienceForm from './UserWorkExperienceForm'
import styles from './style.module.scss'

const mapStateToProps = ({ authReducer: { currentUser } }) => ({
  currentUser,
})
const UserProfile = (props) => {
  const [userInfoFormEditable, setUserInfoFormEditable] = useState(false)
  const [workExperienceFormEditable, setWorkExperienceFormEditable] = useState(false)
  const [educationFormEditable, setEducationFormEditable] = useState(false)
  const [loadingData, setLoadingData] = useState(false)
  const [userData, setUserData] = useState({})

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    setLoadingData(true)
    UserService.getUserInfo()
      .then((resp) => {
        setUserData(resp)
        setLoadingData(false)
      })
      .catch((error) => {
        ErrorHandlerUtils.http(error)
      })
  }

  // TODO: edit username
  // const openChangeUsernameModal = () => {
  //   const onChangeFinish = (uname) => {
  //     setUsername(uname)
  //     notification.success({
  //       message: 'Đổi tên người dùng thành công',
  //       duration: 3,
  //     })
  //     setModal('')
  //   }
  //   setModal(
  //     <ChangeUsernameModal
  //       onClose={() => {
  //         setModal('')
  //       }}
  //       onFinish={onChangeFinish}
  //     />,
  //   )
  // }

  return (
    <div className={styles['user-info-body']}>
      <h2 className={styles['user-info-title']}>{TEXT_UI_USER_PROFILE.GENERAL_INFORMATION}</h2>
      <UserProfileComponent userData={userData}>
        <Card
          title={TEXT_UI_USER_PROFILE.PERSONAL_INFORMATION.TITLE}
          extra={
            <FaRegEdit
              className={styles['edit-icon']}
              onClick={() => setUserInfoFormEditable(!userInfoFormEditable)}
            />
          }
        >
          {userData.userProfile && (
            <UserProfileForm
              formData={userData.userProfile}
              formEditable={userInfoFormEditable}
              setFormEditable={setUserInfoFormEditable}
              fetchData={fetchData}
            />
          )}
        </Card>
        <CustomCard
          title={TEXT_UI_USER_PROFILE.WORK_EXPERIENCE.TITLE}
          className={styles['card-block']}
          extra={
            <FaRegEdit
              className={styles['edit-icon']}
              onClick={() => setWorkExperienceFormEditable(!workExperienceFormEditable)}
            />
          }
        >
          {userData.userWorkExperience && (
            <UserWorkExperienceForm
              formData={userData.userWorkExperience[0]}
              formEditable={workExperienceFormEditable}
              setFormEditable={setWorkExperienceFormEditable}
              fetchData={fetchData}
            />
          )}
        </CustomCard>

        <CustomCard
          title={TEXT_UI_USER_PROFILE.EDUCATION.TITLE}
          className={styles['card-block']}
          extra={
            <FaRegEdit
              className={styles['edit-icon']}
              onClick={() => setEducationFormEditable(!educationFormEditable)}
            />
          }
        >
          {userData.userEducation && (
            <UserEducationForm
              formData={userData.userEducation[0]}
              formEditable={educationFormEditable}
              setFormEditable={setEducationFormEditable}
              fetchData={fetchData}
            />
          )}
        </CustomCard>
      </UserProfileComponent>
    </div>
  )
}

export default connect(mapStateToProps)(UserProfile)
