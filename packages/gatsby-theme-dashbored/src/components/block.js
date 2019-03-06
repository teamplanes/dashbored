import { get } from 'lodash/fp'
import styled from 'styled-components'
import { map } from 'styled-components-breakpoint'

const Block = styled.div`
  ${({ columns, ...rest }) =>
    console.log(columns) || map(columns, column => `grid-column-end: span ${column};`)}
  ${({ rows }) => map(rows, row => `grid-row-end: span ${row};`)}

  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: ${p => get('align', p) || 'flex-start'};
`
export default Block
