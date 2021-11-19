import React, { useEffect, useRef, useState } from 'react'
import { Col, Row, Spin } from 'antd'
import { ErrorHandlerUtils, URLUtils } from 'utils'
import { UserService } from 'service'
import CustomCard from 'component/CustomCard'
import DetailProfile from 'component/Profile'
import ChallengeList from 'component/ChallengeList'
import UserForum from 'component/UserForum'
import UserPractice from 'component/UserPractice'
import { BE_ROUTE, LOCATION } from 'config'
import { CHALLENGES, OVERALLS, ASSIGNMENTS, FORUMDATA } from './constant'
import styles from './style.module.scss'

export default function ProfileInfo(props) {
  const {
    history,
    match: { path, url, params },
    location: { pathname },
  } = props

  const [loading, setLoading] = useState(false)
  const [textLoading, setTextLoading] = useState(false)
  const [challenges, setChallenges] = useState([])
  const [overalls, setOveralls] = useState([])
  const [assignments, setAssignments] = useState([])
  const [forumData, setForumData] = useState({})
  const [userData, setUserData] = useState({})

  const fetchData = () => {
    setChallenges(CHALLENGES)
    setOveralls(OVERALLS)
    setAssignments(ASSIGNMENTS)
    setForumData(FORUMDATA)
  }

  useEffect(() => {
    setLoading(true)
    fetchData()
    UserService.getUserProfile(params.id)
      .then((resp) => {
        const { userProfile } = resp

        // check if user has province and get provinces object
        const province = LOCATION[userProfile.country]
          ? LOCATION[userProfile.country].province
          : null

        // check if user has country and replace user country code with country label
        userProfile.country = LOCATION[userProfile.country]
          ? LOCATION[userProfile.country].label
          : ''

        // replace user's province code with province label
        userProfile.province = province ? province[userProfile.province].label : ''

        setUserData(userProfile)
        setLoading(false)
      })
      .catch((error) => {
        ErrorHandlerUtils.http(error)
        setLoading(false)
      })
  }, [params])

  return (
    <div className={styles.main}>
      <Spin spinning={loading} tip={textLoading}>
        <Row gutter={[32, 32]} style={{ marginBottom: 16, padding: '30px 0' }}>
          <Col span={6}>
            <CustomCard className={styles.card}>
              {userData.avatar && (
                <DetailProfile
                  avatar={URLUtils.buildBeURL(
                    BE_ROUTE.INFORMATION.PATH.PUBLIC_AVATAR,
                    `/${userData.avatar}`,
                  )}
                  size={150}
                  username={userData.username}
                  title="Newbie"
                  intro={{
                    email: userData.email,
                    phone: userData.phone ? userData.phone : '-',
                    location: `${userData.country}-${userData.province}`,
                    date: userData.birth_date,
                  }}
                />
              )}
            </CustomCard>
          </Col>
          <Col span={18}>
            <ChallengeList challenges={challenges} />
            <UserPractice overalls={overalls} assignments={assignments} />
            <UserForum forumData={forumData} />
          </Col>
        </Row>
      </Spin>
    </div>
  )
}
