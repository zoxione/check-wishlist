import Head from "next/head";
import { FunctionComponent } from "react";

interface IProps {
  title?: string | null;
};

const AppHead: FunctionComponent<IProps> = ({ title }) => {

  return (
    <Head>
      <title>{title ? title : "Check"}</title>
      <meta name="description" content="check" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default AppHead;