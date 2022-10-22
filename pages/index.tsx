import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Router from "next/router";
import { useSession } from 'next-auth/react';
import { Container } from '@mantine/core';


import Search from '../components/ui/Search'
import AppHead from '../components/logics/Head';


interface Props {

}


const Home: NextPage<Props> = (props) => {
  const { status, data } = useSession();
  console.log(status, data)

  return (
    <>
      <AppHead />

      <Container
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        })}
      >
        <Search />
      </Container>
    </>
  )
}

export default Home;