const path = require("path");

module.exports = {
  siteMetadata: {
    title: "Gatsby Theme Blog Core",
    author: "Chris Biscardi",
    description: "A blog core theme that people can build on top of"
  },
  plugins:[
    {
     resolve: `gatsby-plugin-typography`,
     options: {
       pathToConfigModule: require.resolve(path.resolve(__dirname, `src/utils/typography`)),
     }
    }
  ]
};
