import { useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Router, { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { Title, Anchor, Box, Navbar, Stack } from '@mantine/core';
import { IconHome2, IconGauge, IconDeviceDesktopAnalytics, IconUser, IconSettings, IconLogout, IconLayoutList } from '@tabler/icons';
import AppHead from '../../components/logics/Head';
import dynamic from 'next/dynamic';

import { authOptions } from '../api/auth/[...nextauth]';
import { IGift, ITransaction, IUser } from '../../types';
import { NavbarLink } from '../../components/ui/NavbarLink';
import { GetUserFromId } from '../../api/User';
const UserAccount = dynamic(() => import('../../components/user-fragments/UserAccount'))
const UserDashboard = dynamic(() => import('../../components/user-fragments/UserDashboard'))
const UserAnalytics = dynamic(() => import('../../components/user-fragments/UserAnalytics'))
const UserSettings = dynamic(() => import('../../components/user-fragments/UserSettings'))
const UserWishlist = dynamic(() => import('../../components/user-fragments/UserWishlist'))


export const getServerSideProps: GetServerSideProps = async ({ req, res, params, query }) => {
  const session = await unstable_getServerSession(req, res, authOptions)
  let user: IUser | null = null;

  try {
    user = await GetUserFromId(session?.user?.id || '');
  }
  catch (e) {
    console.log(e)
  }

  return {
    props: { user, activeFragment: query.activeFragment || 0 }
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
    <UserAccount key={1} user={props.user} />,
    <UserWishlist key={2} user={props.user} />,
    <UserDashboard key={3} />,
    <UserAnalytics key={4} />,
    <UserSettings key={5} user={props.user} />,
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
      <AppHead />

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
            <NavbarLink icon={IconLayoutList} label="Список желаний" active={activeFragment === 1} onClick={() => setActiveFragment(1)} />
            <NavbarLink icon={IconGauge} label="Приборная панель" active={activeFragment === 2} onClick={() => setActiveFragment(2)} />
            <NavbarLink icon={IconDeviceDesktopAnalytics} label="Аналитика" active={activeFragment === 3} onClick={() => setActiveFragment(3)} />
            <NavbarLink icon={IconSettings} label="Настройки" active={activeFragment === 4} onClick={() => setActiveFragment(4)} />
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