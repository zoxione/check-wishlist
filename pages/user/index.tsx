import { Avatar, Paper, createStyles, Notification, TextInput, PasswordInput, Checkbox, Button, Title, Text, Anchor, Container, Grid, Tabs, Group, Input, Box, Navbar, UnstyledButton, Tooltip, Stack, Center, Loader, } from '@mantine/core';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Router, { useRouter } from 'next/router'
import { useState } from 'react';

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
import { IGift, IUser } from '../../types';
import UserAccount from '../../components/user-fragments/UserAccount';
import UserDashboard from '../../components/user-fragments/UserDashboard';
import UserAnalytics from '../../components/user-fragments/UserAnalytics';
import UserSettings from '../../components/user-fragments/UserSettings';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';

const useStyles = createStyles((theme) => ({
  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

const navbarData = [
  { icon: IconUser, label: 'Аккаунт' },
  { icon: IconGauge, label: 'Приборная панель' },
  { icon: IconDeviceDesktopAnalytics, label: 'Аналитика' },
  { icon: IconSettings, label: 'Настройки' },
];

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();

  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton
        component="a"
        onClick={onClick}
        sx={(theme) => ({
          width: 50,
          height: 50,
          borderRadius: theme.radius.md,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
          '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
          },
        })}
        className={cx({ [classes.active]: active })}
      >
        <Icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}


export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
  const session = await unstable_getServerSession(req, res, authOptions)
  let user: IUser | null = null;

  try {
    const response = await fetch(`http://localhost:8080/user/${session?.user?.name}`)
    user = await response.json()
  }
  catch (e) {
    console.log(e)
  }

  const ggg: IGift[] = await (await fetch(`http://localhost:8080/gift`)).json()
  const gifts: IGift[] = ggg.filter((gift) => gift.userId === user?.id && gift.isGifted === false)

  return {
    props: { user, gifts },
  };
};


interface IProps {
  user: IUser;
  gifts: IGift[];
}


const User: NextPage<IProps> = (props: IProps) => {
  const { data: session, status } = useSession();
  console.log(props)

  const [activeFragment, setActiveFragment] = useState(0);
  const fragmentsList = [
    <UserAccount key={1} user={props.user} gifts={props.gifts} />,
    <UserDashboard key={2} />,
    <UserAnalytics key={3} />,
    <UserSettings key={4} />,
  ];

  if (status === 'loading') {
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
        <Loader variant="dots" />
      </Box>
    )
  }

  if (status === 'unauthenticated' || props.user === null) {
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
        <Title order={2} mb={10}>Вы не авторизованы</Title>
        <Link href="/auth/signin">
          <Anchor>Войти</Anchor>
        </Link>
      </Box>
    )
  }

  var datddda = [
    {
      id: 1,
      giftName: "Подарок 1",
      gifterName: "Даритель 1",
      userName: "Получатель 1",
      createdAt: "2021-05-01",
      isCompleted: false,
    },
    {
      id: 2,
      giftName: "Подарок 2",
      gifterName: "Даритель 2",
      userName: "Получатель 2",
      createdAt: "2021-05-02",
      isCompleted: true,
    },
  ]

  return (
    <>
      <Navbar height={750} width={{ base: 80 }} p="md"
        sx={(theme) => ({
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 10,
          height: '100vh',
        })}
      >
        <Navbar.Section grow mt={50}>
          <Stack justify="center" spacing={10}>
            <NavbarLink icon={IconHome2} label="Мой профиль" onClick={() => Router.push(`${props.user?.username}`)} />
            {navbarData.map((link, index) => (
              <NavbarLink
                {...link}
                key={link.label}
                active={index === activeFragment}
                onClick={() => setActiveFragment(index)}
              />
            ))}
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