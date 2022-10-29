import { Paper, createStyles, TextInput, PasswordInput, Checkbox, Button, Title, Text, Anchor, Box, Input, ScrollArea, Group, } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { NextPage } from 'next';
import Link from 'next/link';
import Router from 'next/router';


import { IconChevronRight, IconChevronLeft, IconCheck, IconX } from '@tabler/icons';
import { useState } from 'react';
import { z } from 'zod';

import { IUser } from '../../types'

interface IProps {

}


const SignUp: NextPage<IProps> = ({ }) => {
  const form1 = useForm({
    initialValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validate: {
      username: (value) => (value.length > 3 ? null : 'Имя должно быть больше 3 символов'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Неверный формат почты'),
      password: (value) => (value.length > 5 ? null : 'Пароль должен быть больше 5 символов'),
      passwordConfirm: (value, values) => (value === values.password ? null : 'Пароли не совпадают'),
    }
  });

  const form2 = useForm({
    initialValues: {
      fullname: '',
      about: '',
      imageUrl: '',
      backgroundUrl: '',
      address: '',
    },
    validate: zodResolver(
      z.object({
        fullname: z.string().min(3, { message: 'ФИО должно быть больше 3 символов' }),
        // imageUrl: z.string().url({ message: 'Ссылка должна быть валидной' }),
        // coverUrl: z.string().url({ message: 'Ссылка должна быть валидной' }),
        // address: z.string().min(5, { message: 'Адрес должен быть больше 5 символов' }),
      })
    )
  });

  const form3 = useForm({
    initialValues: {
      tiktokName: '',
      twitterName: '',
      vkName: '',
      telegramName: '',
      instagramName: ''
    },
    validate: zodResolver(
      z.object({
        // tiktokName: z.string().min(2, { message: 'Имя должно быть больше 2 символов' }),
        // twitterName: z.string().min(2, { message: 'Имя должно быть больше 2 символов' }),
        // vkName: z.string().min(2, { message: 'Имя должно быть больше 2 символов' }),
        // telegramName: z.string().min(2, { message: 'Имя должно быть больше 2 символов' }),
        // instagramName: z.string().min(2, { message: 'Имя должно быть больше 2 символов' }),
      })
    )
  });

  const handleSubmit = async () => {
    if (step === 2) {
      const user: IUser = {
        username: form1.values.username,
        fullname: form2.values.fullname,
        email: form1.values.email,
        password: form1.values.password,
        about: form2.values.about,
        imageUrl: form2.values.imageUrl,
        backgroundUrl: form2.values.backgroundUrl,
        address: form2.values.address,
        isVerified: false,
        tiktokName: form3.values.tiktokName,
        twitterName: form3.values.twitterName,
        vkName: form3.values.vkName,
        telegramName: form3.values.telegramName,
        instagramName: form3.values.instagramName,
      }
      console.log(JSON.stringify(user));

      try {
        await fetch('http://localhost:8080/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user),
        }).then((res) => {
          if (res.ok) {
            showNotification({
              title: 'Успешно',
              message: 'Вы успешно зарегистрировались',
              color: 'teal',
              icon: <IconCheck stroke={1.5} size={24} />,
            });
            Router.push('/auth/signin');
          }
          else {
            console.log(res);
            showNotification({
              title: 'Ошибка',
              message: 'Возникла ошибка при регистрации',
              color: 'red',
              icon: <IconX stroke={1.5} size={24} />,
            });
          }
        });
      }
      catch (error) {
        console.error(error);
        showNotification({
          title: 'Ошибка',
          message: 'Возникла ошибка при регистрации',
          color: 'red',
          icon: <IconX stroke={1.5} size={24} />,
        });
      }
    }
    else {
      handleStep("next");
    }
  }

  const [step, setStep] = useState(0);
  const handleStep = (direction: string) => {
    console.log(step)
    if (direction === "next") {
      if (step < 2) {
        setStep(step + 1);
      }
    }
    else if (direction === "prev") {
      if (step > 0) {
        setStep(step - 1);
      }
    }
  }

  const formList = [
    <form key={1} onSubmit={form1.onSubmit(() => handleStep("next"))}>
      <TextInput
        rightSectionProps={`${form1.values.username}`}
        label="Ваш никнейм"
        placeholder="Nagibator228"
        size="md"
        required
        {...form1.getInputProps('username')}
      />
      <Input.Wrapper
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
            {`https://check-marketplace.vercel.app/${form1.values.username}`}
          </Text>
        </ScrollArea>
      </Input.Wrapper>
      <TextInput
        label="Ваша почта"
        placeholder="hello@gmail.com"
        mt={10}
        size="md"
        required
        {...form1.getInputProps('email')}
      />
      <PasswordInput
        label="Ваш сложный пароль"
        placeholder="qwerty123"
        mt={10}
        size="md"
        required
        {...form1.getInputProps('password')}
      />
      <PasswordInput
        label="Еще раз, чтобы не забыть 😜"
        placeholder="qwerty123"
        mt={10}
        size="md"
        required
        {...form1.getInputProps('passwordConfirm')}
      />
      <Box
        sx={(theme) => ({
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: "10px",
          marginTop: theme.spacing.md,
        })}
      >
        <Button variant="gradient" onClick={() => handleStep("prev")}>
          <IconChevronLeft size={18} />
        </Button>
        <Button type="submit" variant="gradient">
          <IconChevronRight size={18} />
        </Button>
      </Box>
    </form>,
    <form key={2} onSubmit={form2.onSubmit(() => handleStep("next"))}>
      <TextInput
        label="Как вы хотите, чтобы вас звали?"
        placeholder="Александр Пушкин"
        type="text"
        size="md"
        required
        {...form2.getInputProps('fullname')}
      />
      <TextInput
        label="Напишите пару слов о себе"
        placeholder="Я - человек, который любит писать стихи"
        mt={10}
        size="md"
        {...form2.getInputProps('about')}
      />
      <TextInput
        label="Ссылка на аватарку"
        placeholder="https://example.com/photo.jpg"
        mt={10}
        size="md"
        {...form2.getInputProps('imageUrl')}
      />
      <TextInput
        label="Ссылка на обложку"
        placeholder="https://example.com/cover.jpg"
        mt={10}
        size="md"
        {...form2.getInputProps('backgroundUrl')}
      />
      <TextInput
        label="Адрес доставки"
        placeholder="Москва, ул. Ленина, д. 1"
        mt={10}
        size="md"
        {...form2.getInputProps('address')}
      />
      <Box
        sx={(theme) => ({
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: "10px",
          marginTop: theme.spacing.md,
        })}
      >
        <Button variant="gradient" onClick={() => handleStep("prev")}>
          <IconChevronLeft size={18} />
        </Button>
        <Button type="submit" variant="gradient">
          <IconChevronRight size={18} />
        </Button>
      </Box>
    </form>,
    <form key={3} onSubmit={form3.onSubmit(() => handleSubmit())}>
      <TextInput
        label="ТикТок"
        placeholder="candyyy_giiirl"
        size="md"
        {...form3.getInputProps('tiktokName')}
      />
      <TextInput
        label="Твиттер"
        placeholder="candyyy_giiirl"
        mt={10}
        size="md"
        {...form3.getInputProps('twitterName')}
      />
      <TextInput
        label="ВКонтакте"
        placeholder="candyyy_giiirl"
        mt={10}
        size="md"
        {...form3.getInputProps('vkName')}
      />
      <TextInput
        label="Телеграм"
        placeholder="candyyy_giiirl"
        mt={10}
        size="md"
        {...form3.getInputProps('telegramName')}
      />
      <TextInput
        label="Инстаграм"
        placeholder="candyyy_giiirl"
        mt={10}
        size="md"
        {...form3.getInputProps('instagramName')}
      />
      <Box
        sx={(theme) => ({
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: "10px",
          marginTop: theme.spacing.md,
        })}
      >
        <Button variant="gradient" onClick={() => handleStep("prev")}>
          <IconChevronLeft size={18} />
        </Button>
        <Button type="submit" variant="gradient">
          <IconCheck size={18} />
        </Button>
      </Box>
    </form>,
  ]

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

        {
          formList[step]
        }

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