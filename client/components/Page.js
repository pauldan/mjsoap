import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import Container from './Container';
import Meta from './Meta';

import theme from '../styles/theme';
import GlobalStyles from './GlobalStyles';
import Header from './Header';

const Page = props => (
  <ThemeProvider theme={theme}>
    <GlobalStyles theme={theme} />
    <Meta />
    <Header />
    <Container>{props.children}</Container>
  </ThemeProvider>
);

export default Page;
