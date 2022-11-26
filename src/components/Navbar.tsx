import { createStyles, Navbar, Stack, Tooltip, UnstyledButton } from '@mantine/core';
import {
  IconDeviceDesktopAnalytics,
  IconFingerprint, IconGauge, IconHome2, IconLayoutList, IconLogout, IconSettings, IconUser, TablerIcon
} from '@tabler/icons';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';

const useStyles = createStyles((theme) => ({
  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));



const navbarData = [
  { icon: IconHome2, label: 'Home', href: '/' },
  { icon: IconUser, label: 'Account', href: '/user/account' },
  { icon: IconGauge, label: 'Dashboard', href: '/user/dashboard' },
  { icon: IconDeviceDesktopAnalytics, label: 'Analytics', href: '/user/analytics' },
  { icon: IconFingerprint, label: 'Security', href: '/user/security' },
  { icon: IconSettings, label: 'Settings', href: '/user/settings' },
];

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  href?: string;
  isBlank?: boolean;
  activeFragment?: number;
  active?: boolean;
  onClick?(): void;
}


export function NavbarLink(props: NavbarLinkProps) {
  const router = useRouter()

  const handleClick = () => {
    if (props.activeFragment) {
      router.push({
        pathname: props.href,
        query: { activeFragment: props.activeFragment }
      });
    }
    else {
      router.push({
        pathname: props.href,
      });
    }
  }

  return (
    <Tooltip label={props.label} position="right" transitionDuration={0}>
      <UnstyledButton
        component="a"
        onClick={props.onClick ? props.onClick : handleClick}
        sx={(theme) => ({
          width: 50,
          height: 50,
          borderRadius: theme.radius.md,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
          },
          backgroundColor: props.active ? theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background : 'transparent',
          color: props.active ? theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color : theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        })}
      >
        <props.icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}


interface IProps {
  activeFragment: number;
  username: string;
}

const NavbarContent: FunctionComponent<IProps> = (props: IProps) => {
  return (
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
          <NavbarLink icon={IconHome2} label="Мой профиль" href={`/${props.username}`} />
          <NavbarLink icon={IconUser} label="Аккаунт" activeFragment={0} active={props.activeFragment == 0} />
          <NavbarLink icon={IconLayoutList} label="Список желаний" activeFragment={1} active={props.activeFragment == 1} />
          <NavbarLink icon={IconGauge} label="Приборная панель" activeFragment={2} active={props.activeFragment == 2} />
          {/* <NavbarLink icon={IconDeviceDesktopAnalytics} label="Аналитика" activeFragment={3} active={props.activeFragment == 3} /> */}
          <NavbarLink icon={IconSettings} label="Настройки" activeFragment={3} active={props.activeFragment == 3} />
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink icon={IconLogout} label="Выйти" onClick={() => signOut({ redirect: true, callbackUrl: "/" })} />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}

export default NavbarContent;