import React from 'react'
import PropTypes from 'prop-types'
import { Card, Typography, Avatar } from 'antd'

const { Text } = Typography
const { Meta } = Card

function BenefitCard(props) {
  const { title, description, imageUrl } = props

  return (
    <>
      <Meta
        className="benefitCard"
        title={
          <p className="typography-h3 bold" strong>
            {title}
          </p>
        }
        description={<Text>{description}</Text>}
        avatar={<Avatar shape="square" size={80} src={imageUrl} />}
      />
    </>
  )
}

BenefitCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
}

export default BenefitCard
