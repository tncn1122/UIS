import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd'
import { ErrorHandlerUtils, URLUtils, ValidationUtils } from 'utils'
import { TEXT_UI_CONTEST } from 'config'
import { ContestService } from 'service'
import ContestInformation from './information'
import ContestWaitingRoom from './waitingRoom'
import ContestRanking from './ranking'
import TopFilter from '../topFilter'

import styles from './style.module.scss'

const { TabPane } = Tabs

export default function ContestDetail({
  match: {
    params: { id },
  },
}) {
  const [currentTab, setCurrentTab] = useState(null)
  const [contest, setContest] = useState(null)

  useEffect(() => {
    const queryParams = URLUtils.getParamsInURL()
    const tabId = queryParams.tab
    setCurrentTab(ValidationUtils.empty(tabId) ? 'information' : tabId)
    ContestService.getById(id)
      .then((contestObject) => {
        setContest(contestObject)
      })
      .catch((error) => {
        ErrorHandlerUtils.http(error)
      })
  }, [])

  return (
    <div className={styles.content}>
      <TopFilter />
      {currentTab && contest && (
        <Tabs defaultActiveKey={currentTab} centered>
          <TabPane tab={TEXT_UI_CONTEST.INFORMATION} key="information">
            <ContestInformation contest={contest} />
          </TabPane>
          <TabPane tab={TEXT_UI_CONTEST.WAITING_ROOM} key="waitingRoom">
            <ContestWaitingRoom contest={contest} />
          </TabPane>
          <TabPane tab={TEXT_UI_CONTEST.RANKING} key="ranking">
            <ContestRanking contest={contest} />
          </TabPane>
        </Tabs>
      )}
    </div>
  )
}
