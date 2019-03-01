import React from 'react'
import styled from 'styled-components'
import { map, filter, flowRight } from 'lodash/fp'
import { StaticQuery, graphql, Link } from 'gatsby'

const List = styled.ul`
  list-styled: none;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 0;
  padding: 0;
`

const Item = styled.li`
  margin: 0 25px;
  text-transform: capitalize;
`
const Title = styled(Link)`
  margin: 25px;
  font-weight: bold;
  color: hsla(0, 0%, 0%, 0.8);
  background-image: none;
  :hover {
    color: hsla(0, 0%, 0%, 0.8);
  }
`

const Header = props => (
  <StaticQuery
    query={graphql`
      query allSitePage {
        site {
          siteMetadata {
            title
          }
        }

        allSitePage {
          edges {
            node {
              path
              pluginCreator {
                name
              }
              pluginCreatorId
            }
          }
        }
      }
    `}
    render={data => (
      <header>
        <List>
          <Title to="/">{data.site.siteMetadata.title || 'Dashboard'}</Title>
          {data.allSitePage.edges.length > 2
            ? flowRight(
                map(({ node }) => (
                  <Item key={node.path}>
                    <Link
                      to={node.path}
                      style={{ color: 'hsla(0,0%,0%,0.8)', backgroundImage: 'none' }}
                      activeStyle={{ color: 'rgb(2, 202, 177)' }}
                    >
                      {node.path === '/' ? 'home' : node.path.replace('-', ' ').replace('/', '')}
                    </Link>
                  </Item>
                )),
                filter(({ node }) => node.pluginCreator.name === 'gatsby-theme-dash'),
              )(data.allSitePage.edges)
            : null}
        </List>
      </header>
    )}
  />
)
export default Header
