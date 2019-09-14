import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Dosare from '../components/Dosare';

const Home = () => (
  <>
    <Head>
      <title>Cautare dosare</title>
    </Head>
    <Dosare />
  </>
);

export default Home;
