import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Router from "next/router";
import { Container } from '@mantine/core';

import NavbarContent from '../../components/Navbar'

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


const Admin: NextPage<Props> = (props) => {


  return (
    <>

      <NavbarContent />

      <Container
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        })}
      >

      </Container>
    </>
  )
}

export default Admin;