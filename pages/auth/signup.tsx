import { Paper, createStyles, TextInput, PasswordInput, Checkbox, Button, Title, Text, Anchor, Box, Input, ScrollArea, } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { NextPage } from 'next';
import Link from 'next/link';
import Router from 'next/router';


interface IProps {

}


const SignUp: NextPage<IProps> = ({ }) => {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },

    validate: {
      name: (value) => (value.length > 2 ? null : 'Я не знаю, что это такое'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Неверный формат почты'),
      password: (value) => (value.length > 5 ? null : 'Пароль должен быть больше 5 символов'),
      passwordConfirm: (value, values) => (value === values.password ? null : 'Пароли не совпадают'),
    },
  });

  const handleSubmit = async () => {
    // const res = await signIn('credentials', {
    //   email: form.values.email,
    //   password: form.values.password,
    //   redirect: false,
    //   callbackUrl: "/"
    // });
    // console.log(res);

    // if (res?.ok == false) {
    //   showNotification({
    //     id: 'login-failed',
    //     disallowClose: true,
    //     autoClose: 2000,
    //     title: "Не удалось войти",
    //     message: 'Неверный логин или пароль',
    //     color: 'red',
    //     icon: <IconX />,
    //     loading: false,
    //   });
    // }
    // else {
    //   Router.push("/");
    // }
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
          Присоединиться к нам
        </Title>

        <form onSubmit={form.onSubmit(() => handleSubmit())}>
          <TextInput
            label="Как вы хотите, чтобы вас звали?"
            placeholder="Александр Пушкин"
            type="text"
            size="md"
            {...form.getInputProps('name')}
          />
          <Input.Wrapper
            label="У вас будет ссылка:"
            mt={10}
            size="md"
          >
            <ScrollArea style={{ width: "100%" }}>
              <Text
                sx={(theme) => ({
                  backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
                  borderRadius: theme.radius.md,
                  padding: '8px 10px',
                  color: theme.fn.primaryColor(),
                  overflow: 'hidden',
                  fontWeight: 500,
                })}
              >
                {`https://check-marketplace.vercel.app/${form.values.name}`}
              </Text>
            </ScrollArea>
          </Input.Wrapper>
          <TextInput
            label="Ваша почта"
            placeholder="hello@gmail.com"
            mt={10}
            size="md"
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Ваш сложный пароль"
            placeholder="qwerty123"
            mt={10}
            size="md"
            {...form.getInputProps('password')}
          />
          <PasswordInput
            label="Еще раз, чтобы не забыть 😜"
            placeholder="qwerty123"
            mt={10}
            size="md"
            {...form.getInputProps('passwordConfirm')}
          />
          <Button type="submit" fullWidth mt="xl" size="md">
            Зарегистрироваться
          </Button>
        </form>

        <Text align="center" mt="md">
          Уже есть аккаунт? {' '}
          <Link href="/auth/signin" passHref>
            <Anchor<'a'> href="#" weight={700}>
              Войти
            </Anchor>
          </Link>
        </Text>
      </Paper>
    </Box>
  );
}

export default SignUp;