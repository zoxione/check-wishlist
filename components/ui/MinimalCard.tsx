import { Box, Paper, Title, Text } from '@mantine/core';
import { FunctionComponent, ReactNode } from 'react';


interface IProps {
  children: ReactNode;
  title?: string | undefined;
}


const MinimalCard: FunctionComponent<IProps> = ({ children, title }) => {
  return (
    <Paper
      sx={(theme) => ({
        padding: '20px',
        borderRadius: theme.radius.lg,
        boxShadow: theme.colorScheme === 'dark' ? '' : '0 0 10px rgba(0, 0, 0, 0.15)',
        maxWidth: '100vw',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
      })}
    >
      <Box
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          height: '140px',
        })}
      >
        <Title order={4} align="center">
          {title}
        </Title>
        <Text
          sx={(theme) => ({
            fontSize: 30,
            fontWeight: 700,
            color: theme.fn.primaryColor()
          })}
        >
          {children}
        </Text>
      </Box>
    </Paper>
  );
}

export default MinimalCard;