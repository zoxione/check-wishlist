import { Avatar, Paper, createStyles, TextInput, PasswordInput, Checkbox, Button, Title, Text, Anchor, Container, Grid, Tabs, Group, } from '@mantine/core';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router'
import CardGift from '../../components/GiftCard';
import { IGift } from '../../types';

const useStyles = createStyles((theme) => ({
  wrapper: {
    height: '210px',
    maxWidth: '100vw',
    padding: '0',
    margin: '0',
    backgroundSize: 'cover',
    backgroundColor: theme.fn.primaryColor(),
  },
}));


// // Получение данных с сервера
// export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
//   // Проверка на авторизацию
//   //const session = await getSession({ req });
//   const session = await unstable_getServerSession(req, res, authOptions)
//   if (!session) {
//     res.statusCode = 403;
//     return { props: {} };
//   }

//   const user = await prisma.user.findUnique({
//     where: {
//       id: String(params?.id)
//     }
//   });
//   const jobs = await prisma.job.findMany({
//     where: {
//       author: { email: session?.user?.email ? session.user.email : '' },
//     },
//     include: {
//       author: {
//         select: { name: true },
//       },
//     },
//   });
//   jobs.sort((a, b) => {
//     return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
//   });

//   return {
//     props: { user, jobs },
//   };
// };


interface IProps {
  // user: UserProps
  avatar: string;
  name: string;
  email: string;
  job: string;
}

var data: IGift[] = [
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

const User: NextPage<IProps> = ({ avatar, name, email, job }: IProps) => {
  const router = useRouter()
  const { id } = router.query


  const { classes } = useStyles();
  return (
    <>
      <Container className={classes.wrapper}>
      </Container>

      <Container sx={(theme) => ({
        marginTop: '30px',
        maxWidth: '1024px',
      })}>
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
              <Avatar src={avatar} size={120} radius={120} mx="auto" />
              <Text align="center" size="lg" weight={500} mt="md">
                Name
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
                <Button variant="outline" fullWidth >
                  Suggest Gift
                </Button>
              </Group>
            </Paper>
          </Grid.Col>

          <Grid.Col sm={8}>
            <Tabs defaultValue="wishlist">
              <Tabs.List>
                <Tabs.Tab value="wishlist">Wishlist</Tabs.Tab>
                <Tabs.Tab value="gifters">Gifters</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="wishlist" pt="xs">
                <Grid>
                  {data.map((gift, index) => (
                    <Grid.Col xs={6} sm={6} md={4}>
                      <CardGift
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
                Messages tab content
              </Tabs.Panel>
            </Tabs>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}

export default User;