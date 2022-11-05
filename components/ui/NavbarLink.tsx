import { Tooltip, UnstyledButton } from '@mantine/core';
import { TablerIcon } from '@tabler/icons';
import Link from 'next/link';


interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  href?: string;
  activeFragment?: number;
  active?: boolean;
  onClick?(): void;
}


export function NavbarLink(props: NavbarLinkProps) {
  return (
    <Tooltip label={props.label} position="right" transitionDuration={0}>
      {
        props.onClick ? (
          <UnstyledButton
            component="a"
            onClick={props.onClick}
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
        )
          : (
            <Link href={{ pathname: '/user', query: { activeFragment: props.activeFragment } }} passHref>
              <UnstyledButton
                component="a"
                onClick={props.onClick}
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
            </Link>
          )
      }
    </Tooltip>
  );
}