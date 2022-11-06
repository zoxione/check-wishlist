import { useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Router, { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { Title, Anchor, Box } from '@mantine/core';
import { IconHome2, IconGauge, IconDeviceDesktopAnalytics, IconUser, IconSettings, IconLogout, IconLayoutList } from '@tabler/icons';
import AppHead from '../../components/logics/Head';
import dynamic from 'next/dynamic';

import { authOptions } from '../api/auth/[...nextauth]';
import { IGift, ITransaction, IUser } from '../../types';
import { GetUserFromId } from '../../api/User';
import NavbarContent from '../../components/Navbar';
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

  const NavbarLinkList = [
    { label: "Мой профиль", icon: IconHome2, href: props.user?.username },
    { label: "Аккаунт", icon: IconUser, href: "/user", activeFragment: 0 },
    { label: "Список желаний", icon: IconLayoutList, href: "/user", activeFragment: 1 },
    { label: "Приборная панель", icon: IconGauge, href: "/user", activeFragment: 2 },
    { label: "Аналитика", icon: IconDeviceDesktopAnalytics, href: "/user", activeFragment: 3 },
    { label: "Настройки", icon: IconSettings, href: "/user", activeFragment: 4 },
  ];

  // const [activeFragment, setActiveFragment] = useState(props.activeFragment);
  const fragmentsList = [
    <UserAccount key={1} user={props.user} />,
    <UserWishlist key={2} user={props.user} />,
    <UserDashboard key={3} />,
    <UserAnalytics key={4} />,
    <UserSettings key={5} user={props.user} />,
  ];
  // useEffect(() => {
  //   setActiveFragment(props.activeFragment)
  // }, [props.activeFragment]);

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

      <NavbarContent
        activeFragment={props.activeFragment}
        username={props.user.username}
      />

      <Box
        sx={(theme) => ({
          marginLeft: '80px',
          [theme.fn.smallerThan('sm')]: {
            marginLeft: 0,
          },
        })}
      >
        {fragmentsList[props.activeFragment]}
      </Box>
    </>
  );
}

export default User;