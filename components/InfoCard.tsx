import { IconEye, IconMessageCircle } from '@tabler/icons';
import { Card, Text, Group, Center, createStyles, Paper, Title } from '@mantine/core';
import { Children, FunctionComponent, ReactNode } from 'react';
import { Image } from '@mantine/core';
import { IGift } from '../types';


interface IProps {
  children: ReactNode;
  title?: string | undefined;
}


const InfoCard: FunctionComponent<IProps> = ({ children, title }) => {
  return (
    <Paper
      sx={(theme) => ({
        padding: '30px',
        borderRadius: theme.radius.lg,
        boxShadow: theme.colorScheme === 'dark' ? '' : theme.shadows.lg,
        border: theme.colorScheme === 'dark' ? '1px solid' : '',
        borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : '',
        maxWidth: '100vw',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      })}
    >
      <Title order={2} size="h2" mb={10}>{title}</Title>
      {children}
    </Paper>
  );
}

export default InfoCard;