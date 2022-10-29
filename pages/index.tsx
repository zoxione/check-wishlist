import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Router from "next/router";
import { useSession } from 'next-auth/react';
import { Button, Container, Title } from '@mantine/core';


import Search from '../components/ui/Search'
import AppHead from '../components/logics/Head';
import Link from 'next/link';


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
        <Title mb={10} order={4}>Найди список желаемых подарков друга</Title>
        <Search />
        <Title my={10}>ИЛИ</Title>
        <Title></Title>
        <Link href="/auth/signup" passHref>
          <Button variant="gradient" radius="xl" size="md">Создай свой</Button>
        </Link>
      </Container>

      <Container
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        })}
      >
        <Title mb={10} order={2}>Как это работает?</Title>

      </Container>
    </>
  )
}

export default Home;