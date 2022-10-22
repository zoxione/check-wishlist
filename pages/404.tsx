import { createStyles, Image, Container, Title, Text, Button, SimpleGrid, Box } from '@mantine/core';
import { NextPage } from 'next';
import Link from 'next/link';



interface IProps {

}


const Error: NextPage<IProps> = (props) => {
  return (
    <Container
      sx={(theme) => ({
        paddingTop: 80,
        paddingBottom: 80,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
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
            <Button variant="outline" size="md" mt="xl"
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
  );
}

export default Error;