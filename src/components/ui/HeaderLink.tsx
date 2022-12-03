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
        })}
      >
        {props.label}
      </Button>
    </Link>
  );
}