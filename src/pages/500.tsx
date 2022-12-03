import { Button, Container, Text, Title } from '@mantine/core';
import { NextPage } from 'next';
import Link from 'next/link';
import AppHead from '../components/logics/Head';


interface IProps {

}


const Error500: NextPage<IProps> = (props) => {
  return (
    <>
      <AppHead />

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
    </>
  );
}

export default Error500;