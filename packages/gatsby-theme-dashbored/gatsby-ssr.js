import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'

import GlobalStyle from './styles'

export const replaceRenderer = ({ bodyComponent, replaceBodyHTMLString, setHeadComponents }) => {
  // React Context in SSR/build	  // React Context in SSR/build
  const ConnectedBody = () => (
    <>
      <GlobalStyle />
      {bodyComponent}
    </>
  )
  replaceBodyHTMLString(renderToString(<ConnectedBody />))

  // Add styled-components in SSR/build
  const sheet = new ServerStyleSheet()
  const bodyHTML = renderToString(sheet.collectStyles(<ConnectedBody />))
  const styleElement = sheet.getStyleElement()
  setHeadComponents(styleElement)
}
