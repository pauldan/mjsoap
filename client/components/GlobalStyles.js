import { Global, css } from '@emotion/core';

const GlobalStyles = ({ theme }) => (
  <Global
    styles={css`
      html {
        box-sizing: border-box;
        font-size: 16px;
      }
      *,
      *:before,
      *:after {
        box-sizing: inherit;
        margin: 0;
        padding: 0;
        font-family: ${theme.font.secondary};
      }
      body {
        margin: 0;
        padding: 0;
        line-height: 2;
        height: 100vh;
      }

      ul {
        list-style: none;
      }

      input,
      textarea,
      select,
      button {
        color: inherit;
        letter-spacing: inherit;
      }

      input,
      textarea,
      button {
        border: 1px solid gray;
      }

      button {
        background: transparent;
        border-radius: ${theme.border.radius};
        padding: 0.5em 1em;
        > * {
          pointer-events: none;
        }
      }

      table {
        width: 100%;
        th {
          font-family: ${theme.font.primary};
        }
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-family: ${theme.font.primary};
        letter-spacing: 1px;
        user-select: none;
      }
      h1 {
        font-size: 1.4em;
      }
      h2 {
        font-size: 1.3em;
      }
      h3 {
        font-size: 1.2em;
      }
      h4 {
        font-size: 1.1em;
      }
      h5,
      h6 {
        font-size: 1em;
      }
      /* global classes */
      .center {
        text-align: center;
      }

      #__next {
        height: 100vh;
        overflow-x: hidden;
      }
    `}
  />
);

export default GlobalStyles;
