import { NextPage } from 'next';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import Router from 'next/router';

import { useForm, joiResolver } from '@mantine/form';
import { IconX, IconCheck } from '@tabler/icons';
import { Paper, TextInput, PasswordInput, Button, Title, Text, Anchor, Box, } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import Joi from 'joi';

interface IProps {

}


const SignIn: NextPage<IProps> = ({ }) => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: joiResolver(
      Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).messages({
          'string.base': 'Email должен быть строкой',
          'string.empty': 'Email не может быть пустым',
          'string.email': 'Email должен быть валидным',
        }),
        password: Joi.string().min(6).max(19).messages({
          'string.base': 'Пароль должен быть строкой',
          'string.empty': 'Пароль не может быть пустым',
          'string.min': 'Пароль должен быть больше 5 символов',
          'string.max': 'Пароль должен быть меньше 20 символов',
        }),
      })
    ),
  });

  const handleSubmit = async () => {
    console.log('form.values', form.values);
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
          <Button type="submit" variant="gradient" fullWidth mt="xl" size="md">
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