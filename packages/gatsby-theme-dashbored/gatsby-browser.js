import React from 'react'
import GlobalStyle from './styles'

export const wrapRootElement = ({ element }) => (
  <>
    <GlobalStyle />
    {element}
  </>
)
