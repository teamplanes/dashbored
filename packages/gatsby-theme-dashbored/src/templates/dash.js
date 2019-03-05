import React from 'react'
import { map } from 'lodash/fp'

import Grid from '../components/grid'
import Header from '../components/header'
import Number from '../components/number'
import Pie from '../components/pie'
import Bar from '../components/bar'
import Line from '../components/line'
import Scatter from '../components/scatter'

const createDashboard = pageResult => {
  return (
    <>
      {map(({ type, ...rest }) => {
        switch (type) {
          case 'number':
            return <Number key={`number_${Math.random()}`} {...rest} />
          case 'pie':
            return <Pie key={`pie_${Math.random()}`} {...rest} />
          case 'line':
            return <Line key={`line_${Math.random()}`} {...rest} />
          case 'scatter':
            return <Scatter key={`line_${Math.random()}`} {...rest} />
          case 'bar':
            return <Bar key={`bar_${Math.random()}`} {...rest} />
          default:
            return <div key={`default_${Math.random()}`} />
        }
      }, pageResult)}
    </>
  )
}

const Dash = ({ pageContext: { result, title, uri } }) => {
  return (
    <React.Fragment>
      <Header title={title} />
      <Grid>{createDashboard(result)}</Grid>
    </React.Fragment>
  )
}

export default Dash
