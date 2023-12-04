import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  min-height: 100vh;
  text-rendering: optimizeSpeed;
  line-height: 1;
  font-family: ${({ theme }) => theme.fonts.poppins};
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
  font: inherit;
}
`;
