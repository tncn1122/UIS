import React from 'react'
import { Row, Col, Image, Timeline, Divider } from 'antd'
import { StarFilled } from '@ant-design/icons'
import aboutUs1 from 'asset/img/about-us/about-vng-1.jpeg'
import aboutUs2 from 'asset/img/about-us/about-vng-2.jpeg'
import aboutUs3 from 'asset/img/about-us/about-vng-3.jpeg'
import styles from './style.module.scss'

export default class AboutUsView extends React.Component {
  render() {
    return (
      <div className={styles.aboutUs}>
        <div>
          <Row justify="space-around">
            <Col span={12} className={styles.aboutChild}>
              <h2 className={styles.title}>Giới thiệu về VNG</h2>
              <div>
                VNG công ty công nghệ Việt Nam, thành lập vào ngày 9/9/2004 với 4 mảng sản phẩm
                chính là Trò chơi trực tuyến, Nền tảng kết nối, Thanh toán điện tử và Dịch vụ điện
                toán đám mây.[1] Sau 17 năm hoạt động, VNG hiện là công ty Internet và công nghệ
                hàng đầu, kỳ lân công nghệ 1 tỷ USD + duy nhất của Việt Nam.
              </div>
            </Col>
            <Col span={12} className={styles.aboutChild}>
              <Image className={styles.aboutImg} src={aboutUs2} />
            </Col>
          </Row>
          <Row>
            <Col span={12} className={styles.aboutChild}>
              <Image className={styles.aboutImg} src={aboutUs1} />
            </Col>
            <Col span={12} className={styles.aboutChild}>
              <h2 className={styles.title}>Tầm nhìn</h2>
              <div>
                VNG luôn khát khao tạo nên một công ty của người Việt Nam, mang thương hiệu Việt
                Nam, khẳng định sức mạnh về trí tuệ của của nòi giống con rồng cháu Việt trên thế
                giới.
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={12} className={styles.aboutChild}>
              <h2 className={styles.title}>Sứ mệnh</h2>
              <div>
                <p>
                  <span>
                    <strong>Đối với thị trường</strong>: Cung cấp các sản phẩm - dịch vụ của theo
                    tiêu chuẩn quốc tế, đồng thời mang nét độc đáo và sáng tạo cao đặc trưng của
                    người Việt
                  </span>
                </p>
                <p>
                  <span>
                    <strong>Đối với đối tác</strong>: Cam kết tinh thần hợp tác cùng phát triển.
                  </span>
                </p>
                <p>
                  <span>
                    <strong>Đối với nhân viên</strong>: Luôn đề cao và xây dựng môi trường làm việc
                    chuyên nghiệp, năng động, sáng tạo và nhân văn.
                  </span>
                </p>
                <p>
                  <span>
                    <strong>Đối với xã hội</strong>: Thể hiện tinh thần trách nhiệm công dân với
                    cộng đồng và giữ vững niềm tự hào dân tộc.
                  </span>
                </p>
              </div>
            </Col>
            <Col span={12} className={styles.aboutChild}>
              <Image className={styles.aboutImg} src={aboutUs3} />
            </Col>
          </Row>
        </div>
        <Divider />
        <div className={styles.story}>
          <h2 className={styles.title}>CÂU CHUYỆN CỦA CHÚNG TÔI</h2>
          <Timeline mode="alternate">
            <Timeline.Item className={styles.storyItem}>
              <h3>
                <strong>2004 - 2005</strong>
              </h3>
              <StarFilled /> Mở đường cho kỷ nguyên game nhập vai tại Việt Nam với thành công kỷ lục
              của Võ Lâm Truyền Kỳ: 20.000 PCU (lượng người chơi truy cập tại cùng một thời điểm).
            </Timeline.Item>

            <Timeline.Item className={styles.storyItem}>
              <h3>
                <strong>2006 - 2008</strong>
              </h3>
              <StarFilled /> Doanh thu năm 2006 đạt 17 triệu USD, gấp 6 lần năm 2005. Quy mô nhân sự
              tăng lên hơn 1000 người.<br></br>
              <StarFilled /> Năm 2007, khánh thành Trung tâm dữ liệu hiện đại nhất Việt Nam, làm chủ
              việc lưu trữ thông tin toàn bộ sản phẩm đang cung cấp.
            </Timeline.Item>

            <Timeline.Item className={styles.storyItem}>
              <h3>
                <strong>2009 - 2012</strong>
              </h3>
              <StarFilled /> Ra mắt mạng xã hội đầu tiên của Việt Nam: Zing Me.<br></br>
              <StarFilled /> Sản xuất thành công game thuần Việt MMO đầu tiên của Đông Nam Á: Thuận
              Thiên Kiếm.Doanh nghiệp Việt đầu tiên phát hành game ở nước ngoài khi xuất khẩu thành
              công game trực tuyến thuần Việt „Ủn ỉn“ sang Nhật Bản.<br></br>
              <StarFilled /> Giới thiệu bộ nhận diện thương hiệu mới với tên gọi „VNG“.<br></br>
              <StarFilled /> Bắt đầu đầu tư vào công cụ thanh toán cho các dịch vụ kinh doanh trực
              tuyến ngoài VNG.<br></br>
              <StarFilled /> Được vinh danh Doanh nghiệp nội dung số có Sản phẩm, Dịch vụ, Thương
              hiệu Việt Nam thành công nhất.<br></br>
            </Timeline.Item>

            <Timeline.Item className={styles.storyItem}>
              <h3>
                <strong>2013 - 2016</strong>
              </h3>
              <StarFilled /> Zing.vn chính thức trở thành báo điện tử Zing News, một trong những tờ
              báo điện tử đông độc giả nhất Việt Nam.<br></br>
              <StarFilled /> Đón nhận Huân chương Độc lập hạng Ba nhân dịp 10 năm thành lập. Tổng
              Giám đốc Lê Hồng Minh nhận bằng khen của Thủ tướng Chính phủ.<br></br>
              <StarFilled /> Được World Startup Report định giá 1 tỷ USD, trở thành Startup kỳ lân
              duy nhất của Việt Nam.<br></br>
              <StarFilled /> Được vinh danh “Doanh nghiệp phát triển nhanh toàn cầu tại khu vực Đông
              Á” tại Diễn đàn Kinh tế Thế giới 2015 (Manila, Philippines).<br></br>
            </Timeline.Item>

            <Timeline.Item className={styles.storyItem}>
              <h3>
                <strong>2017 - Now</strong>
              </h3>
              <StarFilled /> Có hơn 80 triệu người dùng tại 193 quốc gia với 15 ngôn ngữ.<br></br>
              <StarFilled /> Ký kết Bản ghi nhớ về việc niêm yết trên sàn chứng khoán Nasdaq (Mỹ).
              <br></br>
              <StarFilled /> Doanh thu và lợi nhuận năm 2017 cao kỷ lục kể từ khi thành lập.
              <br></br>
              <StarFilled /> Trở thành „Nhà phát hành hàng đầu khu vực Đông Nam Á“, chính thức khai
              trương văn phòng tại Thái Lan, Myanmar.<br></br>
              <StarFilled /> Xác định bổ sung các mảng kinh doanh chiến lược mới như Tài chính và
              thanh toán, Dịch vụ Đám mây.<br></br>
              <StarFilled /> Nền tảng Zalo cán mốc 100 triệu người dùng, không chỉ ở Việt Nam.
              <br></br>
            </Timeline.Item>
          </Timeline>
        </div>
      </div>
    )
  }
}
