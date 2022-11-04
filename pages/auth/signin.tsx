import { NextPage } from 'next';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import Router from 'next/router';
import { useForm, joiResolver } from '@mantine/form';
import { IconX, IconCheck } from '@tabler/icons';
import { Paper, TextInput, PasswordInput, Button, Title, Text, Anchor, Box, } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import Joi from 'joi';
import AppHead from '../../components/logics/Head';
import AuthLayout from '../../components/AuthLayout';
import { useState } from 'react';


interface IProps {

}


const SignIn: NextPage<IProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

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

    setIsLoading(false);
  }

  return (
    <>
      <AppHead title="Авторизация" />

      <AuthLayout>
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
          <Button type="submit" loading={isLoading} variant="gradient" fullWidth mt="xl" size="md">
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
      </AuthLayout>
    </>
  );
}

export default SignIn;