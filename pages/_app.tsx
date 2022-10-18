import '../styles/globals.css'

import Router from 'next/router';
import { useEffect } from "react";
import { AppProps } from 'next/app';
import { useRouter } from "next/router";
import { Session } from "next-auth";
import { SessionProvider } from 'next-auth/react'
import { useState } from 'react';
import { MantineProvider, ColorSchemeProvider, ColorScheme, Loader, MantineTheme, MantineThemeOverride, Center } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

import Layout from '../components/Layout';
import Script from 'next/script';

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
    }
  }
};

const App = ({ Component, pageProps }: AppProps<{ session: Session }>) => {
  // pre-loader
  const [loading, setLoading] = useState(false);
  Router.events.on('routeChangeStart', () => setLoading(true));
  Router.events.on('routeChangeComplete', () => setLoading(false));

  // mantine theme
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
      {loading ? (
        <SessionProvider session={pageProps.session}>
          <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
              <Center sx={{ height: '100vh' }}>
                <Loader color="pink" variant="bars" />
              </Center>
            </MantineProvider>
          </ColorSchemeProvider>
        </SessionProvider>
      )
        : (
          <SessionProvider session={pageProps.session}>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
              <MantineProvider theme={appTheme} withGlobalStyles withNormalizeCSS>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </MantineProvider>
            </ColorSchemeProvider>
          </SessionProvider>
        )
      }

      {/* <SessionProvider session={pageProps.session}>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </MantineProvider>
        </ColorSchemeProvider>
      </SessionProvider> */}
    </>
  )
}

export default App;
