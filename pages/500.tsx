import { Image, Container, Title, Text, Button, SimpleGrid, Box } from '@mantine/core';
import { NextPage } from 'next';
import Link from 'next/link';


interface IProps {

}


const Error500: NextPage<IProps> = (props) => {
  return (
    <Container
      sx={(theme) => ({
        paddingTop: 80,
        paddingBottom: 80,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      })}
    >
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
        Сервер временно недоступен
      </Title>
      <Text color="dimmed" size="lg">
        Попробуйте позже.
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
    </Container>
  );
}

export default Error500;