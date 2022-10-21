import { Paper, createStyles, TextInput, PasswordInput, Checkbox, Button, Title, Text, Anchor, Box, } from '@mantine/core';
import { NextPage } from 'next';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { FormEventHandler, useState } from 'react';






interface IProps {

}


const SignIn: NextPage<IProps> = (props) => {

  const { status, data } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      email: email,
      password: password,
      redirect: false,
      callbackUrl: "/"
    });

    console.log(res);
  }


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

        <form onSubmit={handleSubmit}>
          <TextInput
            label="Почта"
            placeholder="hello@gmail.com"
            size="md"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <PasswordInput
            label="Пароль"
            placeholder="Your password"
            mt="md"
            size="md"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <Checkbox
            label="Keep me logged in"
            mt="xl"
            size="md"
          />

          <Button type="submit" fullWidth mt="xl" size="md">
            Sign in
          </Button>
        </form>

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