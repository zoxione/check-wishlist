import { Anchor, Badge, Box, Button, Center, Container, CopyButton, Grid, Group, Indicator, Loader, Paper, Popover, Tabs, Text, Title, useMantineTheme } from '@mantine/core';
import { closeAllModals, openConfirmModal, openModal } from '@mantine/modals';
import { IconBrandInstagram, IconBrandTelegram, IconBrandTiktok, IconBrandTwitter, IconBrandVk, IconCheck, IconMail, IconPencil, IconPlus, IconUserCircle } from '@tabler/icons';
import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import QRCode from "react-qr-code";

import { useGifts } from '../api/Gift';
import { GetUserFromUsername } from '../api/User';
import AppHead from '../components/logics/Head';
import GiftCard from '../components/ui/GiftCard';
import { IGift, IUser } from '../types';
import { authOptions } from './api/auth/[...nextauth]';


export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
  const session = await unstable_getServerSession(req, res, authOptions)
  const username = String(params?.username);
  let user: IUser | null = null;

  try {
    user = await GetUserFromUsername(username);
  }
  catch (e) {
    console.log(e)
  }

  var isOwner = false;
  if (user?.username === session?.user?.name) {
    isOwner = true;
  }

  return {
    props: { user, isOwner },
  };
};


interface IProps {
  user: IUser;
  isOwner: boolean;
}


const Profile: NextPage<IProps> = (props: IProps) => {
  const theme = useMantineTheme();

  const { gifts, isLoading, mutate } = useGifts(props.user?.id || '');

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

  const wishlist: IGift[] = gifts?.filter((gift) => !gift.isGifted)
  const gifted: IGift[] = gifts?.filter((gift) => gift.isGifted)

  const showQrCodeModal = () =>
    openModal({
      title: (
        <Text size="xl" weight={500}>
          Поделиться профилем
        </Text>
      ),
      centered: true,
      children: (
        <Box
          sx={(theme) => ({
            display: 'flex',
            flexDirection: 'column',
          })}
        >
          <Text>
            Скопируйте ссылку на профиль
          </Text>
          <CopyButton value={`https://wishlist.ictis.ru/${props.user?.username}`}>
            {({ copied, copy }) => (
              <Button onClick={copy} variant="default" fullWidth leftIcon={<IconUserCircle size={18} />}>
                {copied ? "Скопировано" : `https://wishlist.ictis.ru/${props.user?.username}`}
              </Button>
            )}
          </CopyButton>
          <Text mt={10}>
            Или отсканируйте QR-код
          </Text>
          <QRCode
            value={`https://wishlist.ictis.ru/${props.user?.username}`}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            size={256}
            viewBox={`0 0 256 256`}
          />
          <Button mt={10} fullWidth onClick={() => closeAllModals()}>
            Закрыть
          </Button>
        </Box>
      ),
    });

  let linkList = [
    <CopyButton key={1} value={props.user?.email ? props.user?.email : ''}>
      {({ copied, copy }) => (
        <Button onClick={copy} variant="gradient" fullWidth leftIcon={<IconMail size={18} />}>
          {copied ? "Скопировано" : props.user?.email}
        </Button>
      )}
    </CopyButton>
  ]

  if (props.user?.tiktokName != "") {
    linkList.push(
      <Button key={2} variant="light" component='a' href={`https://tiktok.com/@${props.user?.tiktokName}`} target="_blank" fullWidth leftIcon={<IconBrandTiktok size={18} />}>
        TikTok
      </Button>
    )
  }
  if (props.user?.twitterName != "") {
    linkList.push(
      <Button key={3} variant="light" component='a' href={`https://twitter.com/${props.user?.twitterName}`} target="_blank" fullWidth leftIcon={<IconBrandTwitter size={18} />}>
        Twitter
      </Button>
    )
  }
  if (props.user?.vkName != "") {
    linkList.push(
      <Button key={4} variant="light" component='a' href={`https://vk.com/${props.user?.vkName}`} target="_blank" fullWidth leftIcon={<IconBrandVk size={18} />}>
        VK
      </Button>
    )
  }
  if (props.user?.telegramName != "") {
    linkList.push(
      <Button key={5} variant="light" component='a' href={`https://t.me/${props.user?.telegramName}`} target="_blank" fullWidth leftIcon={<IconBrandTelegram size={18} />}>
        Telegram
      </Button>
    )
  }
  if (props.user?.instagramName != "") {
    linkList.push(
      <Button key={6} variant="light" component='a' href={`https://instagram.com/${props.user?.instagramName}`} target="_blank" fullWidth leftIcon={<IconBrandInstagram size={18} />}>
        Instagram
      </Button>
    )
  }
  linkList.push(
    <Button key={7} onClick={() => showQrCodeModal()} variant="light" fullWidth leftIcon={<IconUserCircle size={18} />}>
      Ссылка на профиль
    </Button>
  )
  if (props.isOwner) {
    linkList.push(
      <Link key={8} href={`/user`} passHref>
        <Button variant="outline" component='a' fullWidth leftIcon={<IconPencil size={18} />}>
          Изменить профиль
        </Button>
      </Link>
    )
  }


  return (
    <>
      <AppHead title={props.user.username} />

      <Container
        sx={(theme) => ({
          position: 'relative',
          height: '300px',
          maxWidth: '100vw',
          padding: '0',
          margin: '0',
        })}
      >
        {
          props.isOwner &&
          <Group position="right" p={20}>
            <Link href="/user">
              <Button
                variant="default"
                leftIcon={<IconPencil size={18} />}
                sx={(theme) => ({
                  zIndex: 1,
                })}
              >
                Изменить
              </Button>
            </Link>
          </Group>
        }
        <Image
          src={props.user?.backgroundUrl ? props.user.backgroundUrl : 'https://cserfwfqoxxsyqezqezy.supabase.co/storage/v1/object/public/check/users/backgrounds/placeholder.png'}
          alt="Background image"
          layout="fill"
          priority={true}
          objectFit="cover"
          style={{ zIndex: -100 }}
        />
      </Container>

      <Container
        sx={(theme) => ({
          marginTop: '30px',
          maxWidth: '1280px',
          paddingBottom: '80px',
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
                  <Indicator position="bottom-end" withBorder offset={25} size={30} zIndex={10} label={<IconCheck size={16} />}>
                    {/* <Avatar src={props.user?.imageUrl} size={120} radius={120} mx="auto" color={theme.fn.primaryColor()} /> */}
                    <Image
                      src={props.user?.imageUrl}
                      alt="Avatar image"
                      height={160}
                      width={160}
                      priority={true}
                      objectFit="cover"
                      style={{ borderRadius: '50%' }}
                    />
                  </Indicator>
                }
                {
                  props.user?.isVerified === false &&
                  <Image
                    src={props.user?.imageUrl}
                    alt="Avatar image"
                    height={160}
                    width={160}
                    priority={true}
                    objectFit="cover"
                    style={{ borderRadius: '50%' }}
                  />
                  // <Avatar src={props.user?.imageUrl} size={120} radius={120} mx="auto" color={theme.fn.primaryColor()} />
                }
              </Group>
              <Title align="center" size={20} weight={500} mt={15}>
                {props.user?.username}
              </Title>
              <Text align="center" color="dimmed" size="sm">
                {props.user?.about}
              </Text>
              <Group mt="xl" spacing="sm">
                {linkList}
              </Group>
            </Paper>
          </Grid.Col>

          <Grid.Col sm={8}>
            {
              isLoading
                ? (
                  <Center>
                    <Loader variant="dots" />
                  </Center>
                )
                : (
                  <Tabs defaultValue="wishlist">
                    <Tabs.List>
                      <Tabs.Tab
                        rightSection={
                          <Badge sx={{ width: 16, height: 16, pointerEvents: 'none' }} variant="filled" size="xs" p={0}>
                            {wishlist?.length}
                          </Badge>
                        }
                        value="wishlist"
                      >
                        Список желаний
                      </Tabs.Tab>
                      <Tabs.Tab
                        rightSection={
                          <Badge sx={{ width: 16, height: 16, pointerEvents: 'none' }} variant="filled" size="xs" p={0}>
                            {gifted?.length}
                          </Badge>
                        }
                        value="gifted"
                      >
                        Подаренное
                      </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="wishlist" pt={16}>
                      <Grid
                        sx={(theme) => ({
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          [theme.fn.smallerThan('xs')]: {
                            justifyContent: 'center'
                          }
                        })}
                      >
                        {wishlist?.length === 0 ?
                          (
                            <Grid.Col span={12}>
                              <Text align="center">Список желаний пуст</Text>

                              {
                                props.isOwner &&
                                <Center mt={10}>
                                  <Link href={{ pathname: '/user', query: { activeFragment: 1 } }}>
                                    <Button variant="gradient" leftIcon={<IconPlus size={18} />}>
                                      Добавить
                                    </Button>
                                  </Link>
                                </Center>
                              }
                            </Grid.Col>
                          )
                          : (
                            wishlist?.map((gift, index) => (
                              <Grid.Col xs={6} sm={6} md={4} key={index}>
                                <GiftCard
                                  gift={gift}
                                  isLoaded={true}
                                  isOwner={props.isOwner}
                                  canEdit={false}
                                />
                              </Grid.Col>
                            ))
                          )
                        }
                      </Grid>
                    </Tabs.Panel>

                    <Tabs.Panel value="gifted" pt={16}>
                      <Grid
                        sx={(theme) => ({
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          [theme.fn.smallerThan('xs')]: {
                            justifyContent: 'center'
                          }
                        })}
                      >
                        {gifted?.length === 0 ?
                          (
                            <Grid.Col span={12}>
                              <Text align="center">Подаренных подарков пока нет</Text>
                            </Grid.Col>
                          )
                          : (
                            gifted?.map((gift, index) => (
                              <Grid.Col xs={6} sm={6} md={4} key={index}>
                                <GiftCard
                                  gift={gift}
                                  isLoaded={true}
                                  isOwner={props.isOwner}
                                  canEdit={false}
                                />
                              </Grid.Col>
                            ))
                          )
                        }
                      </Grid>
                    </Tabs.Panel>
                  </Tabs>
                )
            }
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}

export default Profile;