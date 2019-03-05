import React from 'react'
import reset from 'styled-reset'
import { createGlobalStyle } from 'styled-components'
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

export const wrapRootElement = ({ element }) => (
  <>
    <GlobalStyle />
    {element}
  </>
)
