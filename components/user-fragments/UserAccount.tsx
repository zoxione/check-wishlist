import { Box, Button, Center, Container, Text, Textarea, TextInput, useMantineTheme } from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { joiResolver, useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconTrash, IconX } from '@tabler/icons';
import Joi from 'joi';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';

import { storageClient } from '../../api';
import { UpdateUser } from '../../api/User';
import { IUser } from '../../types';
import InfoCard from '../ui/InfoCard';
import UserFragmentLayout from './UserFragmentLayout';

interface IProps {
  user: IUser;
};


const UserAccount: FunctionComponent<IProps> = (props: IProps) => {
  const theme = useMantineTheme();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [avatars, setAvatars] = useState<FileWithPath[]>([]);
  const [backgrounds, setBackgrounds] = useState<FileWithPath[]>([]);


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
        username: Joi.string().regex(/^[A-Za-z0-9]+$/).min(3).max(13).messages({
          'string.pattern.base': 'Имя пользователя должно состоять только из латинских букв и цифр',
          'string.base': 'Имя должно быть строкой',
          'string.empty': 'Имя не может быть пустым',
          'string.min': 'Имя должно быть больше 2 символов',
          'string.max': 'Имя должно быть меньше 14 символов',
        }),
        fullname: Joi.string().regex(/^[A-Za-zА-Яа-я]+$/).max(29).allow('').messages({
          'string.pattern.base': 'ФИО должно состоять только из букв',
          'string.base': 'ФИО должно быть строкой',
          'string.max': 'ФИО должно быть меньше 30 символов',
        }),
        email: Joi.string().email({ tlds: { allow: false } }).messages({
          'string.base': 'Email должен быть строкой',
          'string.empty': 'Email не может быть пустым',
          'string.email': 'Email должен быть валидным',
        }),
        password: Joi.string().regex(/^[A-Za-z0-9]+$/).min(6).max(19).messages({
          'string.pattern.base': 'Пароль должен состоять только из латинских букв и цифр',
          'string.base': 'Пароль должен быть строкой',
          'string.empty': 'Пароль не может быть пустым',
          'string.min': 'Пароль должен быть больше 5 символов',
          'string.max': 'Пароль должен быть меньше 20 символов',
        }),
        about: Joi.string().regex(/^[A-Za-zА-Яа-я]+$/).max(79).allow('').messages({
          'string.pattern.base': 'Описание должно состоять только из букв',
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
        address: Joi.string().regex(/^[A-Za-zА-Яа-я]+$/).max(29).allow('').messages({
          'string.pattern.base': 'Адрес должен состоять только из букв',
          'string.base': 'Адрес должен быть строкой',
          'string.max': 'Адрес должен быть меньше 30 символов',
        }),
        tiktokName: Joi.string().regex(/^[A-Za-z0-9]+$/).max(19).allow('').messages({
          'string.pattern.base': 'Имя должно состоять только из латинских букв и цифр',
          'string.base': 'Имя должно быть строкой',
          'string.max': 'Имя должно быть меньше 20 символов',
        }),
        twitterName: Joi.string().regex(/^[A-Za-z0-9]+$/).max(19).allow('').messages({
          'string.pattern.base': 'Имя должно состоять только из латинских букв и цифр',
          'string.base': 'Имя должно быть строкой',
          'string.max': 'Имя должно быть меньше 20 символов',
        }),
        vkName: Joi.string().regex(/^[A-Za-z0-9]+$/).max(19).allow('').messages({
          'string.pattern.base': 'Имя должно состоять только из латинских букв и цифр',
          'string.base': 'Имя должно быть строкой',
          'string.max': 'Имя должно быть меньше 20 символов',
        }),
        telegramName: Joi.string().regex(/^[A-Za-z0-9]+$/).max(19).allow('').messages({
          'string.pattern.base': 'Имя должно состоять только из латинских букв и цифр',
          'string.base': 'Имя должно быть строкой',
          'string.max': 'Имя должно быть меньше 20 символов',
        }),
        instagramName: Joi.string().regex(/^[A-Za-z0-9]+$/).max(19).allow('').messages({
          'string.pattern.base': 'Имя должно состоять только из латинских букв и цифр',
          'string.base': 'Имя должно быть строкой',
          'string.max': 'Имя должно быть меньше 20 символов',
        }),
      })
    ),
  });

  const handleSubmit = async () => {
    setIsLoading(true);

    const user: IUser = {
      id: props.user.id,
      username: form.values.username,
      fullname: props.user.fullname,
      email: props.user.email,
      password: props.user.password,
      about: form.values.about,
      imageUrl: props.user.imageUrl,
      backgroundUrl: props.user.backgroundUrl,
      address: props.user.address,
      isVerified: props.user.isVerified,
      tiktokName: form.values.tiktokName,
      twitterName: form.values.twitterName,
      vkName: form.values.vkName,
      telegramName: form.values.telegramName,
      instagramName: form.values.instagramName,
    }

    try {
      let timestamp = new Date().getTime()

      if (avatars.length > 0) {
        const { data, error } = await storageClient.from('check').upload(`/users/avatars/${user.username}_${timestamp}`, avatars[0], { cacheControl: '3600', upsert: true });

        if (error) {
          throw new Error('Ошибка загрузки аватара');
        }

        //storageClient.from('check').remove([user.imageUrl.slice(71)]);
        user.imageUrl = `https://cserfwfqoxxsyqezqezy.supabase.co/storage/v1/object/public/check/users/avatars/${user.username}_${timestamp}`;
      }

      if (backgrounds.length > 0) {
        const { data, error } = await storageClient.from('check').upload(`/users/backgrounds/${user.username}_${timestamp}`, backgrounds[0], { cacheControl: '3600', upsert: true });

        if (error) {
          throw new Error('Ошибка загрузки обложки');
        }

        //storageClient.from('check').remove([user.backgroundUrl.slice(71)]);
        user.backgroundUrl = `https://cserfwfqoxxsyqezqezy.supabase.co/storage/v1/object/public/check/users/backgrounds/${user.username}_${timestamp}`;
      }

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

    setIsLoading(false);
  }


  return (
    <>
      <Dropzone
        accept={IMAGE_MIME_TYPE}
        onDrop={(files) => { setBackgrounds(files) }}
        maxFiles={1}
        sx={(theme) => ({
          margin: '0 auto',
          padding: '0',
          border: 'none',
          '&:hover': {
            filter: 'brightness(0.7)',
          },
        })}
      >
        <Container
          sx={(theme) => ({
            position: 'relative',
            height: '300px',
            maxWidth: '100vw',
            padding: '0',
            margin: '0',
          })}
        >
          <Image
            src={backgrounds[0] ? URL.createObjectURL(backgrounds[0]) : props.user?.backgroundUrl}
            alt="Background image"
            layout="fill"
            priority={true}
            objectFit="cover"
          />
        </Container>
      </Dropzone>

      <UserFragmentLayout>
        <InfoCard title="Редактирование профиля">
          <Box
            sx={(theme) => ({
              maxWidth: '350px',
              margin: '0 auto',
            })}
          >
            <form onSubmit={form.onSubmit(() => handleSubmit())}>
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
                <Center>
                  <Image
                    src={avatars[0] ? URL.createObjectURL(avatars[0]) : props.user?.imageUrl}
                    alt="Avatar image"
                    layout="fill"
                    priority={true}
                    objectFit="cover"
                    style={{ borderRadius: '50%' }}
                  />
                </Center>
              </Dropzone>

              <TextInput
                label="Имя"
                mt={20}
                size="md"
                {...form.getInputProps('username')}
              />
              <Textarea
                label="О себе"
                mt={10}
                size="md"
                {...form.getInputProps('about')}
              />
              <TextInput
                label="ТикТок"
                mt={20}
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
                mt={30}
                sx={(theme) => ({
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '20px',
                })}
              >
                <Button type="submit" loading={isLoading} fullWidth variant="outline" color="teal">
                  Сохранить
                </Button>
                <Button onClick={() => { form.reset() }} variant="filled" color="red">
                  <IconTrash size={18} />
                </Button>
              </Box>
              <Text mt={10} align="justify" size="sm" color="dimmed">
                * для изменения аватарки и обложки, нажмите на соответствующую картинку
              </Text>
            </form>
          </Box>
        </InfoCard>
      </UserFragmentLayout >
    </>
  )
}

export default UserAccount;