import { Paper, createStyles, TextInput, PasswordInput, Checkbox, Button, Title, Text, Anchor, Box, } from '@mantine/core';
import { NextPage } from 'next';
import Link from 'next/link';


interface IProps {

}


const SignIn: NextPage<IProps> = (props) => {


  return (
    <Box
      sx={(theme) => ({
        height: '100%',
        backgroundSize: 'cover',
        backgroundColor: theme.fn.primaryColor(),
      })}
    >
      <Paper
        radius={0} p={30}
        sx={(theme) => ({
          borderRight: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
            }`,
          minHeight: '100%',
          maxWidth: 450,
          paddingTop: 80,

          [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            maxWidth: '100%',
          },
        })}
      >
        <Title order={2} align="center" mt="md" mb={50}
          sx={(theme) => ({
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          })}
        >
          Welcome back!
        </Title>

        <TextInput label="Email address" placeholder="hello@gmail.com" size="md" />
        <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" />
        <Checkbox label="Keep me logged in" mt="xl" size="md" />

        <Button fullWidth mt="xl" size="md">
          Sign in
        </Button>

        <Text align="center" mt="md">
          Don&apos;t have an account? {' '}
          <Link href="/auth/signup" passHref>
            <Anchor<'a'> href="#" weight={700}>
              Sign up
            </Anchor>
          </Link>
        </Text>
      </Paper>
    </Box>
  );
}

export default SignIn;