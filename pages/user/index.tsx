import { Avatar, Paper, createStyles, Notification, TextInput, PasswordInput, Checkbox, Button, Title, Text, Anchor, Container, Grid, Tabs, Group, Input, Box, Navbar, UnstyledButton, Tooltip, Stack, Center, } from '@mantine/core';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useState } from 'react';
import CardGift from '../../components/GiftCard';
import { IGift } from '../../types';

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


import InfoCard from '../../components/InfoCard';
import NavbarContent from '../../components/Navbar';
import UserSettings from '../../components/user-fragments/UserSettings';
import { signOut } from 'next-auth/react';

// // Получение данных с сервера
// export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
//   // Проверка на авторизацию
//   //const session = await getSession({ req });
//   const session = await unstable_getServerSession(req, res, authOptions)
//   if (!session) {
//     res.statusCode = 403;
//     return { props: {} };
//   }

//   const user = await prisma.user.findUnique({
//     where: {
//       id: String(params?.id)
//     }
//   });
//   const jobs = await prisma.job.findMany({
//     where: {
//       author: { email: session?.user?.email ? session.user.email : '' },
//     },
//     include: {
//       author: {
//         select: { name: true },
//       },
//     },
//   });
//   jobs.sort((a, b) => {
//     return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
//   });

//   return {
//     props: { user, jobs },
//   };
// };


const useStyles = createStyles((theme) => ({
  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

const navbarData = [
  { icon: IconUser, label: 'Account' },
  { icon: IconGauge, label: 'Dashboard' },
  { icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
  { icon: IconFingerprint, label: 'Security' },
  { icon: IconSettings, label: 'Settings' },
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



interface IProps {
  // user: UserProps
  avatar: string;
  name: string;
  email: string;
  job: string;
  password: string;
}

var data: IGift[] = [

]

const User: NextPage<IProps> = (props: IProps) => {
  const router = useRouter()
  const { id } = router.query

  // const { data: session, status } = useSession();

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     Router.replace("/auth/signin");
  //   }
  // }, [status]);

  const [name, setName] = useState(props.name ? props.name : "");
  const [email, setEmail] = useState(props.email ? props.email : "");
  const [password, setPassword] = useState(props.password ? props.password : "");
  // const [image, setImage] = useState(props.user?.image ? image : "");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      // const body = { name, email, password, image };
      // await fetch(`/api/user/${props.user?.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(body),
      // }).then((res) => {
      //   if (res.status === 200) {
      //     setShowNotification('success');
      //   }
      //   else {
      //     setShowNotification('error');
      //     console.log(res);
      //   }
      // });
    }
    catch (error) {
      console.error(error);
    }
  };

  const [activeFragment, setActiveFragment] = useState(0);
  const fragmentsList = [
    <UserSettings avatar={''} name={''} email={''} job={''} password={''} key="1" />
  ];

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
          <Stack justify="center" spacing={0}>
            <NavbarLink icon={IconHome2} label="Home" />
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
            <NavbarLink icon={IconLogout} label="Logout" onClick={() => signOut({ redirect: true, callbackUrl: "/" })} />
          </Stack>
        </Navbar.Section>
      </Navbar>

      {fragmentsList[activeFragment]}
    </>
  );
}

export default User;