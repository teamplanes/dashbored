module.exports = {
  siteMetadata: {
    title: 'The Forgotten Knowledge',
    author: 'Planes',
    description: 'A Dashbored of knowledge',
  },
  __experimentalThemes: [
    {
      resolve: 'gatsby-theme-dashbored',
      options: { queryFile: './queries.js' },
    },
  ],
}
