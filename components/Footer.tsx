import Link from 'next/link';
import React from 'react'
import { NextPage } from 'next';

type Props = {
  //children: ReactNode;
};


const FooterContent: NextPage<Props> = (props) => {
  return (
    <div className="text-center">
      <Link href="/">
        <a className="font-bold text-lg">dsada</a>
      </Link>
    </div>
  )
}

export default FooterContent;