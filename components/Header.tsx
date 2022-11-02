import { FunctionComponent } from 'react';
import Link from 'next/link';
import { Header, Group, Button, UnstyledButton, Divider, Box, Burger, Drawer, ScrollArea, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconGauge, IconDeviceDesktopAnalytics, IconSettings, IconLogout, IconUser } from '@tabler/icons';
import { signOut, useSession } from 'next-auth/react';

import SwitchTheme from '../components/ui/SwitchTheme';
import { HeaderLink } from './ui/HeaderLink';


interface IProps {

}


const HeaderContent: FunctionComponent<IProps> = (props: IProps) => {
  const { data: session, status } = useSession();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  let rightMenu;
  if (status === "authenticated") {
    rightMenu = (
      <>
        <SwitchTheme />
        <Link href={`${session.user?.name}`} passHref>
          <Button variant="gradient" leftIcon={<IconUser size={18} />}>
            {session.user?.name}
          </Button>
        </Link>
      </>
    )
  }
  else if (status === "unauthenticated") {
    rightMenu = (
      <>
        <SwitchTheme />
        <Link href="/auth/signin" passHref>
          <Button variant="default">Войти</Button>
        </Link>
        <Link href="/auth/signup" passHref>
          <Button variant="gradient">Зарегистрироваться</Button>
        </Link>
      </>
    )
  }

  let rightMenuMobile;
  if (status === "authenticated") {
    rightMenuMobile = (
      <>
        <Link href={`${session.user?.name}`} passHref>
          <Button variant="gradient" onClick={() => closeDrawer()} leftIcon={<IconUser size={18} />}>
            {session.user?.name}
          </Button>
        </Link>
      </>
    )
  }
  else if (status === "unauthenticated") {
    rightMenuMobile = (
      <>
        <Link href="/auth/signin" passHref>
          <Button variant="default" onClick={() => closeDrawer()} >Войти</Button>
        </Link>
        <Link href="/auth/signup" passHref>
          <Button variant="gradient" onClick={() => closeDrawer()} >Зарегистрироваться</Button>
        </Link>
      </>
    )
  }

  return (
    <Box>
      <Header withBorder={false} height={80} px="lg" zIndex={1000}
        sx={(theme) => ({
          backdropFilter: 'saturate(180%) blur(10px)',
          background: theme.colorScheme === 'dark' ? 'rgba(26, 27, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          boxShadow: theme.colorScheme === 'dark' ? 'none' : '0 0 10px rgba(0, 0, 0, 0.15)',
          borderBottom: theme.colorScheme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '',
        })}
      >
        <Group
          position="apart"
          sx={(theme) => ({
            height: '100%',
            maxWidth: '960px',
            margin: '0 auto',
            padding: '0 16px',
          })}
        >
          <UnstyledButton>
            <Link href="/">
              <Title
                order={3}
                weight={700}
              >
                Wishlist
              </Title>
            </Link>
          </UnstyledButton>

          <Group
            sx={(theme) => ({
              [theme.fn.smallerThan('sm')]: {
                display: 'none',
              },
            })}
          >
            {rightMenu}
          </Group>

          <Burger opened={false} onClick={toggleDrawer}
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
        size="100%"
        padding="md"
        position="right"
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
            {rightMenuMobile}
          </Group>
          {session &&
            <>
              <Divider my="sm" />
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
            </>
          }
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

export default HeaderContent;