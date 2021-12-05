import React, { useState } from 'react'
import { Col, Row, List, Form, Input, Typography, Card, Modal } from 'antd'
import { EditFilled, DeleteFilled, PlusCircleOutlined } from '@ant-design/icons'
import { MiscUtils, ErrorHandlerUtils, ValidationUtils } from 'utils'
import { TEXT_UI_USER_PROFILE, TEXT_BUTTON, TEXT_VALIDATOR } from 'config'
import { TeamService } from 'service'
import { IconButton, IconOnlyButton, CustomModal } from 'component'
import styles from './style.module.scss'

const { Text } = Typography
export default function TeamCard({
  teamName,
  teamID,
  description,
  members, // array of member {name, email, id, title, status}
  currentUser, // {id, email, name}
  isLoading,
  bordered,
  fetchTeamData,
}) {
  const leader = members
    ? members.find((mem) => mem.title === TEXT_UI_USER_PROFILE.TEAM_MANAGEMENT.ROLE_LEADER)
    : false
  const leaderView = leader && leader.id === currentUser.id // true/false

  const [loading, setLoading] = useState(isLoading)
  const [openEditTeamNameForm, setOpenEditTeamNameForm] = useState(false)
  const [openAddMemberForm, setOpenAddMemberForm] = useState(false)
  const [modal, contextHolder] = Modal.useModal()
  const [openDeleteTeamModal, setOpenDeleteTeamModal] = useState(false)
  const [openDeleteMemberModal, setOpenDeleteMemberModal] = useState(false)
  const [focusedMember, setFocusedMember] = useState(null)
  const [memberForm] = Form.useForm()
  const [teamNameForm] = Form.useForm()

  const handleEditTeamName = (data) => {
    const { newName } = data
    if (!ValidationUtils.empty(newName) && newName !== teamName)
      TeamService.rename(teamID, data)
        .then(() => {
          setOpenEditTeamNameForm(false)
          fetchTeamData()
          teamNameForm.resetFields()
        })
        .catch((error) => {
          ErrorHandlerUtils.http(error)
        })
    else {
      setOpenEditTeamNameForm(false)
      teamNameForm.resetFields()
    }
  }

  const handleAddMember = (data) => {
    TeamService.addMember(teamID, data)
      .then(() => {
        memberForm.resetFields()
        fetchTeamData()
      })
      .catch((error) => {
        memberForm.resetFields()
        ErrorHandlerUtils.http(error)
      })
  }

  const handleDeleteTeam = () => {
    TeamService.deleteTeam(teamID)
      .then(() => {
        setOpenDeleteTeamModal(false)
        fetchTeamData()
      })
      .catch((error) => {
        ErrorHandlerUtils.http(error)
      })
  }

  const handleDeleteMember = () => {
    TeamService.deleteMember(focusedMember.id, teamID)
      .then(() => {
        setOpenDeleteMemberModal(false)
        fetchTeamData()
      })
      .catch((error) => {
        ErrorHandlerUtils.http(error)
      })
  }

  const addMemberForm = (
    <CustomModal
      title={TEXT_UI_USER_PROFILE.TEAM_MANAGEMENT.TITLE_ADD_MEMBER}
      visible={openAddMemberForm}
      onOk={memberForm.submit}
      okText={TEXT_BUTTON.INVITE}
      onCancel={() => setOpenAddMemberForm(false)}
    >
      <Form layout="vertical" name="create-team-form" form={memberForm} onFinish={handleAddMember}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: TEXT_VALIDATOR.USERNAME_OR_EMAIL_REQUIRED,
            },
          ]}
        >
          <Input
            placeholder="Email"
            onChange={(e) => memberForm.setFieldsValue({ email: e.target.value })}
          />
        </Form.Item>
      </Form>
    </CustomModal>
  )

  const editTeamNameForm = (
    <CustomModal
      title={TEXT_UI_USER_PROFILE.TEAM_MANAGEMENT.TITLE_TEAM_EDIT}
      visible={openEditTeamNameForm}
      onOk={teamNameForm.submit}
      onCancel={() => {
        setOpenEditTeamNameForm(false)
        teamNameForm.resetFields()
      }}
    >
      <Form
        layout="vertical"
        name="edit-team-form"
        form={teamNameForm}
        onFinish={handleEditTeamName}
        initialValues={{ newName: teamName }}
      >
        <Form.Item
          name="newName"
          label={TEXT_UI_USER_PROFILE.TEAM_MANAGEMENT.TEAM_NAME}
          rules={[
            {
              required: true,
              message: TEXT_VALIDATOR.TEAM_NAME_REQUIRED,
            },
          ]}
        >
          <Input
            placeholder="Name"
            onChange={(e) => teamNameForm.setFieldsValue({ newName: e.target.value })}
          />
        </Form.Item>
      </Form>
    </CustomModal>
  )

  const confirmDeleteTeamModal = (
    <CustomModal
      title={TEXT_UI_USER_PROFILE.TEAM_MANAGEMENT.TITLE_DELETE_TEAM}
      visible={openDeleteTeamModal}
      onOk={handleDeleteTeam}
      onCancel={() => setOpenDeleteTeamModal(false)}
    >
      <Text style={{ fontSize: 10 }}>
        {TEXT_UI_USER_PROFILE.TEAM_MANAGEMENT.DESCRIPTION_DELETE_TEAM}
      </Text>
    </CustomModal>
  )

  const confirmDeleteMemberModal = (
    <CustomModal
      title={TEXT_UI_USER_PROFILE.TEAM_MANAGEMENT.TITLE_DELETE_MEMBER}
      visible={openDeleteMemberModal}
      onOk={handleDeleteMember}
      onCancel={() => setOpenDeleteMemberModal(false)}
    >
      <Text style={{ fontSize: 10 }}>
        {TEXT_UI_USER_PROFILE.TEAM_MANAGEMENT.DESCRIPTION_DELETE_MEMBER}
      </Text>
    </CustomModal>
  )

  return (
    <Card
      key={teamID}
      title={teamName}
      className={styles.card}
      extra={
        leaderView ? (
          <>
            <IconOnlyButton
              icon={<EditFilled />}
              onClick={() => {
                setOpenEditTeamNameForm(true)
              }}
            />
            {editTeamNameForm}
            <IconOnlyButton
              icon={<DeleteFilled />}
              onClick={() => {
                setOpenDeleteTeamModal(true)
              }}
            />
            {contextHolder}
          </>
        ) : (
          <></>
        )
      }
      loading={loading}
      bordered={bordered}
    >
      {confirmDeleteTeamModal}
      {confirmDeleteMemberModal}
      <div className={styles['card-body']}>
        <p className="typography-small italic">{description}</p>
        {addMemberForm}
        <List
          dataSource={members.length >= 5 ? members : [...members, { id: 'addMember' }]}
          renderItem={(mem) => {
            if (mem.id === 'addMember') {
              return (
                <List.Item>
                  <List.Item.Meta
                    key={MiscUtils.generateId()}
                    title={
                      <IconButton
                        icon={<PlusCircleOutlined />}
                        text={TEXT_BUTTON.ADD_MEMBER}
                        onClick={() => setOpenAddMemberForm(true)}
                      />
                    }
                  />
                </List.Item>
              )
            }
            return (
              <List.Item key={MiscUtils.generateId()} style={{ display: 'block' }}>
                <Row align="middle" className="typography-menu-subtext">
                  <Col span={8}>
                    {mem.status === 'pending' ? (
                      <span className="italic color-red">
                        {TEXT_UI_USER_PROFILE.TEAM_MANAGEMENT.WAITING}
                      </span>
                    ) : (
                      <span className="color-grey-lighter">
                        {TEXT_UI_USER_PROFILE.TEAM_MANAGEMENT[mem.title]}
                      </span>
                    )}
                  </Col>

                  <Col span={14}>
                    <span className="color-black">{mem.email}</span>
                  </Col>
                  <Col span={2}>
                    {leaderView && mem.title !== TEXT_UI_USER_PROFILE.TEAM_MANAGEMENT.ROLE_LEADER && (
                      <IconOnlyButton
                        icon={<DeleteFilled />}
                        onClick={() => {
                          setFocusedMember(mem)
                          setOpenDeleteMemberModal(true)
                        }}
                      />
                    )}
                  </Col>
                </Row>
              </List.Item>
            )
          }}
        />
      </div>
    </Card>
  )
}
