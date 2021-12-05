import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import HighlightNotification from 'component/Notifications/HighlightNotification'
import { Button } from 'antd'
import { FE_ROUTE } from 'config'
import Header from './header'
import Footer from './footer'
import styles from './style.module.scss'

export default function Layout({ children }) {
  const [news, setNews] = useState('')
  const [newsAction, setNewsAction] = useState(<> button</>)

  useEffect(() => {
    // set default news
    setNews(
      <span className="typography-h3">
        Code Challenge #1 sẽ diễn ra vào lúc 19h00 ngày 01/06/2021
      </span>,
    )
    // set news action
    setNewsAction(
      <Link to={FE_ROUTE.AUTH.REGISTER}>
        <Button type="notification" className="typography-small">
          Đăng ký ngay
        </Button>
      </Link>,
    )
  }, [])

  const notiDisplay = useMemo(() => (news ? 'inline-flex' : 'none'), [news])

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.body}>
        <HighlightNotification
          style={{ display: notiDisplay }}
          news={news}
          action={newsAction}
          onClose={() => setNews('')}
        />

        {children}
      </div>
      <Footer />
    </div>
  )
}
