import { FunctionComponent, useState } from 'react';
import { Navbar, Center, Tooltip, UnstyledButton, createStyles, Stack } from '@mantine/core';
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
import Link from 'next/link';

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
  href: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, href, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();

  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <Link href={`${href}`}>
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
      </Link>
    </Tooltip>
  );
}

interface IProps { }

const NavbarContent: FunctionComponent<IProps> = ({ }) => {
  const [active, setActive] = useState(1);

  return (
    <Navbar height={750} width={{ base: 80 }} p="md"
      sx={(theme) => ({
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 10,
        height: '100vh',
      })}
    >
      <Center>

      </Center>
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {navbarData.map((link, index) => (
            <NavbarLink
              {...link}
              key={link.label}
              active={index === active}
              onClick={() => setActive(index)}
            />
          ))}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink icon={IconLogout} label="Logout" href="/" />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}

export default NavbarContent;