import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
/* CSS Reset from Josh W. Comeau: https://www.joshwcomeau.com/css/custom-css-reset/ */
*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
}

body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

input,
button,
textarea,
select {
  font: inherit;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

#root,
#__next {
  isolation: isolate;
}

:root {
    --background: #16161a;
    --secondary: #72757e;
    --stroke: #010101;
    --main: #fffffe;
    --paragraph: #94a1b2;
    --button: #7f5af0;
    --button-hover: #6648c0;
    --tertiary: #2cb67d;
    --remove: #D64045;
}

body {
    font-family: 'Atkinson Hyperlegible', sans-serif;
    background: var(--background);
    color: var(--main);
}
`;
