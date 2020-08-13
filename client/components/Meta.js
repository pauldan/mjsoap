import React from 'react';
import NextHead from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';

const defaultDescription = '';
const defaultOGURL = '';
const defaultOGImage = '';


Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const Meta = ({ title, description, url, ogImage }) => (
  <NextHead>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />{' '}
    <link rel="icon" href="/static/favicon.ico" />
    <link rel="stylesheet" type="text/css" href={`${process.env.BASE_PATH}/static/nprogress.css`} />
    <link
      href="https://fonts.googleapis.com/css?family=Merriweather|Montserrat"
      rel="stylesheet"
    />
  </NextHead>
);

export default Meta;
