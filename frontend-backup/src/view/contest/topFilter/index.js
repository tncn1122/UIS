import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input } from 'antd'
import { FE_ROUTE, TEXT_UI_CONTEST } from 'config'
import { URLUtils } from 'utils'
import iconSearch from 'asset/img/icon/search.svg'
import styles from './style.module.scss'

export default function TopFilter() {
  const [isPublic, setIsPublic] = useState(true)

  useEffect(() => {
    const currentPathname = URLUtils.getPathnameInURL()
    setIsPublic(currentPathname.indexOf(FE_ROUTE.CONTEST.PUBLIC) === 0)
  }, [])

  return (
    <>
      <div className={styles['switch-buttons']}>
        <Button className={[styles.btn, isPublic ? styles.active : ''].join(' ')}>
          <Link to={FE_ROUTE.CONTEST.PUBLIC}>
            <span className="typography-menu transform-uppercase">{TEXT_UI_CONTEST.PUBLIC}</span>
          </Link>
        </Button>
        <Button className={[styles.btn, !isPublic ? styles.active : ''].join(' ')}>
          <Link to={FE_ROUTE.CONTEST.PRIVATE}>
            <span className="typography-menu transform-uppercase">{TEXT_UI_CONTEST.PRIVATE}</span>
          </Link>
        </Button>
      </div>

      <div className={styles['search-challenge']}>
        <Input
          size="large"
          suffix={<img alt="search-icon" src={iconSearch} />}
          placeholder={isPublic ? 'Tìm tên cuộc thi...' : 'Nhập mã chia sẻ'}
        />
      </div>
    </>
  )
}
