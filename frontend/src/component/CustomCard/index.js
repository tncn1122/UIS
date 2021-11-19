import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'

const CustomCard = (props) => {
  const {
    children,
    bordered,
    title,
    extra,
    headStyle,
    style,
    bodyStyle,
    className,
    hoverable,
    cover,
    actions,
    loading,
    size,
    tabList,
  } = props

  const [currentTab, setcurrentTab] = useState('details')

  const onTabChange = (key) => {
    setcurrentTab(key)
  }

  return (
    <div>
      <Card
        bordered={bordered}
        title={title}
        headStyle={headStyle}
        style={style}
        bodyStyle={bodyStyle}
        extra={extra}
        className={className}
        hoverable={hoverable}
        cover={cover}
        actions={actions}
        loading={loading}
        size={size}
        activeTabKey={currentTab}
        tabList={tabList}
        onTabChange={onTabChange}
      >
        {children || 'Empty Content'}
      </Card>
    </div>
  )
}

CustomCard.propTypes = {
  bordered: PropTypes.bool,
  title: PropTypes.string,
  extra: PropTypes.node,
  headStyle: PropTypes.object,
  style: PropTypes.object,
  bodyStyle: PropTypes.object,
  className: PropTypes.string,
  hoverable: PropTypes.bool,
  cover: PropTypes.node,
  actions: PropTypes.array,
  loading: PropTypes.bool,
  size: PropTypes.string,
  tabList: PropTypes.array,
}

CustomCard.defaultProps = {
  bordered: true,
  title: '',
  extra: null,
  headStyle: {
    fontWeight: 500,
    fontSize: 18,
    style: 'normal',
    backgroundColor: '#FFF',
  },
  style: {
    padding: '30px',
    borderColor: '#C4C4C4',
    borderRadius: '10px',
  },
  bodyStyle: {
    padding: '10px',
    fontWeight: 400,
    fontSize: 14,
  },
  className: null,
  hoverable: false,
  cover: null,
  actions: null,
  loading: false,
  size: 'default',
  tabList: [],
}

export default CustomCard
