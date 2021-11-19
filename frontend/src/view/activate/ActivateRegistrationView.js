import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, Typography } from 'antd'
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons'
import { ErrorHandlerUtils, URLUtils } from 'utils'
import { FE_ROUTE, TEXT_UI_ERROR_PAGE } from 'config'
import { ActivateService } from 'service'
import { AlignCenterContent, LoadingIndicator } from 'component'
import styles from './style.module.scss'

const { Text, Title } = Typography

export default function ActivateRegistrationView(props) {
  const [isLoadingShown, setIsLoadingShown] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const queryParams = URLUtils.getParamsInURL()
    ActivateService.registration({ token: queryParams.token })
      .then((resp) => {
        setIsLoadingShown(false)
      })
      .catch((error) => {
        setIsLoadingShown(false)
        setErrorMessage(ErrorHandlerUtils.extractErrorMessage(error))
      })
  }, []) // run once in page loaded

  return (
    <AlignCenterContent>
      <LoadingIndicator isHidden={!isLoadingShown}>
        <div className={styles['activate-registration-view']}>
          {!isLoadingShown && (
            <>
              {errorMessage && (
                <div>
                  <Title level={3}>
                    {errorMessage} <CloseCircleTwoTone twoToneColor="red" />
                  </Title>
                  <Text>
                    <Link to={FE_ROUTE.DEFAULT_ROUTE} className="btn">
                      &larr; {TEXT_UI_ERROR_PAGE.GO_BACK}
                    </Link>
                  </Text>
                </div>
              )}
              {!errorMessage && (
                <div>
                  <Title level={3}>
                    Kích hoạt tài khoản thành công <CheckCircleTwoTone twoToneColor="#52c41a" />
                  </Title>
                  <Text>
                    <Link to={FE_ROUTE.AUTH.LOGIN} className="btn">
                      Đăng nhập
                    </Link>
                    &nbsp;để tiếp tục
                  </Text>
                </div>
              )}
            </>
          )}
        </div>
      </LoadingIndicator>
    </AlignCenterContent>
  )
}
