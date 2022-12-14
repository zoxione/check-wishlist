import { Anchor, Box, Button, Input, PasswordInput, Text, Textarea, TextInput, Title } from '@mantine/core';
import { joiResolver, useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconChevronLeft, IconChevronRight, IconX } from '@tabler/icons';
import Joi from 'joi';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import { useState } from 'react';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';

import { storageClient } from '../../lib/supabase';
import { AddUser } from '../../services/User';
import AuthLayout from '../../components/AuthLayout';
import AppHead from '../../components/logics/Head';
import { IUser } from '../../../types';
import { userSchema } from '../../lib/joi';
import { AVATAR_PLACEHOLDER_URL, BACKGROUND_PLACEHOLDER_URL } from '../../data/constants';


interface IProps {

}


const SignUp: NextPage<IProps> = ({ }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [avatars, setAvatars] = useState<FileWithPath[]>([]);

  const form1 = useForm({
    initialValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validate: joiResolver(
      Joi.object({
        username: userSchema.username,
        email: userSchema.email,
        password: userSchema.password,
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
      address: '',
    },
    validate: joiResolver(
      Joi.object({
        fullname: userSchema.fullname,
        about: userSchema.about,
        address: userSchema.address,
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
        tiktokName: userSchema.tiktokName,
        twitterName: userSchema.twitterName,
        vkName: userSchema.vkName,
        telegramName: userSchema.telegramName,
        instagramName: userSchema.instagramName,
      })
    ),
  });

  const handleSubmit = async () => {
    if (step === 2) {
      setIsLoading(true);


      const user: IUser = {
        username: form1.values.username,
        fullname: form2.values.fullname,
        email: form1.values.email,
        password: form1.values.password,
        about: form2.values.about,
        imageUrl: AVATAR_PLACEHOLDER_URL,
        backgroundUrl: BACKGROUND_PLACEHOLDER_URL,
        address: form2.values.address,
        isVerified: false,
        tiktokName: form3.values.tiktokName,
        twitterName: form3.values.twitterName,
        vkName: form3.values.vkName,
        telegramName: form3.values.telegramName,
        instagramName: form3.values.instagramName,
      }

      try {
        let timestamp = new Date().getTime()

        if (avatars[0]) {
          const { data, error } = await storageClient.from('check').upload(`/users/avatars/${user.username}_${timestamp}`, avatars[0], { cacheControl: '3600', upsert: true });

          user.imageUrl = `https://cserfwfqoxxsyqezqezy.supabase.co/storage/v1/object/public/check/users/avatars/${user.username}_${timestamp}`;

          if (error) {
            showNotification({
              title: 'Ошибка',
              message: 'Не удалось загрузить аватар',
              color: 'red',
              icon: <IconX stroke={1.5} size={24} />,
            });

            throw error;
          }
        }

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

      setIsLoading(false);
    }
    else {
      handleStep("next");
    }
  }

  const [step, setStep] = useState(0);
  const handleStep = (direction: string) => {
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
              value="wishlist.ictis.ru/"
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
      <Input.Wrapper
        label="Ваша аватарка"
        required
        size="md"
      >
      </Input.Wrapper>
      <Dropzone
        accept={IMAGE_MIME_TYPE}
        onDrop={(files) => { setAvatars(files); }}
        maxFiles={1}
        sx={(theme) => ({
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          margin: '0 auto',
          padding: '0',
          border: 'none',
          '&:hover': {
            filter: 'brightness(0.7)',
          },
        })}
      >
        <Image
          src={avatars[0] ? URL.createObjectURL(avatars[0]) : AVATAR_PLACEHOLDER_URL}
          alt="Avatar image"
          layout="fill"
          objectFit="cover"
          style={{ borderRadius: '50%' }}
        />
      </Dropzone>
      <TextInput
        label="Как вы хотите, чтобы вас звали?"
        placeholder="Александр Пушкин"
        type="text"
        size="md"
        mt={20}
        required
        {...form2.getInputProps('fullname')}
      />
      <Textarea
        label="Напишите пару слов о себе"
        placeholder="Я - человек, который любит писать стихи"
        mt={10}
        size="md"
        {...form2.getInputProps('about')}
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
        placeholder="pushkin"
        size="md"
        {...form3.getInputProps('tiktokName')}
      />
      <TextInput
        label="Твиттер"
        placeholder="pushkin"
        mt={10}
        size="md"
        {...form3.getInputProps('twitterName')}
      />
      <TextInput
        label="ВКонтакте"
        placeholder="pushkin"
        mt={10}
        size="md"
        {...form3.getInputProps('vkName')}
      />
      <TextInput
        label="Телеграм"
        placeholder="pushkin"
        mt={10}
        size="md"
        {...form3.getInputProps('telegramName')}
      />
      <TextInput
        label="Инстаграм"
        placeholder="pushkin"
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
        <Button variant="gradient" loading={isLoading} onClick={() => handleStep("prev")}>
          <IconChevronLeft size={18} />
        </Button>
        <Button type="submit" loading={isLoading} variant="gradient">
          <IconCheck size={18} />
        </Button>
      </Box>
    </form>,
  ]

  return (
    <>
      <AppHead title="Регистрация" />

      <AuthLayout>
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
      </AuthLayout>
    </>
  );
}

export default SignUp;