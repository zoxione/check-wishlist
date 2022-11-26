import { Button } from "@mantine/core";
import { NextPage } from "next";
import { signOut } from "next-auth/react";

interface IProps {

}

export function timeout(delay: number) {
  return new Promise(res => setTimeout(res, delay));
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