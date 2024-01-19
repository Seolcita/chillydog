import { createGlobalStyle } from 'styled-components';
import ColorMap from './Color';

export const GlobalStyles = createGlobalStyle`

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  // Sets a baseline font size of 10px,
  // 1rem = 10px
  // 10px/16px = 62.5%
  font-size: 62.5%;
}

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  min-height: 100vh;
  text-rendering: optimizeSpeed;
  line-height: 1;
  background-color:${ColorMap['grey'].dark};
  width: 100%;
}

button {
  cursor: pointer;
}

/* Remove default list styles */
ul[role="list"],
ol[role="list"] {
  list-style: none;
}
li {
  list-style-type: none;
}

/* Inherit fonts for inputs */
input,
textarea,
select {
  font-family: inherit;
}

a {
  text-decoration: none;
}
`;
