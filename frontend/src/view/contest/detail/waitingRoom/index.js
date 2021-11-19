import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { Card, Button } from 'antd'
import { CONTEST_STATUS, FE_ROUTE } from 'config'
import { CountDownNumberic, LoadingIndicator } from 'component'
import { ContestService } from 'service'
import { DateTimeUtils, ErrorHandlerUtils, URLUtils, ValidationUtils } from 'utils'
import HtmlRender from 'component/HtmlRender'

function ContestWaitingRoom({ currentUser, contest }) {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)

  /* eslint-disable camelcase */
  useEffect(() => {
    // todo: nen check status la sap dien ra nua
    // if (!contest) return
    // const { id, is_public, event_time_begin } = contest
    // if (
    //   DateTimeUtils.addToDate(DateTimeUtils.now(), '15m') >
    //   DateTimeUtils.textToDate(event_time_begin)
    // ) {
    //   const counter = setInterval(() => {
    //     if (DateTimeUtils.now() > DateTimeUtils.textToDate(event_time_begin)) {
    //       clearInterval(counter)
    //       URLUtils.moveToURL(
    //         `${FE_ROUTE.CONTEST.HOME}/${is_public ? 'public' : 'private'}/${id}?tab=waitingRoom`,
    //       )
    //     }
    //   }, 10000)
    // }
  }, [])
  /* eslint-enable camelcase */

  const visitRoom = () => {
    if (ValidationUtils.empty(currentUser))
      history.push(`${FE_ROUTE.AUTH.LOGIN}?next=${URLUtils.getPathnameInURL()}`)
    // login already
    setIsLoading(true)
    ContestService.visitRoom({ id: contest.id })
      .then((url) => {
        URLUtils.moveToURL(url)
      })
      .catch((error) => {
        setIsLoading(false)
        ErrorHandlerUtils.http(error)
      })
  }

  return (
    <LoadingIndicator isHidden={!isLoading}>
      <Card className="ta-center">
        <h4>Phòng thi sẽ bắt đầu sau</h4>
        <div className="m-t-20 m-b-20 align-content-center">
          {contest && (
            <CountDownNumberic
              targetTime={contest.event_time_begin}
              isDisabled={
                contest.status === CONTEST_STATUS.PAST || contest.status === CONTEST_STATUS.ONGOING
              }
            />
          )}
        </div>

        <HtmlRender htmlData={contest.waiting_room} />
        <br></br>
        {contest && contest.status === CONTEST_STATUS.ONGOING && (
          <Button type="primary" size="large" className="m-t-20" onClick={visitRoom}>
            Vào phòng thi
          </Button>
        )}
      </Card>
    </LoadingIndicator>
  )
}

const mapStateToProps = ({ authReducer: { currentUser } }) => ({ currentUser })
export default connect(mapStateToProps)(ContestWaitingRoom)
