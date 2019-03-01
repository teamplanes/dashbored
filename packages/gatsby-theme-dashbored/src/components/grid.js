import styled from 'styled-components'

const Grid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(6, minmax(1/6%, 1fr));
  grid-auto-rows: 225px;
  grid-auto-flow: row dense;
`

export default Grid
