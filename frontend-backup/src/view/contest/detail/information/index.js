import HtmlRender from 'component/HtmlRender'
import React, { useState, useEffect } from 'react'

export default function ContestInformation(props) {
  const { contest } = props

  return <HtmlRender htmlData={contest.information} />
}
