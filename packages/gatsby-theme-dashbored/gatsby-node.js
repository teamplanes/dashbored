const fs = require('fs')
const path = require('path')
const knex = require('knex')
const dayjs = require('dayjs')
const mkdirp = require('mkdirp')
const {
  flowRight,
  pick,
  get,
  update,
  defaultTo,
  isFunction,
  isArray,
  isString,
  mapValues,
  negate,
  cond,
  tap,
  map,
  reduce,
  fromPairs,
} = require('lodash/fp')

require('node-fetch')

exports.createPages = async ({ actions: { createPage } }, config) => {
  const queries = require(path.resolve(config.queryfile))
  const db = config.knexConfig ? knex(config.knexConfig) : null

  const fetchQuery = async node => {
    const doQuery = async query =>
      await cond([
        [isFunction, q => q(db)],
        [isString, q => (db ? db.raw(q).then(get('rows')) : null)],
      ])(query)
    if (isArray(node.query))
      return {
        ...node,
        result: await Promise.all(
          map(async pair => [pair[0], await doQuery(pair[1])], node.query),
        ).then(map(v => ({ id: v[0], data: v[1] }))),
      }
    return {
      ...node,
      result: await doQuery(node.query),
    }
  }
  const fetchQueries = update('queries', map(fetchQuery))

  const createPP = pages =>
    pages.map(({ queries, ...page }) => {
      const uri = page.default ? '/' : `/${page.title.toLowerCase().replace(/\s/gim, '-')}`
      return Promise.all(queries).then(result => {
        return Promise.resolve(
          createPage({
            path: uri,
            component: require.resolve(path.resolve(__dirname, `./src/templates/dash.js`)),
            context: { ...page, uri, result },
          }),
        )
      })
    })
  return await Promise.all(createPP(map(fetchQueries, queries)))
}

/**
 * When shipping NPM modules, they typically need to be either
 * pre-compiled or the user needs to add bundler config to process the
 * files. Gatsby lets us ship the bundler config *with* the theme, so
 * we never need a lib-side build step.  Since we dont pre-compile the
 * theme, this is how we let webpack know how to process files.
 */
exports.onCreateWebpackConfig = ({ stage, loaders, plugins, actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.dirname(require.resolve('gatsby-theme-dashbored')),
          use: [loaders.js()],
        },
      ],
    },
  })
}

// make sure src/pages exists for the filesystem source or it will error
exports.onPreBootstrap = ({ store }) => {
  const { program } = store.getState()
  const dir = `${program.directory}/src/pages`

  if (!fs.existsSync(dir)) {
    mkdirp.sync(dir)
  }
}

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPreset({ name: '@babel/preset-react' })
}
