import React from 'react'
import styled from 'styled-components'
import { ResponsivePie } from '@nivo/pie'

import Block from './block'
import Label from './label'

const Container = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const NoResult = styled(Label)`
  opacity: 0.3;
`

const Pie = ({ name, result, ...rest }) => {
  const props = {
    margin: {
      top: 30,
      bottom: 30,
      right: 30,
      left: 30,
    },
    innerRadius: 0.5,
    padAngle: 0.5,
    cornerRadius: 2,
    radialLabel: e => `${rest.shortLabel ? e.label.substring(0, rest.shortLabel) : e.label}`,
    enableSlicesLabels: false,
    colors: 'nivo',
    colorBy: 'label',
    data: result,
    ...rest.nivoConfig,
  }
  return (
    <Block
      columns={rest.columns || { mobile: 1, tablet: 2, desktop: 3 }}
      rows={rest.rows || { mobile: 3, tablet: 2, desktop: 2 }}
      align="center"
    >
      <Label>{name}</Label>
      {result.length === 0 ? (
        <Container>
          <NoResult>No result</NoResult>
        </Container>
      ) : (
        <ResponsivePie {...props} />
      )}
    </Block>
  )
}
export default Pie
