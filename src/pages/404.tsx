import { Box, Button, Container, Image, SimpleGrid, Text, Title } from '@mantine/core';
import { NextPage } from 'next';
import Link from 'next/link';
import AppHead from '../components/logics/Head';


interface IProps {

}


const Error404: NextPage<IProps> = (props) => {
  return (
    <>
      <AppHead />

      <Container
        sx={(theme) => ({
          paddingTop: 80,
          paddingBottom: 80,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        })}
      >
        <SimpleGrid spacing={80} cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1, spacing: 40 }]}>
          <Image src={"https://ui.mantine.dev/_next/static/media/image.11cd6c19.svg"} alt="404"
            sx={(theme) => ({
              [theme.fn.largerThan('sm')]: {
                display: 'none',
              },
            })}
          />
          <Box>
            <Title
              sx={(theme) => ({
                fontWeight: 900,
                fontSize: 34,
                marginBottom: theme.spacing.md,
                fontFamily: ``,
                [theme.fn.smallerThan('sm')]: {
                  fontSize: 32,
                },
              })}
            >
              Такой страницы не существует
            </Title>
            <Text color="dimmed" size="lg">
              Возможно, вы ошиблись при вводе адреса или страница была удалена.
            </Text>
            <Link href="/" passHref>
              <Button variant="gradient" size="md" mt="xl"
                sx={(theme) => ({
                  [theme.fn.smallerThan('sm')]: {
                    width: '100%',
                  },
                })}
              >
                Вернуться на главную
              </Button>
            </Link>
          </Box>
          <Image src={"https://ui.mantine.dev/_next/static/media/image.11cd6c19.svg"} alt="404"
            sx={(theme) => ({
              [theme.fn.smallerThan('sm')]: {
                display: 'none',
              },
            })}
          />
        </SimpleGrid>
      </Container>
    </>
  );
}

export default Error404;