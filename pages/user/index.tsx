import { Avatar, Paper, createStyles, Notification, TextInput, PasswordInput, Checkbox, Button, Title, Text, Anchor, Container, Grid, Tabs, Group, Input, Box, Navbar, UnstyledButton, Tooltip, Stack, Center, Loader, MediaQuery, } from '@mantine/core';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

import { signOut, useSession } from 'next-auth/react';

import { IconCheck, IconX, IconTrash } from '@tabler/icons';
import {
  TablerIcon,
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
} from '@tabler/icons';


import CardGift from '../../components/ui/GiftCard';
import { IGift, ITransaction, IUser } from '../../types';
import UserAccount from '../../components/user-fragments/UserAccount';
import UserDashboard from '../../components/user-fragments/UserDashboard';
import UserAnalytics from '../../components/user-fragments/UserAnalytics';
import UserSettings from '../../components/user-fragments/UserSettings';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { NavbarLink } from '../../components/ui/NavbarLink';


export const getServerSideProps: GetServerSideProps = async ({ req, res, params, query }) => {
  const session = await unstable_getServerSession(req, res, authOptions)
  let user: IUser | null = null;

  try {
    const userResponse = await fetch(`http://localhost:8080/user/${session?.user?.name}`)
    // const response = await fetch(`http://ovz2.j61057165.m7o9p.vps.myjino.ru:49274/user/${session?.user?.name}`)
    user = await userResponse.json()
  }
  catch (e) {
    console.log(e)
  }

  const giftsResponse: IGift[] = await (await fetch(`http://localhost:8080/gift`)).json()
  // const ggg: IGift[] = await (await fetch(`http://ovz2.j61057165.m7o9p.vps.myjino.ru:49274/gift`)).json()
  const gifts: IGift[] = giftsResponse.filter((gift) => gift.userId === user?.id && gift.isGifted === false)

  const transactions: ITransaction[] = await (await fetch(`http://localhost:8080/transaction`)).json()

  return {
    props: { user, gifts, transactions, activeFragment: query.activeFragment || 0 }
  };
};


interface IProps {
  user: IUser;
  gifts: IGift[];
  transactions: ITransaction[];
  activeFragment: number;
}


const User: NextPage<IProps> = (props: IProps) => {
  const { data: session, status } = useSession();
  console.log(props)

  const [activeFragment, setActiveFragment] = useState(props.activeFragment);
  const fragmentsList = [
    <UserAccount key={1} user={props.user} gifts={props.gifts} />,
    <UserDashboard key={2} transactions={props.transactions} />,
    <UserAnalytics key={3} />,
    <UserSettings key={4} />,
  ];
  useEffect(() => {
    setActiveFragment(props.activeFragment)
  }, [props.activeFragment]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      Router.push('/auth/signin')
    }
  }, [status]);

  if (props.user === null) {
    return (
      <Box
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
        })}
      >
        <Title order={2} mb={10}>Данные пользователя не найдены</Title>
        <Link href="/auth/signin">
          <Anchor>Войти</Anchor>
        </Link>
      </Box>
    )
  }

  return (
    <>
      <Navbar height={750} p="md"
        sx={(theme) => ({
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 10,
          height: '100vh',
          width: '80px',
          [theme.fn.smallerThan('sm')]: {
            display: 'none',
            width: 0,
          },
        })}
      >
        <Navbar.Section grow mt={80}>
          <Stack justify="center" spacing={10}>
            <NavbarLink icon={IconHome2} label="Мой профиль" onClick={() => Router.push(`${props.user?.username}`)} />
            <NavbarLink icon={IconUser} label="Аккаунт" active={activeFragment === 0} onClick={() => setActiveFragment(0)} />
            <NavbarLink icon={IconGauge} label="Приборная панель" active={activeFragment === 1} onClick={() => setActiveFragment(1)} />
            <NavbarLink icon={IconDeviceDesktopAnalytics} label="Аналитика" active={activeFragment === 2} onClick={() => setActiveFragment(2)} />
            <NavbarLink icon={IconSettings} label="Настройки" active={activeFragment === 3} onClick={() => setActiveFragment(3)} />
          </Stack>
        </Navbar.Section>
        <Navbar.Section>
          <Stack justify="center" spacing={0}>
            <NavbarLink icon={IconLogout} label="Выйти" onClick={() => signOut({ redirect: true, callbackUrl: "/" })} />
          </Stack>
        </Navbar.Section>
      </Navbar>

      {fragmentsList[activeFragment]}
    </>
  );
}

export default User;