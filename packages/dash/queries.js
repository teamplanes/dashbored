const _ = require('lodash/fp')
const fetch = require('node-fetch')

const earth = str =>
  fetch(
    `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2018-01-01&endtime=2018-12-31&${str}`,
  ).then(res => res.json())

module.exports = [
  {
    title: 'Unicorns',
    default: true,
    queries: [
      {
        name: 'Number of unicorns',
        type: 'number',
        query: () => [{ value: 42 }],
      },
      {
        name: 'Number of species',
        type: 'number',
        query: () => [{ value: 5 }],
      },
      {
        name: 'Species of unicorns',
        type: 'pie',
        query: () => [
          { id: 'gingercorn', label: 'Gingercorn', value: 1 },
          { id: 'blondecorn', label: 'Blondecorn', value: 1 },
          { id: 'invisiblecorn', label: 'Invisiblecorn', value: 1 },
          { id: 'flycorn', label: 'Flycorn', value: 1 },
          { id: 'popcorn', label: 'Popcorn', value: 1 },
        ],
      },
      {
        name: 'Number of unicorns in the world',
        type: 'number',
        columns: { mobile: 1, tablet: 1, desktop: 2 },
        query: () => [{ value: 42 }],
      },
      {
        name: 'Average lifespan of each species',
        type: 'bar',
        columns: { mobile: 1, tablet: 2, desktop: 3 },
        nivoConfig: {
          margin: {
            top: 50,
            right: 10,
            bottom: 60,
            left: 60,
          },
          axisBottom: {
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Species',
            legendPosition: 'middle',
            legendOffset: 40,
          },
          axisLeft: {
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'lifespan',
            legendPosition: 'middle',
            legendOffset: -40,
          },
        },
        query: () => [
          { index: 'Gingercorn', value: 100 },
          { index: 'Blondecorn', value: 63 },
          { index: 'Invisiblecorn', value: 13 },
          { index: 'Flycorn', value: 45.5 },
          { index: 'Popcorn', value: 42 },
        ],
      },
      {
        name: '% of territory by species',
        type: 'pie',
        columns: { mobile: 1, tablet: 2, desktop: 3 },
        nivoConfig: { innerRadius: 0 },
        query: () => [
          { id: 'gingercorn', label: 'Gingercorn', value: 23 },
          { id: 'blondecorn', label: 'Blondecorn', value: 13 },
          { id: 'invisiblecorn', label: 'Invisiblecorn', value: 2 },
          { id: 'flycorn', label: 'Flycorn', value: 20 },
          { id: 'popcorn', label: 'Popcorn', value: 42 },
        ],
      },
      {
        name: 'average population by species over the month',
        type: 'line',
        nivoConfig: {
          curve: 'natural',
          yScale: {
            type: 'linear',
            stacked: false,
            min: 'auto',
            max: 'auto',
          },
          margin: {
            top: 50,
            right: 110,
            bottom: 60,
            left: 60,
          },
          axisBottom: {
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Days',
            legendPosition: 'middle',
            legendOffset: 40,
          },
          axisLeft: {
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Population',
            legendPosition: 'middle',
            legendOffset: -40,
          },
          legends: [
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ],
        },
        query: [
          [
            'Gingercorn',
            () => [
              { x: '2019-12-01', y: '12' },
              { x: '2019-12-06', y: '23' },
              { x: '2019-12-12', y: '76' },
              { x: '2019-12-18', y: '62' },
              { x: '2019-12-24', y: '22' },
              { x: '2019-12-30', y: '42' },
            ],
          ],
          [
            'Blondecorn',
            () => [
              { x: '2019-12-01', y: '4' },
              { x: '2019-12-06', y: '2' },
              { x: '2019-12-12', y: '12' },
              { x: '2019-12-18', y: '54' },
              { x: '2019-12-24', y: '90' },
              { x: '2019-12-30', y: '42' },
            ],
          ],
          [
            'Invisiblecorn',
            () => [
              { x: '2019-12-01', y: '45' },
              { x: '2019-12-06', y: '65' },
              { x: '2019-12-12', y: '32' },
              { x: '2019-12-18', y: '23' },
              { x: '2019-12-24', y: '67' },
              { x: '2019-12-30', y: '42' },
            ],
          ],
          [
            'Flycorn',
            () => [
              { x: '2019-12-01', y: '4' },
              { x: '2019-12-06', y: '7' },
              { x: '2019-12-12', y: '52' },
              { x: '2019-12-18', y: '22' },
              { x: '2019-12-24', y: '22' },
              { x: '2019-12-30', y: '42' },
            ],
          ],
          [
            'Popcorn',
            () => [
              { x: '2019-12-01', y: '42' },
              { x: '2019-12-06', y: '42' },
              { x: '2019-12-12', y: '42' },
              { x: '2019-12-18', y: '42' },
              { x: '2019-12-24', y: '42' },
              { x: '2019-12-30', y: '42' },
            ],
          ],
        ],
      },
      {
        name: 'Number of unicorns by month',
        type: 'bar',
        nivoConfig: {
          margin: {
            top: 50,
            right: 10,
            bottom: 60,
            left: 60,
          },
          axisBottom: {
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Month',
            legendPosition: 'middle',
            legendOffset: 40,
          },
          axisLeft: {
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Number of unicorns',
            legendPosition: 'middle',
            legendOffset: -40,
          },
        },
        query: () => [
          { index: 'January', value: 100 },
          { index: 'February', value: 63 },
          { index: 'March', value: 13 },
          { index: 'April', value: 45 },
          { index: 'May', value: 45 },
          { index: 'June', value: 23 },
          { index: 'July', value: 12 },
          { index: 'August', value: 43 },
          { index: 'September', value: 92 },
          { index: 'October', value: 15 },
          { index: 'November', value: 12 },
          { index: 'December', value: 72 },
        ],
      },
    ],
  },
  {
    title: 'EarthQuake in 2018',
    queries: [
      {
        name: 'Nb of earthquakes of magnitude > 6',
        type: 'number',
        columns: { mobile: 1, tablet: 2, desktop: 2 },
        query: () =>
          earth('minmagnitude=6').then(json => ({
            value: json.features.length,
          })),
      },
      {
        name: 'Nb of earthquakes by magnitude',
        type: 'bar',
        columns: { mobile: 1, tablet: 4, desktop: 4 },
        rows: { mobile: 3, tablet: 3, desktop: 2 },
        nivoConfig: {
          colors: 'set3',
          margin: {
            top: 50,
            right: 10,
            bottom: 60,
            left: 60,
          },
          axisBottom: {
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Magnitudes',
            legendPosition: 'middle',
            legendOffset: 40,
          },
          axisLeft: {
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Nb of earthquakes',
            legendPosition: 'middle',
            legendOffset: -40,
          },
        },
        query: () =>
          earth('minmagnitude=6').then(quakes =>
            _.flowRight(
              _.reduce.convert({ cap: false })((acc, v, k) => [...acc, { index: k, value: v }], []),
              _.mapValues(v => v.length),
              _.groupBy('properties.mag'),
            )(quakes.features),
          ),
      },
      {
        name: 'Nb earthquakes by magnitude > 4',
        type: 'pie',
        columns: { mobile: 1, tablet: 2, desktop: 2 },
        nivoConfig: {
          colors: 'set3',
          innerRadius: 0.5,
          enableSlicesLabels: true,
          enableRadialLabels: false,
          margin: {
            top: 10,
            bottom: 10,
            left: 10,
            right: 90,
          },
          legends: [
            {
              anchor: 'right',
              direction: 'column',
              translateX: 80,
              itemWidth: 60,
              itemHeight: 24,
              itemTextColor: '#999',
              symbolSize: 18,
              symbolShape: 'circle',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000',
                  },
                },
              ],
            },
          ],
        },
        query: () =>
          earth('minmagnitude=4').then(quakes =>
            _.flowRight(
              _.filter(v => v.value > 500),
              _.reduce.convert({ cap: false })(
                (acc, v, k) => [...acc, { id: k, label: k, value: v }],
                [],
              ),
              _.mapValues(v => v.length),
              _.groupBy('properties.mag'),
            )(quakes.features),
          ),
      },
      {
        name: 'Earthquakes in time',
        type: 'scatter',
        nivoConfig: {
          colors: 'greys',
          margin: {
            top: 50,
            right: 100,
            bottom: 60,
            left: 60,
          },
          yScale: {
            type: 'linear',
            min: 5.5,
            max: 'auto',
          },
          xScale: {
            type: 'time',
            format: '%m/%d/%Y',
            precision: 'day',
          },
          axisBottom: {
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Dates',
            legendPosition: 'middle',
            legendOffset: 40,
            format: '%Y-%m-%d',
          },
          axisLeft: {
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Magnitudes',
            legendPosition: 'middle',
            legendOffset: -40,
          },
          legends: [
            {
              anchor: 'bottom-right',
              direction: 'column',
              translateX: 130,
              itemWidth: 100,
              itemHeight: 12,
              itemsSpacing: 5,
              itemTextColor: '#999',
              symbolSize: 12,
              symbolShape: 'circle',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000',
                  },
                },
              ],
            },
          ],
        },
        query: () =>
          earth('minmagnitude=6').then(quakes =>
            _.flowRight(
              _.reduce.convert({ cap: false })((acc, v, k) => [...acc, { id: k, data: v }], []),
              _.mapValues(
                _.map(e => ({
                  x: new Date(_.get('properties.time', e)).toLocaleDateString('en', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  }),
                  y: _.get('properties.mag', e),
                })),
              ),
              _.groupBy('properties.title'),
            )(quakes.features),
          ),
      },
    ],
  },
]
