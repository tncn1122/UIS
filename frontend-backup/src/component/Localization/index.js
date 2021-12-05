import React from 'react'
import { ConfigProvider } from 'antd'
import { IntlProvider, addLocaleData } from 'react-intl'
import { connect } from 'react-redux'
import english from 'locale/en-US'
import vietnamese from 'locale/vi-VN'

addLocaleData(english.localeData)
addLocaleData(vietnamese.localeData)

const locales = {
  'en-US': english,
  'vi-VN': vietnamese,
}

/**
 *  https://ant.design/components/config-provider/
 */
class Localization extends React.Component {
  render() {
    const { children } = this.props
    const currentLocale = locales['vi-VN']
    return (
      <ConfigProvider locale={currentLocale.antdData}>
        <IntlProvider locale={currentLocale.locale} messages={currentLocale.messages}>
          {children}
        </IntlProvider>
      </ConfigProvider>
    )
  }
}

export default Localization
