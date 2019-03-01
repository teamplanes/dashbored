import styled from 'styled-components'
import { get } from 'lodash/fp'

const Block = styled.div`
  place-self: ${p => get('ps', p) || 'center'};
  grid-column-end: span ${p => get('c', p) || 1};
  grid-row-end: span ${p => get('r', p) || 1};
  padding: 25px;
`
export default Block
