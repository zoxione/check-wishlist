import { Button } from '@mantine/core';
import { TablerIcon } from '@tabler/icons';
import Link from 'next/link';


interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
  href?: string;
  activeFragment?: number;
}


export function HeaderLink(props: NavbarLinkProps) {
  return (
    <Link
      href={{
        pathname: props.href,
        query: {
          activeFragment: props.activeFragment,
        }
      }}
    >
      <Button
        onClick={props.onClick}
        component="a"
        variant="light"
        leftIcon={<props.icon stroke={1.5} />}
        fullWidth
        sx={(theme) => ({
          borderRadius: theme.radius.md,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
          },
          // backgroundColor: active ? theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background : 'transparent',
          // color: active ? theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color : theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        })}
      >
        {props.label}
      </Button>
    </Link>
  );
}