import '../styles/globals.css'

import Router from 'next/router';
import { useEffect } from "react";
import { AppProps } from 'next/app';
import { useRouter } from "next/router";
import { Session } from "next-auth";
import { SessionProvider } from 'next-auth/react'
import { useState } from 'react';
import { MantineProvider, ColorSchemeProvider, ColorScheme, Loader, MantineTheme, MantineThemeOverride, Center, ButtonStylesParams } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';

import Layout from '../components/Layout';
import { RouterTransition } from '../components/logics/RouterTransition';


// mantine theme
export const appTheme: MantineThemeOverride = {
  primaryColor: 'grape',
  colorScheme: 'light',
  defaultRadius: 'md',
  components: {
    ActionIcon: {
      styles: {
        root: {
          color: 'violet',
        },
      },
    },
    Button: {
      styles: (theme, params: ButtonStylesParams) => ({
        root: {
          backgroundImage: params.variant === "gradient" ? `linear-gradient(to left top, #7048e8, #8c4ce8, #a451e8, #b956e8, #cc5de8)` : '',
          '&:hover': {
            transitionDuration: '0.4s',
            backgroundColor:
              params.variant === 'outline'
                ? theme.colors[params.color || theme.primaryColor][6]
                : undefined,
            color:
              params.variant === 'outline'
                ? theme.colors[params.color || theme.primaryColor][0]
                : undefined,
          },
        },
      }),
    },
  }
};

const App = ({ Component, pageProps }: AppProps<{ session: Session }>) => {


  // mantine dark theme
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-app-theme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (appTheme.colorScheme === 'dark' ? 'light' : 'dark'));
  appTheme.colorScheme = colorScheme;


  return (
    <>
      <SessionProvider session={pageProps.session}>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider theme={appTheme} withGlobalStyles withNormalizeCSS>
            <NotificationsProvider>
              <Layout>
                <RouterTransition />
                <Component {...pageProps} />
              </Layout>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </SessionProvider>
    </>
  )
}

export default App;
