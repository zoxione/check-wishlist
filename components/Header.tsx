import { FunctionComponent } from 'react';
import Link from 'next/link';
import { createStyles, Header, Group, Button, UnstyledButton, Text, SimpleGrid, ThemeIcon, Anchor, Divider, Center, Box, Burger, Drawer, Collapse, ScrollArea, useMantineColorScheme, ActionIcon, Title, } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconNotification, TablerIcon,
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconCalendarStats,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal, IconUser, IconCode, IconBook, IconChartPie3, IconFingerprint, IconCoin, IconSun, IconMoonStars, IconChevronDown,
} from '@tabler/icons';
import { getSession, signIn, signOut, useSession } from 'next-auth/react';

import SwitchTheme from '../components/ui/SwitchTheme';
import { GetServerSideProps } from 'next';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import { Session, unstable_getServerSession } from 'next-auth';

import { NavbarLink } from './ui/NavbarLink';
import { HeaderLink } from './ui/HeaderLink';


interface IProps {

}


const HeaderContent: FunctionComponent<IProps> = (props: IProps) => {
  const { data: session } = useSession();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  let rightMenu;
  if (session) {
    rightMenu = (
      <>
        <Link href={`${session.user?.name}`} passHref>
          <Button variant="gradient" leftIcon={<IconUser size={18} />}>
            {session.user?.name}
          </Button>
        </Link>
      </>
    )
  }
  else {
    rightMenu = (
      <>
        <Link href="/auth/signin" passHref>
          <Button variant="default">Войти</Button>
        </Link>
        <Link href="/auth/signup" passHref>
          <Button variant="gradient">Зарегистрироваться</Button>
        </Link>
      </>
    )
  }

  return (
    <Box>
      <Header withBorder={false} height={80} px="lg" zIndex={1000}
        sx={(theme) => ({
          backdropFilter: 'blur(10px)',
          background: theme.colorScheme === 'dark' ? 'rgba(26, 27, 30, 0.3)' : 'rgba(255, 255, 255, 0.3)',
        })}
      >
        <Group position="apart" sx={{ height: '100%' }}>
          <UnstyledButton>
            <Link href="/">
              <Title
                order={3}
                weight={700}
              >
                Check
              </Title>
            </Link>
          </UnstyledButton>

          {/* <Group spacing={0}
            sx={(theme) => ({
              [theme.fn.smallerThan('sm')]: {
                display: 'none',
              },
              height: '100%'
            })}
          >
            <Link href="/" passHref>
              <Text component='a'
                sx={(theme) => ({
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%',
                  paddingLeft: theme.spacing.md,
                  paddingRight: theme.spacing.md,
                  textDecoration: 'none',
                  color: theme.colorScheme === 'dark' ? theme.white : theme.black,
                  fontWeight: 500,
                  fontSize: theme.fontSizes.sm,

                  [theme.fn.smallerThan('sm')]: {
                    height: 42,
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                  },

                  ...theme.fn.hover({
                    color: theme.fn.primaryColor(),
                    transitionDuration: "300ms",
                  }),
                })}
              >
                Home
              </Text>
            </Link>


          </Group> */}

          <Group
            sx={(theme) => ({
              [theme.fn.smallerThan('sm')]: {
                display: 'none',
              },
            })}
          >
            <SwitchTheme />
            {rightMenu}
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer}
            sx={(theme) => ({
              [theme.fn.largerThan('sm')]: {
                display: 'none',
              },
            })}
          />
        </Group>
      </Header>



      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        onClick={() => closeDrawer()}
        size="100%"
        padding="md"
        title={
          <Group position="apart" sx={{ height: '100%' }}>
            <UnstyledButton>
              <Link href="/">
                <Title
                  order={3}
                  weight={700}
                >
                  Check
                </Title>
              </Link>
            </UnstyledButton>
            <SwitchTheme />
          </Group>
        }
        sx={(theme) => ({
          [theme.fn.largerThan('sm')]: {
            display: 'none',
          },
        })}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: 'calc(100vh - 80px)' }} mx="-md">
          <Group position="center" grow px="md">
            {rightMenu}
          </Group>

          <Divider my="sm" />

          {
            session &&
            <Box
              sx={(theme) => ({
                padding: '0px 16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
              })}
            >
              <HeaderLink icon={IconUser} label='Аккаунт' href={'/user'} activeFragment={0} />
              <HeaderLink icon={IconGauge} label='Приборная панель' href={'/user'} activeFragment={1} />
              <HeaderLink icon={IconDeviceDesktopAnalytics} label='Аналитика' href={'/user'} activeFragment={2} />
              <HeaderLink icon={IconSettings} label='Настройки' href={'/user'} activeFragment={3} />
              <Divider />
              <HeaderLink icon={IconLogout} label='Выйти' onClick={() => signOut({ redirect: true, callbackUrl: "/" })} />
            </Box>
          }
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

export default HeaderContent;