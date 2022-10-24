import { NextPage } from 'next';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import Router from 'next/router';

import { useForm } from '@mantine/form';
import { IconX, IconCheck } from '@tabler/icons';
import { Paper, TextInput, PasswordInput, Button, Title, Text, Anchor, Box, } from '@mantine/core';
import { showNotification } from '@mantine/notifications';


interface IProps {

}


const SignIn: NextPage<IProps> = ({ }) => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Неверный формат почты'),
      password: (value) => (value.length > 5 ? null : 'Пароль должен быть больше 5 символов'),
    },
  });

  const handleSubmit = async () => {
    const res = await signIn('credentials', {
      email: form.values.email,
      password: form.values.password,
      redirect: false,
      callbackUrl: "/"
    });
    console.log(res);

    if (res?.ok == false) {
      showNotification({
        title: 'Ошибка',
        message: 'Неверный логин или пароль',
        color: 'red',
        icon: <IconX stroke={1.5} size={24} />,
      });
    }
    else {
      showNotification({
        title: 'Успешно',
        message: 'Вы успешно вошли в аккаунт',
        color: 'teal',
        icon: <IconCheck stroke={1.5} size={24} />,
      });
      Router.push("/");
    }
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
          borderRight: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]}`,
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
          С возвращением!
        </Title>

        <form onSubmit={form.onSubmit(() => handleSubmit())}>
          <TextInput
            label="Почта"
            placeholder="hello@gmail.com"
            size="md"
            required
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Пароль"
            placeholder="qwerty123"
            mt={10}
            size="md"
            required
            {...form.getInputProps('password')}
          />
          <Button type="submit" fullWidth mt="xl" size="md">
            Войти
          </Button>
        </form>

        <Text align="center" mt="md">
          У вас нет аккаунт? {' '}
          <Link href="/auth/signup" passHref>
            <Anchor<'a'> href="#" weight={700}>
              Зарегистрироваться
            </Anchor>
          </Link>
        </Text>
      </Paper>
    </Box>
  );
}

export default SignIn;