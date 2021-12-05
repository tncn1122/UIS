import React, { useState } from 'react'
import { Pagination } from 'antd'
import { ValidationUtils } from 'utils'
import { LoadingIndicator } from 'component'
import ContestComponent from '../contestComponent'
import TopFilter from '../topFilter'
import styles from './style.module.scss'

export default function PrivateContest() {
  const [contests, setContests] = useState(null)
  const [isLoadingShown, setIsLoadingShown] = useState(false)

  return (
    <LoadingIndicator isHidden={!isLoadingShown}>
      <div className={styles.content}>
        <TopFilter />
        {ValidationUtils.empty(contests) ? (
          <div className="ta-center">
            Bạn vui lòng nhập mã chia sẻ do Ban Tổ Chức cung cấp để tham gia Kỳ thi Riêng tư
          </div>
        ) : (
          <>
            <div>
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
