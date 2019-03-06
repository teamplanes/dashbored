import reset from 'styled-reset'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  ${reset}
  @import url('https://fonts.googleapis.com/css?family=Archivo:400,600,700');
  *{box-sizing: border-box;}
  body{
    font-family: 'Archivo', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
  }
  #___gatsby{
    display:flex;
    flex:1;
  }
  #___gatsby>div{
    display:flex;
    flex-direction: column;
    flex:1;
  }

  a {
    text-decoration: none;
  }
`

export default GlobalStyle
