const fetch = require('node-fetch')

module.exports = [
  {
    title: 'Knowledge of the Beers',
    default: true,
    queries: [
      {
        name: 'Number of beers',
        type: 'number',
        query: () =>
          fetch('https://api.punkapi.com/v2/beers')
            .then(res => res.json())
            .then(json => json.length)
            .then(l => ({ value: l })),
      },
      {
        name: 'Average abv of beers',
        type: 'number',
        query: () =>
          fetch('https://api.punkapi.com/v2/beers')
            .then(res => res.json())
            .then(json => json.reduce((acc, beer) => acc + beer.abv, 0) / json.length)
            .then(l => ({ value: parseFloat(l.toFixed(2)) })),
      },
      {
        name: 'Malts in all beers',
        type: 'pie',
        nivoConfig: {
          enableRadialLabels: false,
        },
        query: () =>
          fetch('https://api.punkapi.com/v2/beers')
            .then(res => res.json())
            .then(json =>
              json.reduce((acc, beer) => {
                const malts = beer.ingredients.malt.map(m => m.name)
                return malts.reduce((ms, m) => ({ ...ms, [m]: ms[m] ? ms[m] + 1 : 1 }), acc)
              }, {}),
            )
            .then(malts => Object.keys(malts).map(k => ({ id: k, label: k, value: malts[k] }))),
      },
      {
        name: 'Not so relevant data line chart on beers',
        type: 'line',
        shortLabel: 5,
        nivoConfig: {
          curve: 'linear',
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
            left: 90,
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
            'ABV',
            () =>
              fetch('https://api.punkapi.com/v2/beers')
                .then(res => res.json())
                .then(json => json.map(beer => ({ y: beer.abv || 0, x: beer.name }))),
          ],
          [
            'IBU',
            () =>
              fetch('https://api.punkapi.com/v2/beers')
                .then(res => res.json())
                .then(json => json.map(beer => ({ y: beer.ibu || 0, x: beer.name }))),
          ],
          [
            'SRM',
            () =>
              fetch('https://api.punkapi.com/v2/beers')
                .then(res => res.json())
                .then(json => json.map(beer => ({ y: beer.srm || 0, x: beer.name }))),
          ],
          [
            'EBC',
            () =>
              fetch('https://api.punkapi.com/v2/beers')
                .then(res => res.json())
                .then(json => json.map(beer => ({ y: beer.ebc || 0, x: beer.name }))),
          ],
          [
            'PH',
            () =>
              fetch('https://api.punkapi.com/v2/beers')
                .then(res => res.json())
                .then(json => json.map(beer => ({ y: beer.ph || 0, x: beer.name }))),
          ],
          [
            'Attenuation level',
            () =>
              fetch('https://api.punkapi.com/v2/beers')
                .then(res => res.json())
                .then(json =>
                  json.map(beer => ({
                    y: beer.attenuation_level || 0,
                    x: beer.name,
                  })),
                ),
          ],
        ],
      },
      {
        name: 'ABV for beers',
        type: 'bar',
        shortLabel: 5,
        nivoConfig: {
          margin: {
            top: 50,
            right: 10,
            bottom: 60,
            left: 90,
          },
        },
        query: () =>
          fetch('https://api.punkapi.com/v2/beers')
            .then(res => res.json())
            .then(json =>
              json.map(b => ({
                index: b.name,
                label: b.name,
                value: b.abv,
              })),
            ),
      },
    ],
  },
]
