import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { Typography, Row, Col, Divider, Button } from 'antd'
import { BiCalendarPlus } from 'react-icons/bi'
import { FiUserPlus, FiUserCheck } from 'react-icons/fi'
import { FaRegCalendarCheck } from 'react-icons/fa'
import { ImEnter } from 'react-icons/im'
import { CountDownNumberic, LoadingIndicator } from 'component'
import { CONTEST_STATUS, TEXT_UI_CONTEST, FE_ROUTE } from 'config'
import { DateTimeUtils, ErrorHandlerUtils, URLUtils, ValidationUtils } from 'utils'
import { ContestService } from 'service'
import Ranking from './ranking'
import styles from './style.module.scss'
import './style.overwrite.scss'

const { Text } = Typography
const contestStatus = {}
contestStatus[CONTEST_STATUS.PAST] = TEXT_UI_CONTEST.PAST
contestStatus[CONTEST_STATUS.ONGOING] = TEXT_UI_CONTEST.ONGOING
contestStatus[CONTEST_STATUS.PLANNED] = TEXT_UI_CONTEST.PLANNED

/* eslint-disable camelcase */
function ContestComponent({
  currentUser,
  contest: {
    id,
    name,
    is_public,
    is_open_registration,
    description,
    status,
    location,
    event_time_begin,
    event_time_end,
    isAddedToCalendar,
    isRegistered,
    noOfRegister,
  },
}) {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [eventTimeText1, setEventTimeText1] = useState('')
  const [eventTimeText2, setEventTimeText2] = useState('')
  const [eventTimeValue1, setEventTimeValue1] = useState('')
  const [eventTimeValue2, setEventTimeValue2] = useState('')
  const [isAlreadyAdded, setIsAlreadyAdded] = useState(isAddedToCalendar === 1)
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(isRegistered === 1)
  const [currentNoOfRegister, setCurrentNoOfRegister] = useState(noOfRegister)

  useEffect(() => {
    const beginTxt = DateTimeUtils.formatDate(event_time_begin)
    const endTxt = DateTimeUtils.formatDate(event_time_end)
    const beginArr = beginTxt.split(' ')
    const endArr = endTxt.split(' ')
    if (beginArr[0] !== endArr[0]) {
      // different date
      setEventTimeText1(TEXT_UI_CONTEST.BEGIN)
      setEventTimeText2(TEXT_UI_CONTEST.END)
      setEventTimeValue1(beginTxt)
      setEventTimeValue2(endTxt)
    } else {
      setEventTimeText1(TEXT_UI_CONTEST.TIME)
      setEventTimeText2(TEXT_UI_CONTEST.DATE)
      setEventTimeValue1(`${beginArr[1]} ~ ${endArr[1]}`)
      setEventTimeValue2(beginArr[0])
    }
  }, [])

  const submitAddToCalendar = () => {
    if (ValidationUtils.empty(currentUser))
      history.push(`${FE_ROUTE.AUTH.LOGIN}?next=${URLUtils.getPathnameInURL()}`)
    else {
      setIsLoading(true)
      ContestService.addToCalendar({ contestId: id })
        .then(() => {
          setIsLoading(false)
          setIsAlreadyAdded(!isAlreadyAdded)
        })
        .catch((error) => {
          setIsLoading(false)
          ErrorHandlerUtils.http(error)
        })
    }
  }

  const submitRegister = () => {
    if (ValidationUtils.empty(currentUser))
      history.push(`${FE_ROUTE.AUTH.LOGIN}?next=${URLUtils.getPathnameInURL()}`)
    else {
      setIsLoading(true)
      ContestService.register({ contestId: id })
        .then(() => {
          setIsLoading(false)
          setCurrentNoOfRegister(
            isAlreadyRegistered ? currentNoOfRegister - 1 : currentNoOfRegister + 1,
          )
          setIsAlreadyRegistered(!isAlreadyRegistered)
        })
        .catch((error) => {
          setIsLoading(false)
          ErrorHandlerUtils.http(error)
        })
    }
  }

  const submitGoToRoom = () => {
    const next = `${FE_ROUTE.CONTEST.HOME}/${
      is_public ? 'public' : 'private'
    }/${id}?tab=waitingRoom`
    if (ValidationUtils.empty(currentUser)) history.push(`${FE_ROUTE.AUTH.LOGIN}?next=${next}`)
    else {
      history.push(next)
    }
  }

  return (
    <LoadingIndicator isHidden={!isLoading}>
      <div className={styles.content}>
        <Row className={styles['row-into']}>
          <Col span="12" className={styles['col-title']}>
            <Link to={`${FE_ROUTE.CONTEST.HOME}/${is_public ? 'public' : 'private'}/${id}`}>
              <h2 className={classnames('typography-h3 bold', styles['contest-title'])}>{name}</h2>
            </Link>
            <div className="typography-small">{description}</div>
          </Col>
          <Col span="9" className={classnames(styles['col-countdown'], 'align-content-center')}>
            {status !== CONTEST_STATUS.PLANNED && (
              <CountDownNumberic
                targetTime={event_time_end}
                isDisabled={status === CONTEST_STATUS.PAST}
              />
            )}
            {status === CONTEST_STATUS.PLANNED && (
              <CountDownNumberic targetTime={event_time_begin} />
            )}
          </Col>
          <Col span="3">
            <div
              className={classnames(
                'typography-menu-subtext align-content-center',
                styles['contest-status'],
                styles[`contest-status-${status}`],
              )}
            >
              {contestStatus[status]}
            </div>
          </Col>
        </Row>

        <Divider className={styles.devider} />

        <Row className={styles['row-detail']}>
          {/* Time and location */}
          <Col span="7">
            <Row>
              <Col span="8">
                <Text className="bold">{eventTimeText1}:</Text>
              </Col>
              <Col span="16">
                <Text>{eventTimeValue1}</Text>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <Text className="bold">{eventTimeText2}:</Text>
              </Col>
              <Col span="16">
                <Text>{eventTimeValue2}</Text>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <Text className="bold">{TEXT_UI_CONTEST.LOCATION}:</Text>
              </Col>
              <Col span="16">
                <Text>{location}</Text>
              </Col>
            </Row>
          </Col>

          {/* No of register */}
          <Col span="4" className="ta-center">
            <div className="typography-subtitle-regular color-primary">{currentNoOfRegister}</div>
            <div>
              <Text>{TEXT_UI_CONTEST.REGISTERED_USER}</Text>
            </div>
          </Col>

          {/* Action */}
          <Col span="13" className="align-content-center">
            {status === CONTEST_STATUS.PAST && <Ranking contestId={id} isPublic={is_public} />}
            {status !== CONTEST_STATUS.PAST && (
              <>
                <Button
                  className={classnames(
                    'typography-menu-subtext m-r-15',
                    styles['contest-button'],
                    styles[`contest-button-${status}`],
                    { 'contest-button-planned-added-to-calendar': isAlreadyAdded },
                  )}
                  disabled={status === CONTEST_STATUS.ONGOING}
                  onClick={submitAddToCalendar}
                >
                  {isAlreadyAdded ? (
                    <div className="align-content-center">
                      <FaRegCalendarCheck className="typography-menu" />
                      &nbsp;{TEXT_UI_CONTEST.ADDED_TO_CALENDAR}
                    </div>
                  ) : (
                    <div className="align-content-center">
                      <BiCalendarPlus className="typography-menu" />
                      &nbsp;{TEXT_UI_CONTEST.ADD_TO_CALENDAR}
                    </div>
                  )}
                </Button>

                {status === CONTEST_STATUS.ONGOING && (
                  <Button
                    className={classnames(
                      'typography-menu-subtext',
                      styles['contest-button'],
                      styles[`contest-button-${status}`],
                    )}
                    onClick={submitGoToRoom}
                  >
                    <ImEnter className="typography-menu" />
                    &nbsp;{TEXT_UI_CONTEST.ENTER_ROOM}
                  </Button>
                )}

                {status === CONTEST_STATUS.PLANNED && (
                  <Button
                    className={classnames(
                      'typography-menu-subtext',
                      styles['contest-button'],
                      styles[`contest-button-${status}`],
                      { 'contest-button-planned-added-to-calendar': isAlreadyRegistered },
                    )}
                    disabled={!is_open_registration}
                    onClick={submitRegister}
                  >
                    {isAlreadyRegistered ? (
                      <div className="align-content-center">
                        <FiUserCheck className="typography-menu" />
                        &nbsp;{TEXT_UI_CONTEST.REGISTERED}
                      </div>
                    ) : (
                      <div className="align-content-center">
                        <FiUserPlus className="typography-menu" />
                        &nbsp;{TEXT_UI_CONTEST.REGISTER}
                      </div>
                    )}
                  </Button>
                )}
              </>
            )}
          </Col>
        </Row>
      </div>
    </LoadingIndicator>
  )
}
/* eslint-enable camelcase */

const mapStateToProps = ({ authReducer: { currentUser } }) => ({
  currentUser,
})

export default connect(mapStateToProps)(ContestComponent)
