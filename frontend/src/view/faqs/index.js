import React, { useEffect, useState } from 'react'
import ContentComponent from 'component/ContentComponent'
import { Card, Row, Col, Spin } from 'antd'
import classnames from 'classnames'
import CustomCard from 'component/CustomCard'
import HtmlRender from 'component/HtmlRender'
import { ErrorHandlerUtils, MiscUtils } from 'utils'
import { FaqService } from 'service'
import { TEXT_FAQ, FE_ROUTE } from 'config'
import styles from './style.module.scss'
import './style.overwrite.scss'

// const faqInfo = [
//   {
//     question: 'Có giới hạn ngôn ngữ lập trình nào không?',
//     answer:
//       'Những ngôn ngữ lập trình được sử dụng là C, C++ 14, Java8, JavaScript (Node.js), Python 2, Python 3, Pascal, Ruby.',
//   },
//   {
//     question: 'Đăng ký tham gia có mất phí không?',
//     answer: 'Hoàn toàn miễn phí!',
//   },
//   {
//     question: 'Vào thi trễ có được không?',
//     answer:
//       'Bạn vẫn có thể thi bình thường nếu vào phòng sau khi cuộc thi bắt đầu vào lúc 19:00 ngày thi. Tuy nhiên, thời gian làm bài của bạn sẽ vẫn giới hạn trong khung giờ từ 19:00 đến 21:00. Do đó, bạn hãy cố gắng sắp xếp vào thi đúng giờ để tranh thủ thời gian làm bài của mình nhé!',
//   },
//   {
//     question: 'Dạng đề thi như thế nào?',
//     answer:
//       'Dạng đề thi là các bài toán về Thuật Toán và Tư duy giải quyết vấn đề. Mỗi vòng sẽ có số lượng bài toán nhất định được xây dựng theo nhiều chủ đề và mức độ điểm khác nhau tùy vào độ khó từng bài. Đề ở từng vòng thi độc lập với nhau và tổng điểm mỗi vòng là 100 điểm. Điểm được chấm trực tiếp trên hệ thống, đúng mỗi bộ dữ liệu sẽ được điểm tương ứng.',
//   },
// ]

const Faqs = (props) => {
  const [faqInfo, setFaqInfo] = useState([])
  const [currentSelected, setCurrentSelected] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    FaqService.getFaqs('vi')
      .then((resp) => {
        const { faqs } = resp
        setFaqInfo(faqs)
        setCurrentSelected(faqs[0])
        setLoading(false)
      })
      .catch((error) => {
        ErrorHandlerUtils.http(error)
        setLoading(false)
      })
  }, [])

  const handleSelection = (value) => {
    setCurrentSelected(value)
  }

  const generateFaqContent = (leftMenuConfig) =>
    leftMenuConfig.map((item) => (
      <a
        className={classnames(styles['faqs-question'], {
          'text-button-current-selected': item.id === currentSelected.id,
        })}
        onClick={() => handleSelection(item)}
        key={MiscUtils.generateId()}
      >
        {item.question}
      </a>
    ))

  return (
    <Card className={styles.faqs}>
      <ContentComponent title={TEXT_FAQ.LABEL}>
        <Spin spinning={loading}>
          <Row gutter={[32, 32]} className={styles['user-info-row']}>
            <Col span={6}>
              <CustomCard className={styles['faqs-card']}>
                {faqInfo.length > 0 ? generateFaqContent(faqInfo) : null}
              </CustomCard>
            </Col>
            <Col span={18}>
              <CustomCard id="answer-card" className={styles['faqs-card']}>
                {/* {currentSelected && currentSelected.answer} */}
                {currentSelected && <HtmlRender htmlData={currentSelected.answer} />}
              </CustomCard>
            </Col>
          </Row>
        </Spin>
      </ContentComponent>
    </Card>
  )
}

export default Faqs
