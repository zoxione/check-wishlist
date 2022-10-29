import { Avatar, Paper, createStyles, TextInput, PasswordInput, Checkbox, Button, Title, Text, Anchor, Container, Grid, Tabs, Group, Badge, useMantineTheme, Indicator, CopyButton, Box, } from '@mantine/core';
import { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router'
import GiftCard from '../components/ui/GiftCard';

import { IconX, IconCheck, IconMail, IconPencil, IconBrandTiktok, IconBrandTwitter, IconBrandVk, IconBrandTelegram, IconBrandInstagram } from '@tabler/icons';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

import { IGift, IUser } from '../types';
import { showNotification } from '@mantine/notifications';

export var dataGift: IGift[] = [
  {
    id: "1",
    title: 'Кофе',
    description: 'Кофе',
    shopName: 'Кофе',
    shopUrl: 'https://google.com',
    price: 100,
    createdAt: new Date(),
    imageUrl: "https://miro.medium.com/max/1400/1*dDdKQEH296jQdl7-1pGzww.jpeg",
    isGifted: false,
    userId: "dddd",
  },
  {
    id: "2",
    title: 'Кофе',
    description: 'Кофе',
    shopName: 'Кофе',
    shopUrl: 'https://google.com',
    price: 100,
    createdAt: new Date(),
    imageUrl: "https://miro.medium.com/max/1400/1*dDdKQEH296jQdl7-1pGzww.jpeg",
    isGifted: false,
    userId: "dddd",
  },
  {
    id: "3",
    title: 'Молоко',
    description: 'Молоко',
    shopName: 'Кофе',
    shopUrl: 'https://google.com',
    price: 231,
    createdAt: new Date(),
    imageUrl: "https://miro.medium.com/max/1400/1*dDdKQEH296jQdl7-1pGzww.jpeg",
    isGifted: false,
    userId: "dddd",
  },
  {
    id: "4",
    title: 'Кофе',
    description: 'Кофе',
    shopName: 'Кофе',
    shopUrl: 'https://google.com',
    price: 3155,
    createdAt: new Date(),
    imageUrl: "https://miro.medium.com/max/1400/1*dDdKQEH296jQdl7-1pGzww.jpeg",
    isGifted: true,
    userId: "dddd",
  },
  {
    id: "5",
    title: 'Кофе',
    description: 'Кофе',
    shopName: 'Кофе',
    shopUrl: 'https://google.com',
    price: 100,
    createdAt: new Date(),
    imageUrl: "https://miro.medium.com/max/1400/1*dDdKQEH296jQdl7-1pGzww.jpeg",
    isGifted: false,
    userId: "dddd",
  },
  {
    id: "6",
    title: 'Кофе',
    description: 'Кофе',
    shopName: 'Кофе',
    shopUrl: 'https://google.com',
    price: 3123,
    createdAt: new Date(),
    imageUrl: "https://miro.medium.com/max/1400/1*dDdKQEH296jQdl7-1pGzww.jpeg",
    isGifted: true,
    userId: "dddd",
  },
]


export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
  const session = await unstable_getServerSession(req, res, authOptions)
  const username = String(params?.username);
  let user: IUser | null = null;

  try {
    //const response = await fetch(`http://localhost:8080/user/${username}`)
    const response = await fetch(`http://ovz2.j61057165.m7o9p.vps.myjino.ru:49274/user/${username}`)
    user = await response.json()
  }
  catch (e) {
    console.log(e)
  }

  // const ggg: IGift[] = await (await fetch(`http://localhost:8080/gift`)).json()
  const ggg: IGift[] = await (await fetch(`http://ovz2.j61057165.m7o9p.vps.myjino.ru:49274/gift`)).json()
  const gifts: IGift[] = ggg.filter((gift) => gift.userId === user?.id)

  var isOwner = false;
  if (user?.username === session?.user?.name) {
    isOwner = true;
  }

  return {
    props: { user, isOwner, gifts },
  };
};


interface IProps {
  user: IUser;
  isOwner: boolean;
  gifts: IGift[];
}


const Profile: NextPage<IProps> = (props: IProps) => {
  const theme = useMantineTheme();
  console.log(props)

  if (props.user === null) {
    return (
      <Container
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
        })}
      >
        <Title order={2}>Пользователь не найден</Title>
        <Title order={1} mb={10}>😨</Title>
        <Text>
          Пользователь с таким именем не найден. Проверьте правильность написания имени или{' '}
          <Link href="/auth/signup">
            <Anchor>создайте нового</Anchor>
          </Link>
        </Text>
      </Container>
    )
  }

  const wishlist = props.gifts.filter((gift) => !gift.isGifted)
  const gifted = props.gifts.filter((gift) => gift.isGifted)


  let linkList = [
    <CopyButton key={1} value={props.user?.email ? props.user.email : ''}>
      {({ copied, copy }) => (
        <Button onClick={copy} variant="gradient" fullWidth leftIcon={<IconMail size={18} />}>
          {copied ? "Скопировано" : props.user.email}
        </Button>
      )}
    </CopyButton>
  ]

  if (props.user.tiktokName != "") {
    linkList.push(
      <Link key={2} href={`https://tiktok.com/@${props.user?.tiktokName}`}>
        <Button variant="light" fullWidth leftIcon={<IconBrandTiktok size={18} />}>
          TikTok
        </Button>
      </Link>
    )
  }
  if (props.user.twitterName != "") {
    linkList.push(
      <Link key={3} href={`https://twitter.com/${props.user?.twitterName}`}>
        <Button variant="light" fullWidth leftIcon={<IconBrandTwitter size={18} />}>
          Twitter
        </Button>
      </Link>
    )
  }
  if (props.user.vkName != "") {
    linkList.push(
      <Link key={4} href={`https://vk.com/${props.user?.vkName}`}>
        <Button variant="light" fullWidth leftIcon={<IconBrandVk size={18} />}>
          VK
        </Button>
      </Link>
    )
  }
  if (props.user.telegramName != "") {
    linkList.push(
      <Link key={5} href={`https://t.me/${props.user?.telegramName}`}>
        <Button variant="light" fullWidth leftIcon={<IconBrandTelegram size={18} />}>
          Telegram
        </Button>
      </Link>
    )
  }
  if (props.user.instagramName != "") {
    linkList.push(
      <Link key={6} href={`https://instagram.com/${props.user?.instagramName}`}>
        <Button variant="light" fullWidth leftIcon={<IconBrandInstagram size={18} />}>
          Instagram
        </Button>
      </Link>
    )
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
          backgroundPosition: 'center',
          backgroundImage: `url(${props.user?.backgroundUrl ? props.user.backgroundUrl : ''})`,
          backgroundColor: props.user?.backgroundUrl ? '' : theme.colors.gray[4],
        })}
      >
        {
          props.isOwner &&
          <Group position="right" p={20}>
            <Link href="/user">
              <Button variant="filled" leftIcon={<IconPencil size={18} />}>
                Изменить
              </Button>
            </Link>
          </Group>
        }
      </Container>

      <Container
        sx={(theme) => ({
          marginTop: '30px',
          maxWidth: '1280px',
        })}
      >
        <Grid justify="center">
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
                {
                  props.user?.isVerified === true &&
                  <Indicator position="bottom-end" color="cyan" offset={15} size={24} zIndex={10} label={<IconCheck size={14} />}>
                    <Avatar src={props.user?.imageUrl} size={120} radius={120} mx="auto" color={theme.fn.primaryColor()} />
                  </Indicator>
                }
                {
                  props.user?.isVerified === false &&
                  <Avatar src={props.user?.imageUrl} size={120} radius={120} mx="auto" color={theme.fn.primaryColor()} />
                }
              </Group>
              <Text align="center" size="lg" weight={500} mt="md">
                {props.user?.username}
              </Text>
              <Text align="center" color="dimmed" size="sm">
                {props.user?.about}
              </Text>

              <Group mt="xl" spacing="sm">
                {linkList}
              </Group>
            </Paper>
          </Grid.Col>

          <Grid.Col sm={8}>
            <Tabs defaultValue="wishlist">
              <Tabs.List>
                <Tabs.Tab
                  rightSection={
                    <Badge sx={{ width: 16, height: 16, pointerEvents: 'none' }} variant="filled" size="xs" p={0}>
                      {wishlist.length}
                    </Badge>
                  }
                  value="wishlist"
                >
                  Список желаний
                </Tabs.Tab>
                <Tabs.Tab
                  rightSection={
                    <Badge sx={{ width: 16, height: 16, pointerEvents: 'none' }} variant="filled" size="xs" p={0}>
                      {gifted.length}
                    </Badge>
                  }
                  value="gifted"
                >
                  Подаренное
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="wishlist" pt="xs">
                <Grid>
                  {wishlist.map((gift, index) => (
                    <Grid.Col xs={6} sm={6} md={4} key={index}>
                      <GiftCard
                        gift={gift}
                        isOwner={props.isOwner}
                        canEdit={false}
                      />
                    </Grid.Col>
                  ))}
                </Grid>
              </Tabs.Panel>

              <Tabs.Panel value="gifted" pt="xs">
                <Grid>
                  {gifted.map((gift, index) => (
                    <Grid.Col xs={6} sm={6} md={4} key={index}>
                      <GiftCard
                        gift={gift}
                        isOwner={props.isOwner}
                        canEdit={false}
                      />
                    </Grid.Col>
                  ))}
                </Grid>
              </Tabs.Panel>
            </Tabs>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}

export default Profile;