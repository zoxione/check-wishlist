import { Paper, Title } from '@mantine/core';
import { FunctionComponent, ReactNode } from 'react';


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
        boxShadow: theme.colorScheme === 'dark' ? '' : '0 0 10px rgba(0, 0, 0, 0.15)',
        //border: theme.colorScheme === 'dark' ? '1px solid' : '',
        borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : '',
        maxWidth: '100vw',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      })}
    >
      {title && (
        <Title order={2} size="h2" mb={30}>{title}</Title>
      )}

      {children}
    </Paper>
  );
}

export default InfoCard;