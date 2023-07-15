import type { NextPage } from 'next';
import Head from 'next/head';
import { Button, Content } from '@carbon/react';
import MyHeader from '../components/TutorialHeader/MyHeader';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MyHeader />
      <Content>
        <Button>Button</Button>
      </Content>
    </div>
  );
};

export default Home;