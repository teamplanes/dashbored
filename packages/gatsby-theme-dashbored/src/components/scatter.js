import React from 'react'
import { ResponsiveScatterPlot } from '@nivo/scatterplot'

import Block from '../components/block'
import Label from '../components/label'

const ScatterPlot = ({ result, name, ...rest }) => {
  const props = {
    data: result,
    yScale: {
      type: 'linear',
      min: 0,
      max: 'auto',
    },
    xScale: {
      type: 'linear',
      min: 0,
      max: 'auto',
    },
    axisBottom: {
      format: v => (rest.shortLabel ? v.substring(0, rest.shortLabel) : v),
    },
    ...rest.nivoConfig,
  }
  return (
    <Block c={rest.column || 6} r={rest.row || 2} ps="stretch">
      <Label>{name}</Label>
      <ResponsiveScatterPlot {...props} />
    </Block>
  )
}
export default ScatterPlot
