import { Box, Paper } from '@mantine/core';
import { FunctionComponent, ReactNode } from 'react';


interface IProps {
  children: ReactNode;
};


const AuthLayout: FunctionComponent<IProps> = (props: IProps) => {
  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '100%',
        backgroundSize: 'cover',
      })}
    >
      <Paper
        sx={(theme) => ({
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRight: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]}`,
          borderRadius: '0px',
          padding: '0px 80px 80px 80px',
          minHeight: '100%',
          width: '100%',
          [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            maxWidth: '100%',
            padding: '30px',
            alignItems: 'start',
          },
        })}
      >
        <Box
          sx={{
            width: '380px',
          }}
        >
          {props.children}
        </Box>
      </Paper>

      <Box
        sx={(theme) => ({
          background: 'linear-gradient(to top, #7048e8, #8c4ce8, #a451e8, #b956e8)',
          width: '100px',
          [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            width: '0px',
          },
        })}
      />
    </Box>
  )
}

export default AuthLayout;