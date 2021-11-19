import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'antd'
import { MiscUtils, ValidationUtils } from 'utils'
import { FE_ROUTE, TEXT_UI_CONTEST } from 'config'

export default function Ranking({ contestId, isPublic }) {
  const [rankingTop3, setRankingTop3] = useState(null)

  useEffect(() => {
    // query top 3 ranking by contestId
    setRankingTop3([
      {
        username: 'Pham Van A',
        score: 100,
      },
      {
        username: 'Nguyen Van B',
        score: 95,
      },
      {
        username: 'Tran Van C',
        score: 90,
      },
    ])
  }, [])

  return (
    <div className="width-100">
      <div className="typography-h5 ta-center color-primary bold">{TEXT_UI_CONTEST.RANKING}</div>
      {!ValidationUtils.empty(rankingTop3) && (
        <Row className="justify-content-center">
          {rankingTop3.map(({ username, score }, idx) => (
            <Col span="8" className="ta-center" key={MiscUtils.generateId()}>
              <span className="typography-small">
                {idx + 1}. {username} ({score})
              </span>
            </Col>
          ))}
        </Row>
      )}
      <Row className="justify-content-center">
        <Link
          to={`${FE_ROUTE.CONTEST.HOME}/${
            isPublic ? 'public' : 'private'
          }/${contestId}?tab=ranking`}
          className="text-underline typography-small"
        >
          {TEXT_UI_CONTEST.MORE}
        </Link>
      </Row>
    </div>
  )
}
