import { FunctionComponent } from 'react';
import Link from 'next/link';
import { createStyles, Header, Group, Button, UnstyledButton, Text, SimpleGrid, ThemeIcon, Anchor, Divider, Center, Box, Burger, Drawer, Collapse, ScrollArea, useMantineColorScheme, ActionIcon, Title, } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconNotification, IconUser, IconCode, IconBook, IconChartPie3, IconFingerprint, IconCoin, IconSun, IconMoonStars, IconChevronDown, } from '@tabler/icons';
import { signIn, useSession } from 'next-auth/react';

import SwitchTheme from '../components/ui/SwitchTheme';

interface IProps {

}


const HeaderContent: FunctionComponent<IProps> = ({ }) => {

  const { status, data } = useSession();

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  return (
    <Box>
      <Header height={60} px="lg" zIndex={1000}>
        <Group position="apart" sx={{ height: '100%' }}>
          <UnstyledButton>
            <Link href="/">
              <Title
                order={3}
                weight={900}
                variant="gradient"
                gradient={{ from: 'violet', to: 'orange', deg: 10 }}
              >
                Check
              </Title>
            </Link>
          </UnstyledButton>

          <Group spacing={0}
            sx={(theme) => ({
              [theme.fn.smallerThan('sm')]: {
                display: 'none',
              },
              height: '100%'
            })}
          >
            {/* <Link href="/" passHref>
              <Text component='a'
                sx={(theme) => ({
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%',
                  paddingLeft: theme.spacing.md,
                  paddingRight: theme.spacing.md,
                  textDecoration: 'none',
                  color: theme.colorScheme === 'dark' ? theme.white : theme.black,
                  fontWeight: 500,
                  fontSize: theme.fontSizes.sm,

                  [theme.fn.smallerThan('sm')]: {
                    height: 42,
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                  },

                  ...theme.fn.hover({
                    color: theme.fn.primaryColor(),
                    transitionDuration: "300ms",
                  }),
                })}
              >
                Home
              </Text>
            </Link> */}


          </Group>

          <Group
            sx={(theme) => ({
              [theme.fn.smallerThan('sm')]: {
                display: 'none',
              },
            })}
          >
            <SwitchTheme />
            <Button variant="default" onClick={() => signIn()}>Sign in</Button>
            <Link href="/auth/signup" passHref>
              <Button>Sign up</Button>
            </Link>
            {
              true && (
                <Link href={`${data?.user?.name}`} passHref>
                  <Button variant="outline" leftIcon={<IconUser />}>
                    {data?.user?.name}
                  </Button>
                </Link>
              )
            }
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer}
            sx={(theme) => ({
              [theme.fn.largerThan('sm')]: {
                display: 'none',
              },
            })}
          />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        sx={(theme) => ({
          [theme.fn.largerThan('sm')]: {
            display: 'none',
          },
        })}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: 'calc(100vh - 60px)' }} mx="-md">
          {/* <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} /> */}

          <Group position="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

export default HeaderContent;