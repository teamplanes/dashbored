import React from 'react'
import reset from 'styled-reset'
import { renderToString } from 'react-dom/server'
import { createGlobalStyle, ServerStyleSheet } from 'styled-components'
import Typography from 'typography'
import doelger from 'typography-theme-doelger'

const typography = new Typography(doelger)
const GlobalStyle = createGlobalStyle`

  ${typography.createStyles()}

  *{box-sizing: border-box;}
  #___gatsby{
    display:flex;
    flex:1;
  }
  #___gatsby>div{
    display:flex;
    flex-direction: column;
    flex:1;
  }
`

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
