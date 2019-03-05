const path = require('path')
const knex = require('knex')
const dayjs = require('dayjs')
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
