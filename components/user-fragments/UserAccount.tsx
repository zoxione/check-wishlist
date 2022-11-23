import { Box, Button, Center, Container, Text, Textarea, TextInput, useMantineTheme } from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { joiResolver, useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconReload, IconX } from '@tabler/icons';
import Joi from 'joi';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';

import { storageClient } from '../../api';
import { UpdateUser } from '../../api/User';
import { IUser } from '../../types';
import InfoCard from '../ui/InfoCard';
import UserFragmentLayout from './UserFragmentLayout';
import { userSchema } from '../logics/ValidationForm';

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
      about: props.user?.about,
      tiktokName: props.user?.tiktokName,
      twitterName: props.user?.twitterName,
      vkName: props.user?.vkName,
      telegramName: props.user?.telegramName,
      instagramName: props.user?.instagramName,
    },

    validate: joiResolver(
      Joi.object({
        username: userSchema.username,
        about: userSchema.about,
        tiktokName: userSchema.tiktokName,
        twitterName: userSchema.twitterName,
        vkName: userSchema.vkName,
        telegramName: userSchema.telegramName,
        instagramName: userSchema.instagramName,
      })
    ),
  });

  const handleSubmit = async () => {
    setIsLoading(true);

    let user: IUser = props.user;
    user.username = form.values.username;
    user.about = form.values.about;
    user.tiktokName = form.values.tiktokName;
    user.twitterName = form.values.twitterName;
    user.vkName = form.values.vkName;
    user.telegramName = form.values.telegramName;
    user.instagramName = form.values.instagramName;

    try {
      let timestamp = new Date().getTime()

      if (avatars.length > 0) {
        const { data, error } = await storageClient.from('check').upload(`/users/avatars/${user.username}_${timestamp}`, avatars[0], { cacheControl: '3600', upsert: true });

        if (error) {
          throw new Error('Ошибка загрузки аватара');
        }

        user.imageUrl = `https://cserfwfqoxxsyqezqezy.supabase.co/storage/v1/object/public/check/users/avatars/${user.username}_${timestamp}`;
      }

      if (backgrounds.length > 0) {
        const { data, error } = await storageClient.from('check').upload(`/users/backgrounds/${user.username}_${timestamp}`, backgrounds[0], { cacheControl: '3600', upsert: true });

        if (error) {
          throw new Error('Ошибка загрузки обложки');
        }

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
            objectPosition="center"
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
                  <IconReload size={18} />
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