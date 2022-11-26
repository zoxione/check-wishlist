import { Anchor, Box, Title } from '@mantine/core';
import { IconDeviceDesktopAnalytics, IconGauge, IconHome2, IconLayoutList, IconSettings, IconUser } from '@tabler/icons';
import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect } from 'react';

import AppHead from '../../components/logics/Head';
import { GetUserFromId } from '../../services/User';
import NavbarContent from '../../components/Navbar';
import { IGift, ITransaction, IUser } from '../../../types';
import { authOptions } from '../api/auth/[...nextauth]';
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

  const fragmentsList = [
    <UserAccount key={1} user={props.user} />,
    <UserWishlist key={2} user={props.user} />,
    <UserDashboard key={3} user={props.user} />,
    // <UserAnalytics key={4} />,
    <UserSettings key={4} user={props.user} />,
  ];

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
      <AppHead title="Настройки" />

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