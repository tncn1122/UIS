import React, { useState, useEffect } from 'react'
import { Pagination } from 'antd'
import { ErrorHandlerUtils, ValidationUtils } from 'utils'
import { ContestService } from 'service'
import { LoadingIndicator } from 'component'
import ContestComponent from '../contestComponent'
import TopFilter from '../topFilter'
import styles from './style.module.scss'

export default function PublicContest() {
  const [contests, setContests] = useState(null)
  const [isLoadingShown, setIsLoadingShown] = useState(false)

  useEffect(() => {
    setIsLoadingShown(true)
    ContestService.getPublic()
      .then((contestList) => {
        setIsLoadingShown(false)
        setContests(contestList)
      })
      .catch((error) => {
        setIsLoadingShown(false)
        ErrorHandlerUtils.http(error)
      })
  }, [])

  return (
    <LoadingIndicator isHidden={!isLoadingShown}>
      <div className={styles.content}>
        <TopFilter />
        {!ValidationUtils.empty(contests) && (
          <>
            <div className={styles['challenge-list']}>
              {contests.map((contest) => (
                <ContestComponent contest={contest} />
              ))}
            </div>
            <div className={styles.pagination}>
              <Pagination defaultCurrent={1} total={1} />
            </div>
          </>
        )}
      </div>
    </LoadingIndicator>
  )
}
