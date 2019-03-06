import React from 'react'
import { isArray } from 'lodash/fp'
import styled from 'styled-components'

import Block from './block'
import Label from './label'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Value = styled.span`
  font-size: 4rem;
  font-weight: bold;
  line-height: 80px;
`

const Number = ({ result, name, ...rest }) => (
  <Block
    columns={rest.columns || { mobile: 1, tablet: 1, desktop: 1 }}
    rows={rest.rows || { mobile: 1, tablet: 1, desktop: 1 }}
    align="start"
  >
    <Container>
      <Value>{(isArray(result) ? result[0].value : result.value) || 0}</Value>
      <Label>{name}</Label>
    </Container>
  </Block>
)

export default Number
