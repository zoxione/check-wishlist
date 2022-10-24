import { Paper, createStyles, TextInput, PasswordInput, Checkbox, Button, Title, Text, Anchor, Box, Input, ScrollArea, Group, } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { NextPage } from 'next';
import Link from 'next/link';
import Router from 'next/router';


import { IconChevronRight, IconChevronLeft, IconCheck, IconX } from '@tabler/icons';
import { useState } from 'react';
import { z } from 'zod';

interface IProps {

}


const SignUp: NextPage<IProps> = ({ }) => {
  const form1 = useForm({
    initialValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Неверный формат почты'),
      password: (value) => (value.length > 5 ? null : 'Пароль должен быть больше 5 символов'),
      passwordConfirm: (value, values) => (value === values.password ? null : 'Пароли не совпадают'),
    }
  });

  const form2 = useForm({
    initialValues: {
      name: '',
      imageUrl: '',
      coverUrl: '',
      address: '',
    },
    validate: zodResolver(
      z.object({
        name: z.string().min(2, { message: 'Имя должно быть больше 2 символов' }),
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
    if (form1.isValid() && form2.isValid() && form3.isValid()) {
      const data = {
        ...form1.values,
        ...form2.values,
        ...form3.values
      }
      console.log(data);
      showNotification({
        title: 'Успешно',
        message: 'Вы успешно зарегистрировались',
        color: 'teal',
        icon: <IconCheck stroke={1.5} size={24} />,
      });
      Router.push('/auth/signin');
    }
    else {
      handleStep("next");
      showNotification({
        title: 'Ошибка',
        message: 'Возникла ошибка при регистрации',
        color: 'red',
        icon: <IconX stroke={1.5} size={24} />,
      });
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
    <form onSubmit={form1.onSubmit(() => handleSubmit())}>
      <TextInput
        label="Ваша почта"
        placeholder="hello@gmail.com"
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
    <form onSubmit={form2.onSubmit(() => handleSubmit())}>
      <TextInput
        label="Как вы хотите, чтобы вас звали?"
        placeholder="Александр Пушкин"
        type="text"
        size="md"
        required
        {...form2.getInputProps('name')}
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
            {`https://check-marketplace.vercel.app/${form2.values.name}`}
          </Text>
        </ScrollArea>
      </Input.Wrapper>
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
        {...form2.getInputProps('coverUrl')}
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
    <form onSubmit={form3.onSubmit(() => handleSubmit())}>
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