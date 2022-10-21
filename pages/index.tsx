import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Router from "next/router";

import Search from '../components/ui/Search'
import { Container } from '@mantine/core';
import AppHead from '../components/logics/Head';
import { useSession } from 'next-auth/react';


// export const getStaticProps: GetStaticProps = async () => {
//   const feed = await prisma.job.findMany({
//     where: { published: true },
//     include: {
//       author: {
//         select: { name: true },
//       },
//     },
//   });
//   return {
//     props: { feed },
//     revalidate: 10,
//   };
// };

interface Props {
  // feed: JobProps[]
}


const Home: NextPage<Props> = (props) => {

  const { status, data } = useSession();

  console.log(status, data)


  const [search, setSearch] = useState("");

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