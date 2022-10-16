import '../styles/globals.css'

import Router from 'next/router';
import { useEffect } from "react";
import { AppProps } from 'next/app';
import { useRouter } from "next/router";
import { SessionProvider } from 'next-auth/react'
import { useState } from 'react';
import { MantineProvider, ColorSchemeProvider, ColorScheme, Loader } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

import Layout from '../components/Layout';
import Script from 'next/script';

const App = ({ Component, pageProps }: AppProps) => {
  // pre-loader
  const [loading, setLoading] = useState(false);
  Router.events.on('routeChangeStart', () => setLoading(true));
  Router.events.on('routeChangeComplete', () => setLoading(false));

  // mantine theme
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <>
      {loading ? (
        <SessionProvider session={pageProps.session}>
          <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
              <div className="h-screen w-screen flex justify-center items-center">
                <Loader color="violet" variant="bars" />
              </div>
            </MantineProvider>
          </ColorSchemeProvider>
        </SessionProvider>

      )
        : (
          <SessionProvider session={pageProps.session}>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
              <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </MantineProvider>
            </ColorSchemeProvider>
          </SessionProvider>
        )}

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
