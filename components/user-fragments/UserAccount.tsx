import React, { FunctionComponent } from 'react'
import { useRouter } from 'next/router';
import Joi from 'joi';
import { Textarea, Container, Box, Button, PasswordInput, Avatar, TextInput, useMantineTheme, Center } from '@mantine/core';
import { IconCheck, IconX, IconTrash } from '@tabler/icons';
import { useForm, joiResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';

import UserFragmentLayout from './UserFragmentLayout';
import InfoCard from '../ui/InfoCard';
import { IUser } from '../../types';
import { UpdateUser } from '../../api/User';


interface IProps {
  user: IUser;
};


const UserAccount: FunctionComponent<IProps> = (props: IProps) => {
  const theme = useMantineTheme();
  const router = useRouter();

  const form = useForm({
    initialValues: {
      username: props.user?.username,
      fullname: props.user?.fullname,
      email: props.user?.email,
      password: props.user?.password,
      about: props.user?.about,
      imageUrl: props.user?.imageUrl,
      backgroundUrl: props.user?.backgroundUrl,
      address: props.user?.address,
      tiktokName: props.user?.tiktokName,
      twitterName: props.user?.twitterName,
      vkName: props.user?.vkName,
      telegramName: props.user?.telegramName,
      instagramName: props.user?.instagramName,
    },

    validate: joiResolver(
      Joi.object({
        username: Joi.string().min(3).max(13).messages({
          'string.base': 'Имя должно быть строкой',
          'string.empty': 'Имя не может быть пустым',
          'string.min': 'Имя должно быть больше 2 символов',
          'string.max': 'Имя должно быть меньше 14 символов',
        }),
        fullname: Joi.string().max(29).allow('').messages({
          'string.base': 'ФИО должно быть строкой',
          'string.max': 'ФИО должно быть меньше 30 символов',
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
    const user: IUser = {
      username: form.values.username,
      fullname: form.values.fullname,
      email: form.values.email,
      password: form.values.password,
      about: form.values.about,
      imageUrl: form.values.imageUrl,
      backgroundUrl: form.values.backgroundUrl,
      address: form.values.address,
      tiktokName: form.values.tiktokName,
      twitterName: form.values.twitterName,
      vkName: form.values.vkName,
      telegramName: form.values.telegramName,
      instagramName: form.values.instagramName,
    }
    console.log(JSON.stringify(user));

    try {
      await UpdateUser(user);

      showNotification({
        title: 'Успешно',
        message: 'Данные успешно обновлены',
        color: 'teal',
        icon: <IconCheck stroke={1.5} size={24} />,
      });

      router.replace(router.asPath);
    }
    catch (error) {
      console.error(error);
      showNotification({
        title: 'Ошибка',
        message: 'Ошибка при обновлении данных',
        color: 'red',
        icon: <IconX stroke={1.5} size={24} />,
      });
    }
  }

  return (
    <>
      <Container
        sx={(theme) => ({
          height: '210px',
          maxWidth: '100vw',
          padding: '0',
          margin: '0',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: `url(${props.user?.backgroundUrl ? props.user.backgroundUrl : ''})`,
          backgroundColor: props.user?.backgroundUrl ? '' : theme.colors.gray[4],
        })}
      >
      </Container>

      <UserFragmentLayout>
        <InfoCard title="Основная информация">
          <Box
            sx={(theme) => ({
              maxWidth: '350px',
              margin: '0 auto',
            })}
          >
            <form onSubmit={form.onSubmit(() => handleSubmit())}>
              <Center>
                <Avatar
                  src={props.user?.imageUrl}
                  color={theme.fn.primaryColor()}
                  sx={(theme) => ({
                    width: '180px',
                    height: '180px',
                    borderRadius: '50%',
                  })}
                />
              </Center>
              <TextInput
                label="Имя"
                mt={20}
                size="md"
                {...form.getInputProps('username')}
              />
              <TextInput
                label="ФИО"
                mt={10}
                size="md"
                {...form.getInputProps('fullname')}
              />
              <TextInput
                label="Почта"
                mt={10}
                size="md"
                {...form.getInputProps('email')}
              />
              <PasswordInput
                label="Пароль"
                mt={10}
                size="md"
                {...form.getInputProps('password')}
              />
              <Textarea
                label="Описание"
                mt={10}
                size="md"
                {...form.getInputProps('about')}
              />
              <TextInput
                label="Ссылка на аватарку"
                mt={10}
                size="md"
                {...form.getInputProps('imageUrl')}
              />
              <TextInput
                label="Ссылка на обложку"
                mt={10}
                size="md"
                {...form.getInputProps('backgroundUrl')}
              />
              <TextInput
                label="Адрес доставки"
                mt={10}
                size="md"
                {...form.getInputProps('address')}
              />
              <TextInput
                label="ТикТок"
                mt={10}
                size="md"
                {...form.getInputProps('tiktokName')}
              />
              <TextInput
                label="Твиттер"
                mt={10}
                size="md"
                {...form.getInputProps('twitterName')}
              />
              <TextInput
                label="ВКонтакте"
                mt={10}
                size="md"
                {...form.getInputProps('vkName')}
              />
              <TextInput
                label="Телеграм"
                mt={10}
                size="md"
                {...form.getInputProps('telegramName')}
              />
              <TextInput
                label="Инстаграм"
                mt={10}
                size="md"
                {...form.getInputProps('instagramName')}
              />
              <Box
                mt={20}
                sx={(theme) => ({
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '20px',
                })}
              >
                <Button type="submit" fullWidth variant="outline" color="teal">
                  Сохранить
                </Button>
                <Button onClick={() => { form.reset() }} variant="filled" color="red">
                  <IconTrash size={18} />
                </Button>
              </Box>
            </form>
          </Box>
        </InfoCard>
      </UserFragmentLayout >
    </>
  )
}

export default UserAccount;