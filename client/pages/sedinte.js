import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Sedinte from '../components/Sedinte';

const SedintePage = () => (
  <>
    <Head>
      <title>Cautare ședințe</title>
    </Head>
    <Sedinte />
  </>
);

export default SedintePage;
