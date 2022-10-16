import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Router from "next/router";



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

type Props = {
  // feed: JobProps[]
}

const Home: React.FC<Props> = (props) => {


  return (
    <>


      <h1 className="text-4xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Aptos.careers</h1>



      {/* <SimpleGrid
        cols={4}
        spacing="lg"
        breakpoints={[
          { maxWidth: 'md', cols: 3, spacing: 'md' },
          { maxWidth: 'sm', cols: 2, spacing: 'sm' },
          { maxWidth: 'xs', cols: 1, spacing: 'sm' },
        ]}
      >
        {props.feed.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </SimpleGrid> */}
    </>
  )
}

export default Home;