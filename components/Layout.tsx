import React, { FunctionComponent, ReactNode, useState } from 'react'

import NavbarContent from './Navbar'
import HeaderContent from './Header';
import FooterContent from './Footer';

import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  ActionIcon,
  useMantineColorScheme
} from '@mantine/core';

import { IconSun, IconMoonStars } from '@tabler/icons';

interface IProps {
  children: ReactNode;
};

const Layout: FunctionComponent<IProps> = ({ children }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <>
      <AppShell
        // navbar={
        //   <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
        //     <Navbar p="md" hidden={!opened}>
        //       <NavbarContent />  
        //     </Navbar>
        //   </MediaQuery>
        // }
        footer={
          <FooterContent />
        }
        header={
          <HeaderContent />
        }
        padding={0}
      >
        <div>
          {children}
        </div>
      </AppShell>
    </>
  )
}

export default Layout;