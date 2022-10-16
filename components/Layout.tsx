import React, { ReactNode, useState } from 'react'

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

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => {
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
          <Footer height={60} p="md">
            <FooterContent />
          </Footer>
        }
        header={

          <HeaderContent />

        }
      >
        <div className="lg:w-[1100px] mx-auto">
          {props.children}
        </div>
      </AppShell>
    </>
  )
}

export default Layout;