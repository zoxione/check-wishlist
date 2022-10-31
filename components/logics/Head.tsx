import Head from "next/head";
import { FunctionComponent } from "react";

interface IProps {
  title?: string | null;
};

const AppHead: FunctionComponent<IProps> = ({ title }) => {

  return (
    <Head>
      <title>{title ? title : "Check wishlist"}</title>
      <meta name="description" content="Создай свой список желаемых подарков и поделись им с друзьями или фанатами!" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default AppHead;