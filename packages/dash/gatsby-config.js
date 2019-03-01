module.exports = {
  siteMetadata: {
    title: 'The Knowledge of the Beers',
    author: 'Planes',
    description: 'A Dashbored of beers',
  },
  __experimentalThemes: [
    {
      resolve: 'gatsby-theme-dashbored',
      options: { queryfile: './queries.js' },
    },
  ],
}
