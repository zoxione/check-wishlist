import { Avatar, Paper, createStyles, TextInput, PasswordInput, Checkbox, Button, Title, Text, Anchor, Container, Grid, Tabs, Group, Badge, useMantineTheme, Indicator, } from '@mantine/core';
import { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import GiftCard from '../components/GiftCard';
import { IGift } from '../types';

import { IconX, IconCheck } from '@tabler/icons';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';



var dataGift: IGift[] = [
  {
    title: 'Кофе',
    image: 'https://images.unsplash.com/photo-1611181928379-8b8b8b2b9b1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    price: 100,
    isGifted: false,
    gifter: undefined,
  },
  {
    title: 'Кофе',
    image: 'https://images.unsplash.com/photo-1611181928379-8b8b8b2b9b1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    price: 100,
    isGifted: false,
    gifter: undefined,
  },
  {
    title: 'Кофе',
    image: 'https://images.unsplash.com/photo-1611181928379-8b8b8b2b9b1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    price: 100,
    isGifted: false,
    gifter: undefined,
  },
  {
    title: 'Кофе',
    image: 'https://images.unsplash.com/photo-1611181928379-8b8b8b2b9b1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    price: 100,
    isGifted: false,
    gifter: undefined,
  },
]


export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
  const session = await unstable_getServerSession(req, res, authOptions)

  var isOwner = false;
  if (session?.user?.name === String(params?.name)) {
    isOwner = true;
  }
  return {
    props: { isOwner },
  };
};


interface IProps {
  // user: UserProps
  avatar: string;
  name: string;
  email: string;
  job: string;
  isOwner: boolean;
}


const Profile: NextPage<IProps> = (props: IProps) => {
  const { status, data } = useSession();
  const theme = useMantineTheme();
  const router = useRouter()
  const { name } = router.query

  var isOwner = false;
  if (data?.user?.name === name) {
    isOwner = true;
  }

  return (
    <>
      <Container
        sx={(theme) => ({
          height: '210px',
          maxWidth: '100vw',
          padding: '0',
          margin: '0',
          backgroundSize: 'cover',
          backgroundColor: theme.colors.blue[5],
        })}
      >
        {
          props.isOwner &&
          <Link href="/user">
            <Button variant="filled"
              sx={(theme) => ({
                position: 'fixed',
                top: '80px',
                right: '20px',
              })}
            >
              Изменить
            </Button>
          </Link>
        }
      </Container>

      <Container
        sx={(theme) => ({
          marginTop: '30px',
          maxWidth: '1024px',
        })}
      >
        <Grid>
          <Grid.Col sm={4}>
            <Paper
              radius="md"
              withBorder
              p="lg"
              sx={(theme) => ({
                maxWidth: '100vw',
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
                marginTop: '-80px',
              })}
            >
              <Group position="center">
                <Indicator position="bottom-end" offset={15} size={30} label={<IconCheck size={18} />}>
                  <Avatar src={props.avatar} size={120} radius={120} mx="auto" color={theme.fn.primaryColor()} />
                </Indicator>
              </Group>
              <Text align="center" size="lg" weight={500} mt="md">
                {name}
              </Text>
              <Text align="center" color="dimmed" size="sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>

              <Group mt="xl" spacing="sm">
                <Button variant="light" fullWidth>
                  Twitter
                </Button>
                <Button variant="light" fullWidth>
                  TikTok
                </Button>
              </Group>
            </Paper>
          </Grid.Col>

          <Grid.Col sm={8}>
            <Tabs defaultValue="wishlist">
              <Tabs.List>
                <Tabs.Tab
                  rightSection={
                    <Badge sx={{ width: 16, height: 16, pointerEvents: 'none' }} variant="filled" size="xs" p={0}>
                      4
                    </Badge>
                  }
                  value="wishlist"
                >
                  Список желаний
                </Tabs.Tab>
                <Tabs.Tab
                  rightSection={
                    <Badge sx={{ width: 16, height: 16, pointerEvents: 'none' }} variant="filled" size="xs" p={0}>
                      0
                    </Badge>
                  }
                  value="gifters"
                >
                  Подаренное
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="wishlist" pt="xs">
                <Grid>
                  {dataGift.map((gift, index) => (
                    <Grid.Col xs={6} sm={6} md={4} key={index}>
                      <GiftCard
                        title={'Choppie Stickies'}
                        image={'https://firebasestorage.googleapis.com/v0/b/onlywish-9d17b.appspot.com/o/items%2F590bf649-f3ee-41e6-a6ef-e76fba225b48?alt=media&token=4fad8c05-54b3-465f-8022-dff06acecd01'}
                        price={9.43}
                        isGifted={false}
                        gifter={undefined}
                      />
                    </Grid.Col>
                  ))}
                </Grid>
              </Tabs.Panel>

              <Tabs.Panel value="gifters" pt="xs">

              </Tabs.Panel>
            </Tabs>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}

export default Profile;