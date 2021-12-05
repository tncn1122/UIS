import React from 'react'
import { Redirect } from 'react-router-dom'
import { FE_ROUTE } from 'config'

export default function Contest() {
  return <Redirect to={FE_ROUTE.CONTEST.PUBLIC} />
}
