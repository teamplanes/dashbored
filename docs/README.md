# Dashbored

[Demo](http://localhost:8000)

# Install

If your creating your project you can use the gatsby cli or just create a project with yarn/npm:

```shell
yarn init -y
yarn add gatsby gatsby-theme-dashbored
```

If you already have a gatsby project, you can simply install dashbored theme:

```shell
yarn add gatsby-theme-dashbored
```

# Getting Started

---

In your gatsby project, edit `gatsby-config.js` and add the dashbored's theme:

```js
// gatsby-config.js
{
  [...],
  __experimentalThemes: [
    {
      resolve: 'gatsby-theme-dashbored',
      options: { queryfile: './queries.js' },
    },
  ],
}
```

Then create the file queries.js at the root of your project:

```js
// queries.js
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
    ],
  },
]
```

Your first Dashbored is ready to go.

you'll need to add `node-fetch` as a dependency in your project:

```shell
yarn add node-fetch
```

Add the following script in your `package.json`:

```json
// package.json
{
  [...],
  "scripts":{
    "develop":"gatsby develop"
  }
}
```

Now you can launch your dashbored, enter the command below and it should be available at `http://localhost:8000`:

```shell
yarn develop
```

# Querying data

---

The example above is nice and easy but you probably need to make request to a db somewhere.
There is 2 options for that

## Using SQL query as string with knex

If you are using a SQL based DB (postgresSQL, MySQL, ...), you can pass the knexConfig in the config.

This opens 2 way of querying data:

- you can simply pass a query as a simple string
- you can use a function that receive the knex instance as a parameter

### As a simple string

```js
// queries.js
{
  [...],
  quesries: [{
    name: 'Number of users',
    type: 'number',
    query: `SELECT COUNT(users.id) FROM users`
  }]
}
```

### As a function

```js
// queries.js
{
  [...],
  quesries: [{
    name: 'Number of users',
    type: 'number',
    query: db => db('users').count('*')
  }]
}
```

## Passing the data as a function

If you are not using SQL databases or simply prefer to handle the connection on your end, you can pass the data as a function:

```js
// queries.js
{
  [...],
  quesries: [{
    name: 'Number of users',
    type: 'number',
    query: () => Users.count()
  }]
}
```

# Shape of the queryfile

---

Your query file should be a `js` file that export an array of objects.
Each objects represent a page in your dashbored.

```js
// queries.js
module.exports = [
  {
    title: 'Page 1',
    default: true,
    queries: [
      /*your queries*/
    ],
  },
  {
    title: 'Page 2',
    queries: [
      /*your queries*/
    ],
  },
]
```

In the example above, `Page 1` will be your index/homepage (`/`).

If multiple pages with `default:true` are present, the last one will overwrite the previous pages.

## `queries` field

This field will contain all of your query for the page. It's an array of objects, each object being a widget.

There is for now 4 type of widgets:

- Simple number
- Pie chart
- Bar chart
- Line chart
- Scatter Plot

### Mandatory fields

Every widget object should contains this fields:

#### **name**

- type: string
- description: Name of the widget

#### **type**

- type: ["number", "pie", "bar", "line", "scatter"]
- description: Type of the widget

#### **query**

- type: string/function
- parameter
  - db: knex instance
- description: query/data of your widget

The nivoConfig allow you to customize the library we are using for data visualization nivo, you can find a really well done doc on their [website](https://nivo.rocks/).
Each type of widget has optional fields and expect a specific structure for your query data:

## Widgets

### Number

- options: none

structure of the data expected:

```js
const data = {
  value: number,
}
// OR
const data = [
  {
    value: number,
  },
]
```

#### Example

```js
// queries.js
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
    ],
  },
]
```

### Pie

[nivo doc](https://nivo.rocks/pie)

structure of the data expected:

```js
const data = [
  {
    id: string | number,
    label: string | number,
    value: number,
  },
]
```

#### Example

```js
// queries.js
module.exports = [
  {
    title: 'Unicorns',
    default: true,
    queries: [
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
    ],
  },
]
```

### Bar

[nivo doc](https://nivo.rocks/bar)

structure of the data expected:

```js
const data = [
  {
    id: string | number,
    label: string | number,
    value: number,
  },
]
```

#### Example

```js
// queries.js
module.exports = [
  {
    title: 'Unicorns',
    default: true,
    queries: [
      {
        name: 'Average lifespan of each species',
        type: 'bar',
        query: () => [
          { index: 'Gingercorn', value: 100 },
          { index: 'Blondecorn', value: 63 },
          { index: 'Invisiblecorn', value: 13 },
          { index: 'Flycorn', value: 45.5 },
          { index: 'Popcorn', value: 42 },
        ],
      },
    ],
  },
]
```

### Line

[nivo doc](https://nivo.rocks/line)

structure of the data expected:

```js
const data = [
  {
    id: string | number,
    data: [{ x: number | string | Date, y: number | string | Date }],
  },
]
```

In the case of Line and Scatter, you can pass the data with two different structures.
You can directly send the correctly formatted data in one query or send multiple queries in Tuples([see line example below](/?id=example-3)). `[id: string, data: fn]`

If you send the array of Tuples, Dashbored will convert this into the expected data structure for you.

#### Example

```js
// queries.js
module.exports = [
  {
    title: 'Unicorns',
    default: true,
    queries: [
      {
        name: 'Average population by species over the month',
        type: 'line',
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
    ],
  },
]
```

### Scatter

[nivo doc](https://nivo.rocks/scatterplot)

structure of the data expected:

```js
const data = [
  {
    id: string | number,
    data: [{ x: number | string | Date, y: number | string | Date }],
  },
]
```

In the case of Line and Scatter, you can pass the data with two different structures.
You can directly send the correctly formatted data in one query or send multiple queries in Tuples([see line example above](/?id=example-3)). `[id: string, data: fn]`

If you send the array of Tuples, Dashbored will convert this into the expected data structure for you.

#### Example

```js
// queries.js
module.exports = [
  {
    title: 'Unicorns',
    default: true,
    queries: [
      {
        name: 'Earthquakes in time',
        type: 'scatter',
        nivoConfig: {
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
        },
        query: () => [
          { id: 'Pompei disaster', data: [{ x: '12-31-2019', y: 6 }] },
          { id: 'Pompei disaster, The return of the ash', data: [{ x: '12-12-2012', y: 10 }] },
          { id: 'Pompei disaster, A new ash', data: [{ x: '09-12-2015', y: 6.4 }] },
        ],
      },
    ],
  },
]
```

### **Generic options**

#### **nivoConfig**

allow you to change the default nivo config use for each nivo component (every component except `number`)

#### **column**

Allow you to change the number of column used by the widget. Dashbored is made of 6 columns.
This is the default column for each widget:

- number: 1
- pie: 4
- bar: 6
- line : 6
- scatter : 6

#### **row**

Allow you to change the number of rows used by the widget. Dashbored creates as many row as needed. A row is `225px`.
This is the default column for each widget:

- number: 1
- pie: 2
- bar: 2
- line : 2
- scatter : 2

#### **shortLabel**

Allow to show a shorter version of your label.

```js
{
  shortLabel: 4 // will substring your label to the first 4 characters.
}
```

If you overwrite the nivoConfig, this property might have no effect.
For each widget that use `shortLabel`, this is the property affecte by `shortLabel`:

- number: none
- pie: `radialLabel`
- bar: `axisBottom`
- line: `axisBottom`
- scatter: `axisBottom`

# Caveats

## Dev Mode watch

Right now the dev mode of gatsby doesn't rebuild when your changing your query file. In the future we'll try to create a gatsby plugin to add the file in the watchlist.

## Nivo labels

Gatsby-config doesn't pass function to the templates(the reason is because the config is stringified). For dashbored, it means you won't be able to pass function for the label's format of your widget. tooltips, legends, ...

# Running the Examples

---

## Installation

This repo uses yarn workspaces to handle dependencies, so run `yarn`
at the root of the repo.

```shell
yarn
```

## Run the example (`/packages/dash`)

To run scripts in a workspace, use the `yarn workspace` command.

```shell
yarn workspace dash develop
```
