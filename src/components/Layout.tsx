import { AppShell } from '@mantine/core';
import { FunctionComponent, ReactNode } from 'react';

import HeaderContent from './Header';


interface IProps {
  children: ReactNode;
};


const Layout: FunctionComponent<IProps> = ({ children }) => {
  return (
    <>
      <AppShell
        header={
          <HeaderContent />
        }
        padding={0}
      >
        {children}
      </AppShell>
    </>
  )
}

export default Layout;