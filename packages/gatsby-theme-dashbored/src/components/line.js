import React from 'react'
import { ResponsiveLine } from '@nivo/line'

import Block from '../components/block'
import Label from '../components/label'

const Line = ({ result, name, ...rest }) => {
  const props = {
    data: result,
    xScale: {
      type: 'point',
    },
    yScale: {
      type: 'linear',
      stacked: false,
    },
    curve: 'monotoneX',
    enableDots: false,
    enableGridX: false,
    axisBottom: {
      format: v => (rest.shortLabel ? v.substring(0, rest.shortLabel) : v),
    },
    tooltip: slice => (
      <div style={{ color: 'black' }}>
        <div style={{ marginBottom: 8 }}>{slice.id}</div>
        <hr style={{ marginBottom: 8 }} />
        {slice.data.map(d => (
          <div
            key={d.serie.id}
            style={{
              display: 'flex',
              padding: '2px 0',
              color: 'black',
            }}
          >
            <div
              style={{ marginRight: 8, width: 20, height: 20, backgroundColor: d.serie.color }}
            />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {d.serie.id}: {d.data.y}
            </div>
          </div>
        ))}
      </div>
    ),
    ...rest.nivoConfig,
  }
  return (
    <Block
      columns={rest.columns || { mobile: 1, tablet: 2, desktop: 6 }}
      rows={rest.rows || { mobile: 4, tablet: 3, desktop: 2 }}
    >
      <Label>{name}</Label>
      <ResponsiveLine {...props} />
    </Block>
  )
}
export default Line
