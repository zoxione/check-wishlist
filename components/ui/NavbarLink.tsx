import { Tooltip, UnstyledButton } from '@mantine/core';
import {
  TablerIcon,
} from '@tabler/icons';


interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
}


export function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
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
          '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
          },
          backgroundColor: active ? theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background : 'transparent',
          color: active ? theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color : theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        })}
      >
        <Icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}