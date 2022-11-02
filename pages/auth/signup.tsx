import { NextPage } from 'next';
import Link from 'next/link';
import Router from 'next/router';
import { useState } from 'react';
import { Paper, TextInput, PasswordInput, Button, Title, Text, Anchor, Box, Input } from '@mantine/core';
import { useForm, joiResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconChevronRight, IconChevronLeft, IconCheck, IconX } from '@tabler/icons';
import Joi from 'joi';

import { IUser } from '../../types'
import { AddUser } from '../../api/User';


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
    validate: joiResolver(
      Joi.object({
        username: Joi.string().min(3).max(13).messages({
          'string.base': 'Имя должно быть строкой',
          'string.empty': 'Имя не может быть пустым',
          'string.min': 'Имя должно быть больше 2 символов',
          'string.max': 'Имя должно быть меньше 14 символов',
          // 'string.base': '',
          // 'string.empty': '',
          // 'string.min': '',
          // 'string.max': '',
        }),
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
        passwordConfirm: Joi.string().valid(Joi.ref('password')).messages({
          'string.base': 'Пароль должен быть строкой',
          'string.empty': 'Пароль не может быть пустым',
          'any.only': 'Пароли должны совпадать',
        }),
      })
    ),
  });

  const form2 = useForm({
    initialValues: {
      fullname: '',
      about: '',
      imageUrl: '',
      backgroundUrl: '',
      address: '',
    },
    validate: joiResolver(
      Joi.object({
        fullname: Joi.string().max(29).allow('').messages({
          'string.base': 'ФИО должно быть строкой',
          'string.max': 'ФИО должно быть меньше 30 символов',
        }),
        about: Joi.string().max(79).allow('').messages({
          'string.base': 'Описание должно быть строкой',
          'string.max': 'Описание должно быть меньше 80 символов',
        }),
        imageUrl: Joi.string().uri().allow('').messages({
          'string.base': 'Ссылка должна быть строкой',
          'string.uri': 'Ссылка должна быть валидной',
        }),
        backgroundUrl: Joi.string().uri().allow('').messages({
          'string.base': 'Ссылка должна быть строкой',
          'string.uri': 'Ссылка должна быть валидной',
        }),
        address: Joi.string().max(29).allow('').messages({
          'string.base': 'Адрес должен быть строкой',
          'string.max': 'Адрес должен быть меньше 30 символов',
        }),
      })
    ),
  });

  const form3 = useForm({
    initialValues: {
      tiktokName: '',
      twitterName: '',
      vkName: '',
      telegramName: '',
      instagramName: ''
    },
    validate: joiResolver(
      Joi.object({
        tiktokName: Joi.string().max(19).allow('').messages({
          'string.base': 'Имя должно быть строкой',
          'string.max': 'Имя должно быть меньше 20 символов',
        }),
        twitterName: Joi.string().max(19).allow('').messages({
          'string.base': 'Имя должно быть строкой',
          'string.max': 'Имя должно быть меньше 20 символов',
        }),
        vkName: Joi.string().max(19).allow('').messages({
          'string.base': 'Имя должно быть строкой',
          'string.max': 'Имя должно быть меньше 20 символов',
        }),
        telegramName: Joi.string().max(19).allow('').messages({
          'string.base': 'Имя должно быть строкой',
          'string.max': 'Имя должно быть меньше 20 символов',
        }),
        instagramName: Joi.string().max(19).allow('').messages({
          'string.base': 'Имя должно быть строкой',
          'string.max': 'Имя должно быть меньше 20 символов',
        }),
      })
    ),
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
        await AddUser(user);

        showNotification({
          title: 'Успешно',
          message: 'Вы успешно зарегистрировались',
          color: 'teal',
          icon: <IconCheck stroke={1.5} size={24} />,
        });

        Router.push('/auth/signin');
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
      <Box
      >
        <Input.Wrapper
          size="md"
          error={form1.errors.username}
        >
          <Input.Label size="md" required>Ваш никнейм</Input.Label>
          <Box
            sx={(theme) => ({
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            })}
          >
            <Input
              sx={(theme) => ({
                input: {
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
                  '&:active, &:focus': {
                    borderColor: theme.colors.gray[4],
                  }
                },
                width: '250px',
              })}
              size="md"
              readOnly
              value={`check-wishlist.ru/${form1.values.username}`}
            />
            <TextInput
              sx={(theme) => ({
                input: {
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                },
                "[role=alert]": {
                  backgroundColor: theme.colors.yellow[6],
                  color: theme.colors.yellow[9],
                  display: 'none'
                },
                width: '100%',
              })}
              placeholder="Nagibator228"
              size="md"
              {...form1.getInputProps('username')}
            />
          </Box>
        </Input.Wrapper>
      </Box>
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
        label="Повторите пароль"
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