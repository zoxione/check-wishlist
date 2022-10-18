import { Paper, createStyles, TextInput, PasswordInput, Checkbox, Button, Title, Text, Anchor, } from '@mantine/core';
import { NextPage } from 'next';
import Link from 'next/link';


const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundColor: theme.fn.primaryColor(),
  },

  form: {
    borderRight: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
      }`,
    minHeight: '100vh',
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%',
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    width: 120,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));


interface IProps {

}


const SignIn: NextPage<IProps> = (props) => {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
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
    </div>
  );
}

export default SignIn;