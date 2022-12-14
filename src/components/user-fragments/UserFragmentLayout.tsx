import { Container } from '@mantine/core';
import { FunctionComponent } from 'react';


interface IProps {
  children: React.ReactNode;
};


const UserFragmentLayout: FunctionComponent<IProps> = ({ children }) => {


  return (
    <>
      <Container
        sx={(theme) => ({
          marginTop: '30px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          paddingBottom: '30px',
        })}
      >
        {children}
      </Container>
    </>
  )
}

export default UserFragmentLayout;