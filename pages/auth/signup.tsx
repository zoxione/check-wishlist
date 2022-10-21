import { Paper, createStyles, TextInput, PasswordInput, Checkbox, Button, Title, Text, Anchor, Box, } from '@mantine/core';
import { NextPage } from 'next';
import Link from 'next/link';


interface IProps {

}


const SignUp: NextPage<IProps> = (props) => {



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
          Create an account
        </Title>

        <TextInput label="Email address" placeholder="hello@gmail.com" size="md" />
        <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" />
        <PasswordInput label="Retry password" placeholder="Your password" mt="md" size="md" />

        <Button fullWidth mt="xl" size="md">
          Sign up
        </Button>

        <Text align="center" mt="md">
          Do have an account? {' '}
          <Link href="/auth/signin" passHref>
            <Anchor<'a'> href="#" weight={700}>
              Sign In
            </Anchor>
          </Link>
        </Text>
      </Paper>
    </Box>
  );
}

export default SignUp;