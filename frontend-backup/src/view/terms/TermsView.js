import React from 'react'
import ContentComponent from 'component/ContentComponent'
import { Card } from 'antd'
import CustomCard from 'component/CustomCard'
import { TEXT_UI_LAYOUT } from 'config'
import styles from './style.module.scss'

export default class TermsView extends React.Component {
  render() {
    return (
      <Card className={styles.terms}>
        <ContentComponent title={TEXT_UI_LAYOUT.FOOTER.TOS}>
          <CustomCard className={styles.body}>
            <div>
              <p>
                <span style={{ fontWeight: '400' }}>
                  Mỗi vòng (được gọi là Code Challenge) là một thử thách chuyên môn “khó nhằn” với
                  những chủ đề vô cùng thú vị.
                </span>
              </p>
              <p>
                <span style={{ fontWeight: '400' }}>Cấu trúc đề thi: Gồm 4 bài toán.</span>
              </p>
              <p>
                <span style={{ fontWeight: '400' }}>Thời gian làm bài: 2 tiếng.</span>
              </p>
              <p>
                <span style={{ fontWeight: '400' }}>
                  Ngôn ngữ: Thí sinh có thể sử dụng các ngôn ngữ lập trình như C, C++ 14, Java8,
                  JavaScript (Node.js), Python 2, Python 3, Pascal, Ruby để làm bài.
                </span>
              </p>
              <p>
                <span style={{ textDecoration: 'underline' }}>Hình thức tham dự:</span>
              </p>
              <ul>
                <li>
                  <span style={{ fontWeight: '400' }}>
                    Đăng ký dự thi cá nhân bằng cách đăng ký tài khoản tại www.codetour.vn (chỉ đăng
                    ký một lần cho tất cả các Code Challenge).
                  </span>
                </li>
                <li>
                  <span style={{ fontWeight: '400' }}>
                    Đối tượng tham dự: Tất cả các bạn đam mê lập trình, không giới hạn độ tuổi.
                  </span>
                </li>
                <li>
                  <span style={{ fontWeight: '400' }}>
                    Số lượng người tham dự:{' '}
                    <b>900 bạn đăng ký sớm nhất kể từ khi mở đăng ký phòng thi.</b>
                  </span>
                </li>
              </ul>
              <p>
                <span style={{ fontWeight: '400' }}>
                  <span style={{ textDecoration: 'underline' }}>Tiêu chuẩn chấm bài:</span>
                  theo tiêu chuẩn IOI và kết hợp thêm hệ số phụ penalty.<br></br>
                </span>
              </p>
              <p>
                <span style={{ fontWeight: '400' }}>
                  <span>
                    <span style={{ textDecoration: 'underline' }}>Cách thức chấm bài:</span>
                    bạn tham khảo tại&nbsp;
                    <span style={{ color: '#f15b50' }}>
                      <a
                        href="https://contest.bigocoder.com/help?view=judgement"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#f15b50' }}
                      >
                        https://contest.bigocoder.com/help?view=judgement
                      </a>
                    </span>
                  </span>
                </span>
              </p>
              <p>
                <span style={{ fontWeight: '400' }}>
                  <span style={{ textDecoration: 'underline' }}>Lưu ý</span>: Khi có tranh chấp xảy
                  ra, quyết định của BTC là quyết định cuối cùng.
                </span>
              </p>
            </div>
          </CustomCard>
        </ContentComponent>
      </Card>
    )
  }
}
