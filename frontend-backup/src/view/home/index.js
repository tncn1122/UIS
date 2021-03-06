import React from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import banner1Logo from 'asset/img/home/banner-1-logo.png'
import { Button, Space, Typography, Row, Col } from 'antd'

import homeDeThi from 'asset/img/home/home-de-thi.png'
import homeGiaiThuong from 'asset/img/home/home-giai-thuong.png'
import homeHoatDong from 'asset/img/home/home-hoat-dong.png'
import homeTichLuy from 'asset/img/home/home-tich-luy.png'
import benefitTopRight from 'asset/img/home/benefit-top-right.png'
import benefitBottomLeft from 'asset/img/home/benefit-bottom-left.png'
import testimonialTopLeft from 'asset/img/home/testimonial-top-left.svg'
import logoVNG from 'asset/img/logo-brand/logo-vng.png'
import logoBigO from 'asset/img/logo-brand/logo-bigO.svg'
import uni01 from 'asset/img/logo-brand/university/01.jpg'
import uni02 from 'asset/img/logo-brand/university/02.png'
import uni03 from 'asset/img/logo-brand/university/03.png'
import uni04 from 'asset/img/logo-brand/university/04.jpg'
import uni05 from 'asset/img/logo-brand/university/05.png'
import uni06 from 'asset/img/logo-brand/university/06.png'
import uni07 from 'asset/img/logo-brand/university/07.png'
import uni08 from 'asset/img/logo-brand/university/08.png'
import { MiscUtils } from 'utils'
import { BenefitCard, PartnerCard, PRPartnerCard, ContestInfo, Testimonial } from 'component/home'
import './style.overwrite.scss'
import styles from './style.module.scss'
import { FE_ROUTE } from '../../config'

const { Text } = Typography

const sliderResponsiveSetting = [
  {
    breakpoint: 768,
    settings: {
      arrows: false,
      centerMode: true,
      centerPadding: '40px',
      slidesToShow: 2,
    },
  },
  {
    breakpoint: 480,
    settings: {
      arrows: false,
      centerMode: true,
      centerPadding: '40px',
      slidesToShow: 1,
    },
  },
]

const sliderPlaySetting = {
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2000,
  speed: 500,
}
const sliderSettingBanner = {
  ...sliderPlaySetting,
  slidesToShow: 1,
  slidesToScroll: 1,
  // arrows: true,  just in case there are many contests to slide in the future
  // https://stackoverflow.com/questions/49018820/custom-arrows-react-slick
  // nextArrow:<span>Next</span>,
  // prevArrow: <span>Previous</span>,
}

const sliderSettingTestimonial = {
  ...sliderPlaySetting,
  className: 'center',
  centerMode: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  dots: true,
  centerPadding: '60px',
  responsive: sliderResponsiveSetting,
}

const sliderSettingPRPartner = {
  ...sliderSettingTestimonial,
  slidesToShow: 4,
}

const LAYOUT_MAX_COLUMN = 24
// FACTS.length can be 3 4 6
const FACTS = [
  {
    count: '03',
    title: 'n??m ph??t tri???n',
  },
  {
    count: '23',
    title: 'Code Challenges ???????c t??? ch???c',
  },
  {
    count: '3,247',
    title: 'th?? sinh tham gia',
  },
]

const BENEFITS = [
  {
    title: 'Gi???i th?????ng h???p d???n',
    description:
      'Ph???n th?????ng d??nh cho c??c th?? sinh d???n ?????u ??? m???i k??? thi v?? c??c th??nh vi??n ho???t ?????ng t??ch c???c tr??n website.',
    imageUrl: homeGiaiThuong,
  },
  {
    title: '????? thi ch???t l?????ng',
    description:
      'Kho ????? thi v?? b??i t???p ??a d???ng gi??p b???n s??? n??ng cao t?? duy v?? ph??t tri???n k??? n??ng l???p tr??nh.',
    imageUrl: homeDeThi,
  },
  {
    title: 'K???t n???i & t????ng t??c',
    description:
      'Code Tour cho ph??p b???n d??? thi theo c?? nh??n v?? nh??m, th???o lu???n v?? chia s??? th??ng tin v???i c??c ch??? ????? ??a dang tr??n di???n ????n.',
    imageUrl: homeHoatDong,
  },
  {
    title: 'Kinh nghi???m & th??nh t??ch',
    description:
      'Th??nh vi??n t??ch c???c d??? thi, luy???n t???p v?? ????ng g??p tr??n di???n ????n s??? ???????c t??ch l??y kinh nghi???m v?? th??ng h???ng danh hi???u.',
    imageUrl: homeTichLuy,
  },
]

const CONTEST_MONTHS = [
  {
    title: 'Th??ng 9',
    value: 9,
  },
  {
    title: 'Th??ng 10',
    value: 10,
  },
  {
    title: 'Th??ng 11',
    value: 11,
  },
  {
    title: 'Th??ng 12',
    value: 12,
  },
]

const CONTESTS = [
  {
    name: 'Code Challenge #1',
    scheduleDate: '25/09/2021',
    scheduleTime: '19:30 - 21:30',
    isActive: false,
    location: 'codetour.vn',
    url: '/register',
  },
  {
    name: 'Code Challenge #2',
    scheduleDate: '25/10/2021',
    scheduleTime: '19:30 - 21:30',
    isActive: true,
    location: 'codetour.vn',
    url: '/register',
  },
  {
    name: 'Code Challenge #3',
    scheduleDate: '25/11/2021',
    scheduleTime: '19:30 - 21:30',
    isActive: false,
    location: 'codetour.vn',
    url: '/register',
  },
  {
    name: 'Code Challenge #4',
    scheduleDate: '25/12/2021',
    scheduleTime: '19:30 - 21:30',
    isActive: false,
    location: 'codetour.vn',
    url: '/register',
  },
]

const TESTIMONIALS = [
  {
    user: {
      photo: 'https://media.gettyimages.com/photos/beautiful-young-girl-picture-id574253449',
      fullName: 'Nguy???n Ho??ng Ph????ng 1',
    },
    testimonial:
      '????? b??i c???a Saigon Code Tour r???t kh??, nh??ng c?? c?? h???i giao l??u v?? ???????c code trong m???t kh??ng gian th?? v??? ???? ????? khi???n em ???m l??ng.',
    attendedContest: 'Tham d??? Code Tour 2018',
  },
  {
    user: {
      photo: 'https://media.gettyimages.com/photos/beautiful-young-girl-picture-id574253449',
      fullName: 'Nguy???n Ho??ng Ph????ng 2',
    },
    testimonial:
      '????? b??i c???a Saigon Code Tour r???t kh??, nh??ng c?? c?? h???i giao l??u v?? ???????c code trong m???t kh??ng gian th?? v??? ???? ????? khi???n em ???m l??ng.',
    attendedContest: 'Tham d??? Code Tour 2018',
  },
  {
    user: {
      photo: 'https://media.gettyimages.com/photos/beautiful-young-girl-picture-id574253449',
      fullName: 'Nguy???n Ho??ng Ph????ng 3',
    },
    testimonial:
      '????? b??i c???a Saigon Code Tour r???t kh??, nh??ng c?? c?? h???i giao l??u v?? ???????c code trong m???t kh??ng gian th?? v??? ???? ????? khi???n em ???m l??ng.',
    attendedContest: 'Tham d??? Code Tour 2018',
  },
  {
    user: {
      photo: 'https://media.gettyimages.com/photos/beautiful-young-girl-picture-id574253449',
      fullName: 'Nguy???n Ho??ng Ph????ng 4',
    },
    testimonial:
      '????? b??i c???a Saigon Code Tour r???t kh??, nh??ng c?? c?? h???i giao l??u v?? ???????c code trong m???t kh??ng gian th?? v??? ???? ????? khi???n em ???m l??ng.',
    attendedContest: 'Tham d??? Code Tour 2018',
  },
  {
    user: {
      photo: 'https://media.gettyimages.com/photos/beautiful-young-girl-picture-id574253449',
      fullName: 'Nguy???n Ho??ng Ph????ng 5',
    },
    testimonial:
      '????? b??i c???a Saigon Code Tour r???t kh??, nh??ng c?? c?? h???i giao l??u v?? ???????c code trong m???t kh??ng gian th?? v??? ???? ????? khi???n em ???m l??ng.',
    attendedContest: 'Tham d??? Code Tour 2018',
  },
]

const PARTNERS = [
  {
    title: '????n v??? b???o tr???',
    url: 'https://www.vng.com.vn',
    imageUrl: logoVNG,
  },
  {
    title: '?????i t??c chuy??n m??n',
    url: 'https://www.google.com.vn',
    imageUrl: logoBigO,
    isSmallImage: true,
  },
]

const PR_PARTNERS = [
  {
    title: '01',
    url: 'http://dut.udn.vn/',
    imageUrl: uni01,
    isSmallImage: true,
  },
  {
    title: '02',
    url: 'https://www.hust.edu.vn/',
    imageUrl: uni02,
    isSmallImage: true,
  },
  {
    title: '03',
    url: 'https://www.hcmut.edu.vn/',
    imageUrl: uni03,
    isSmallImage: true,
  },
  {
    title: '04',
    url: 'https://www.uit.edu.vn/',
    imageUrl: uni04,
    isSmallImage: true,
  },
  {
    title: '05',
    url: 'https://uet.vnu.edu.vn/',
    imageUrl: uni05,
    isSmallImage: true,
  },
  {
    title: '06',
    url: 'https://portal.ptit.edu.vn/',
    imageUrl: uni06,
    isSmallImage: true,
  },
  {
    title: '07',
    url: 'https://www.rmit.edu.vn/',
    imageUrl: uni07,
  },
  {
    title: '08',
    url: 'https://ued.udn.vn/',
    imageUrl: uni08,
    isSmallImage: true,
  },
]

class Home extends React.Component {
  state = {
    contestMonthSelected: 10,
  }

  selectContestMonth = (month) => {
    this.setState({ contestMonthSelected: month })
  }

  render() {
    const { contestMonthSelected } = this.state
    return (
      <div className={styles['home-view']}>
        {/* ------ Banners ------ */}
        <div id="banners" className={styles.banners}>
          <Slider {...sliderSettingBanner}>
            {[1].map((order) => (
              <div className={styles.banner1} key={MiscUtils.generateId()}>
                <Row>
                  <Col span={7} offset={5} className={styles['info-left']}>
                    <div className="ta-center">
                      <h1 className="h1">Code Tour 2021</h1>
                      <h1 className="h1-mid">challenge #1</h1>
                      <h3 className="h3">01/06/2021 | VNG Campus HCM City</h3>
                      <div>
                        <Button type="primary" size="large">
                          <Link to={FE_ROUTE.CONTEST.HOME}>Tham gia ngay</Link>
                        </Button>
                      </div>
                    </div>
                  </Col>
                  <Col span={7} className={styles.logo}>
                    <img src={banner1Logo} alt="banner-1" />
                  </Col>
                </Row>
              </div>
            ))}
          </Slider>
        </div>
        {/* ------ Banners: End ------ */}

        <div className={styles.content}>
          {/* ------ What's new ------ */}
          <div id="whatsNew" className={styles['whats-new']}>
            <div className="ta-center">
              <p className="typography-subtitle-bold">
                Code Tour - N???n t???ng ph??t tri???n t?? duy l???p tr??nh & k???t n???i c???ng ?????ng y??u c??ng ngh???
              </p>
              <Text className="display-block">
                Code Tour l?? n???n t???ng cung c???p nh???ng k??? thi v?? b??i t???p ch???t l?????ng, gi??p c??c th??nh
                vi??n (Codee) n??ng cao t?? duy trong vi???c l???p tr??nh, ?????ng th???i k???t n???i c???ng ?????ng y??u
                c??ng ngh??? ????? c??c th??nh vi??n c??ng h???c h???i, trao ?????i v?? chia s??? kinh nghi???m l???n nhau.
              </Text>

              <Row className={styles.facts}>
                {FACTS.map((fact) => (
                  <Col span={LAYOUT_MAX_COLUMN / FACTS.length} key={MiscUtils.generateId()}>
                    <h1 className={styles['fact-num-big']}>{fact.count}</h1>
                    <h2 className={classnames(styles['fact-num'], 'typography-h2')}>
                      {fact.count}
                    </h2>
                    <Text>{fact.title}</Text>
                  </Col>
                ))}
              </Row>

              <iframe
                title="Code Tour Quick look"
                width="900"
                height="510"
                src="https://www.youtube.com//embed/tn9BIB-Jg8g"
              />
            </div>
          </div>
          {/* ------ What's new: end ------ */}

          {/* ------ Benefit and contest ------ */}
          <div className={styles['benefit-and-contest']}>
            <img src={benefitTopRight} alt="top-right" className={styles['img-top-right']} />
            <img src={benefitBottomLeft} alt="bottom-left" className={styles['img-bottom-left']} />
            {/* ------ Benefit ------ */}
            <div className="mb-90">
              <p className="ta-center mb-50 typography-subtitle-bold">Code Tour c?? g?? h???p d???n?</p>
              <>
                <Row gutter={[20, 50]}>
                  {BENEFITS.map((benefit) => (
                    <Col span={12} key={MiscUtils.generateId()}>
                      <BenefitCard
                        title={benefit.title}
                        description={benefit.description}
                        imageUrl={benefit.imageUrl}
                      />
                    </Col>
                  ))}
                </Row>
              </>
            </div>
            {/* ------ Contest ------ */}
            <div>
              <p className="mb-30 typography-subtitle-bold">C??c cu???c thi n???i b???t</p>
              {
                // at the moment, we hide it because we don't have much contests
                false && (
                  <div className="mb-30">
                    <Space>
                      {CONTEST_MONTHS.map((month) => (
                        <Button
                          key={MiscUtils.generateId()}
                          className={styles['btn-round']}
                          type={contestMonthSelected === month.value ? 'primary' : 'default'}
                          onClick={() => this.selectContestMonth(month.value)}
                        >
                          {month.title}
                        </Button>
                      ))}
                    </Space>
                  </div>
                )
              }

              <div>
                {/* todo: handle if there is more than 5 contests: sliding left & right? */}
                <Space size={10}>
                  {CONTESTS.map((contest) => (
                    <ContestInfo key={MiscUtils.generateId()} hoverable contest={contest} />
                  ))}
                </Space>
              </div>
            </div>
          </div>
          {/* ------ Benefit and contest: END ------ */}

          {/* ------ Testimonials ------ */}
          <div className="testimonials">
            <img src={testimonialTopLeft} alt="icon" />
            <p className="typography-subtitle-bold">C???m nh???n c???a th?? sinh</p>
            <Slider {...sliderSettingTestimonial}>
              {TESTIMONIALS.map((testimonial) => (
                <Testimonial testimonial={testimonial} key={MiscUtils.generateId()} />
              ))}
            </Slider>
          </div>
          {/* ------ Testimonials: END ------ */}

          {/* ------ Partners ------ */}
          <div className={styles.partners}>
            <h2 className="typography-subtitle-bold">????n v??? ?????ng h??nh</h2>
            <Row>
              <Col span={6} offset={3}>
                <PartnerCard {...PARTNERS[0]} />
              </Col>
              <Col span={6} offset={6}>
                <PartnerCard {...PARTNERS[1]} />
              </Col>
            </Row>
          </div>
          {/* ------ Partners: END ------ */}

          {/* ------ PR partners ------ */}
          <div className={styles['pr-partners']}>
            <p className="pb-20 display-block typography-h3">?????i t??c truy???n th??ng</p>
            <Slider {...sliderSettingPRPartner}>
              {PR_PARTNERS.map((partner) => (
                <PRPartnerCard key={MiscUtils.generateId()} {...partner} />
              ))}
            </Slider>
          </div>
          {/* ------ PR partners: END ------ */}
        </div>
      </div>
    )
  }
}

export default Home
