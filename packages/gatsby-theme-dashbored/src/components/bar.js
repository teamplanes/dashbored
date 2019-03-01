import React from 'react'
import {
  map,
  filter,
  keys,
  values,
  omit,
  flatten,
  sortBy,
  uniq,
  mapKeys,
  findIndex,
  reduce,
  tap,
  trim,
  flowRight,
  groupBy,
} from 'lodash/fp'
import { ResponsiveBar } from '@nivo/bar'

import Block from '../components/block'
import Label from '../components/label'

let sortBar = []
const barTx = flowRight(
  sortBy(r => findIndex(i => i === r.index, sortBar)),
  map(omit('null')),
  reduce.convert({ cap: false })((acc, value, key) => {
    return [
      ...acc,
      {
        index: key,
        ...value.reduce(
          (a, i) => ({ ...a, [i.label ? i.label : i.index]: parseInt(i.value, 10) }),
          {},
        ),
      },
    ]
  }, []),
  mapKeys(trim),
  groupBy('index'),
  tap(
    flowRight(
      tap(r => {
        sortBar = r
      }),
      uniq,
      map(v => v.index),
    ),
  ),
)

const barKeys = flowRight(
  uniq,
  flatten,
  map(filter(i => i !== 'index')),
  map(keys),
  values,
)
const Bar = ({ name, result, ...rest }) => {
  const data = barTx(result)
  const props = {
    data,
    keys: barKeys(data),
    layout: 'vertical',
    groupMode: 'stacked',
    enableLabel: false,
    indexBy: 'index',
    padding: 0.3,
    colors: 'nivo',
    colorBy: 'id',
    axisBottom: {
      format: v => (rest.shortLabel ? v.substring(0, rest.shortLabel) : v),
    },
    tooltip: slice => (
      <div style={{ color: 'black' }}>
        <div
          style={{
            display: 'flex',
            padding: '2px 0',
            color: 'black',
          }}
        >
          <div style={{ marginRight: 8, width: 20, height: 20, backgroundColor: slice.color }} />
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {slice.id}: {slice.value}
          </div>
        </div>
      </div>
    ),
    ...rest.nivoConfig,
  }
  return (
    <Block c={6} r={2} ps="stretch">
      <Label>{name}</Label>
      <ResponsiveBar {...props} />
    </Block>
  )
}

export default Bar
