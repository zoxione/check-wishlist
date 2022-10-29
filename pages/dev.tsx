import { Button } from "@mantine/core";
import { NextPage } from "next";
import { signOut } from "next-auth/react";

interface IProps {

}

const Dev: NextPage<IProps> = (props: IProps) => {
  return (
    <>
      <Button onClick={() => signOut({ redirect: true, callbackUrl: "/" })}>
        Выйти
      </Button>
    </>
  );
}

export default Dev;