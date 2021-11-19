import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { Col, Row, Form, Input, Card, Button } from 'antd'
import { MiscUtils, ErrorHandlerUtils, URLUtils } from 'utils'
import { TeamService, UserService } from 'service'
import { TEXT_UI_USER_PROFILE, TEXT_BUTTON, TEXT_VALIDATOR } from 'config'
import { UserProfileComponent, CustomModal } from 'component'
import TeamCard from './TeamCard'
import styles from './style.module.scss'

const Team = ({ currentUser }) => {
  const [openCreateTeam, setOpenCreateTeam] = useState(false)
  const [teamData, setTeamData] = useState([])
  const [form] = Form.useForm()

  const fetchTeamData = async () => {
    UserService.getTeamInfo()
      .then((teamFetched) => {
        setTeamData(teamFetched)
      })
      .catch((error) => {
        ErrorHandlerUtils.http(error)
      })
  }

  const handleCreateTeam = async (data) => {
    TeamService.createTeam(data)
      .then(() => {
        setOpenCreateTeam(false)
        form.resetFields()
        fetchTeamData()
      })
      .catch((error) => {
        ErrorHandlerUtils.http(error)
      })
  }

  const createTeamForm = (
    <CustomModal
      title={TEXT_UI_USER_PROFILE.TEAM_MANAGEMENT.CREATE_TEAM}
      visible={openCreateTeam}
      onOk={form.submit}
      onCancel={() => {
        setOpenCreateTeam(false)
        form.resetFields()
      }}
    >
      <Form layout="vertical" name="create-team-form" form={form} onFinish={handleCreateTeam}>
        <Form.Item
          name="name"
          label={TEXT_UI_USER_PROFILE.TEAM_MANAGEMENT.TEAM_NAME}
          rules={[
            {
              required: true,
              message: TEXT_VALIDATOR.TEAM_NAME_REQUIRED,
            },
          ]}
        >
          <Input onChange={(e) => form.setFieldsValue({ name: e.target.value })} />
        </Form.Item>
        <Form.Item name="description" label={TEXT_UI_USER_PROFILE.TEAM_MANAGEMENT.TEAM_DESCRIPTION}>
          <Input.TextArea
            autoSize={{ minRows: 5, maxRows: 6 }}
            onChange={(e) => form.setFieldsValue({ description: e.target.value })}
          />
        </Form.Item>
      </Form>
    </CustomModal>
  )

  useEffect(() => {
    fetchTeamData()
  }, [])

  return (
    <div className={styles['user-info-body']}>
      <h2 className={classnames(styles['user-info-title'], 'typography-subtitle-regular')}>
        {TEXT_UI_USER_PROFILE.GENERAL_INFORMATION}
      </h2>
      <div>
        <UserProfileComponent>
          <Row gutter={[32, 32]} id="team-list">
            {teamData.map((team) => (
              <Col span={12} key={MiscUtils.generateId()}>
                <TeamCard
                  key={MiscUtils.generateId()}
                  teamName={team.name}
                  teamID={team.teamID}
                  description={team.description}
                  members={team.members}
                  currentUser={currentUser}
                  fetchTeamData={fetchTeamData}
                  bordered
                />
              </Col>
            ))}
            <Col span={12}>
              <Card className={classnames(styles['create-team'], 'align-content-center')}>
                <div style={{ textAlign: 'center' }}>
                  <p className="typography-menu-subtext color-grey-lighter">
                    {TEXT_UI_USER_PROFILE.TEAM_MANAGEMENT.CREATE_TEAM}
                  </p>
                  <Button type="primary" onClick={() => setOpenCreateTeam(!openCreateTeam)}>
                    {TEXT_BUTTON.CREATE_TEAM}
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
          {createTeamForm}
        </UserProfileComponent>
      </div>
    </div>
  )
}

const mapStateToProps = ({ authReducer: { currentUser } }) => ({
  currentUser,
})
export default connect(mapStateToProps)(Team)
