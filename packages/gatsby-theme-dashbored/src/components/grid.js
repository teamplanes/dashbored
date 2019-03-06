import styled from 'styled-components'
import { map } from 'styled-components-breakpoint'

const Grid = styled.div`
  flex: 1;
  display: grid;
  grid-auto-rows: 225px;
  ${({ bk }) => map(bk, val => `grid-template-columns: repeat(${val}, 1fr);`)}
  grid-auto-flow: row dense;
  justify-items: stretch;
  align-items: stretch;
`

export default Grid
