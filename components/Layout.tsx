import { AppShell } from '@mantine/core';
import { FunctionComponent, ReactNode } from 'react';

import HeaderContent from './Header';
//import FooterContent from './Footer';


interface IProps {
  children: ReactNode;
};

const Layout: FunctionComponent<IProps> = ({ children }) => {
  return (
    <>
      <AppShell
        sx={(theme) => ({
          main: {
            // paddingBottom: '30px',
          }
        })}
        header={
          <HeaderContent />
        }
        // footer={
        //   <FooterContent />
        // }
        padding={0}
      >
        {children}
      </AppShell>
    </>
  )
}

export default Layout;