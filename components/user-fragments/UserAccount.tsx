import Link from 'next/link';
import React, { FunctionComponent, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next';
import { createStyles, Textarea, Notification, Container, Group, ActionIcon, Footer, Box, Text, Button, PasswordInput, Input, Modal, NumberInput, Grid, Avatar, TextInput, useMantineTheme, Center } from '@mantine/core';
import { IconTextPlus, IconCode, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons';
import InfoCard from '../ui/InfoCard';

import {
  TablerIcon,
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
  IconCheck,
  IconX,
  IconTrash
} from '@tabler/icons';
import { IGift, IUser } from '../../types';
import GiftCard from '../ui/GiftCard';
import UserFragmentLayout from './UserFragmentLayout';


import { useSession } from 'next-auth/react';
import { useForm, zodResolver } from '@mantine/form';
import AddGiftModal from '../logics/AddGiftModal';
import { z } from 'zod';
import { showNotification } from '@mantine/notifications';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import Router from 'next/router';


// export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
//   const session = await unstable_getServerSession(req, res, authOptions)

//   const response = await fetch(`http://localhost:8080/gift`)
//   if (!response.ok) {
//     Router.push('/')
//   }
//   const gifts: IGift[] = await response.json()

//   return {
//     props: { gifts },
//   };
// };


interface IProps {
  user: IUser;
  gifts: IGift[];
};


const UserAccount: FunctionComponent<IProps> = (props: IProps) => {
  const theme = useMantineTheme();

  // Модалка
  const [openedAddGiftModal, setOpenedAddGiftModal] = useState(false);

  const form = useForm({
    initialValues: {
      username: props.user?.username,
      fullname: props.user?.fullname,
      //email: props.user?.email,
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

    validate: zodResolver(
      z.object({
        username: z.string().min(3, { message: 'Имя должно быть больше 3 символов' }).max(14, { message: 'Имя должно быть меньше 14 символов' }),
        fullname: z.string().max(30, { message: 'ФИО должно быть меньше 30 символов' }),
        // email: z.string().email({message: 'Неверный формат почты'}),
        password: z.string().min(5, { message: 'Пароль должен быть больше 5 символов' }).max(20, { message: 'Пароль должен быть меньше 20 символов' }),
        about: z.string().max(80, { message: 'Описание должно быть меньше 80 символов' }),
        imageUrl: z.string().url({ message: 'Ссылка должна быть валидной' }),
        backgroundUrl: z.string().url({ message: 'Ссылка должна быть валидной' }),
        address: z.string().max(30, { message: 'Адрес должен быть меньше 30 символов' }),
        tiktokName: z.string().max(20, { message: 'Имя должно быть меньше 20 символов' }),
        twitterName: z.string().max(20, { message: 'Имя должно быть меньше 20 символов' }),
        vkName: z.string().max(20, { message: 'Имя должно быть меньше 20 символов' }),
        telegramName: z.string().max(20, { message: 'Имя должно быть меньше 20 символов' }),
        instagramName: z.string().max(20, { message: 'Имя должно быть меньше 20 символов' }),
      })
    ),
  });

  const handleSubmit = async () => {
    const user: IUser = {
      username: form.values.username,
      fullname: form.values.fullname,
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
      await fetch(`http://localhost:8080/user/${props.user?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
      }).then((res) => {
        if (res.ok) {
          showNotification({
            title: 'Успешно',
            message: 'Данные успешно обновлены',
            color: 'teal',
            icon: <IconCheck stroke={1.5} size={24} />,
          });
        }
        else {
          console.log(res);
          showNotification({
            title: 'Ошибка',
            message: 'Ошибка при обновлении данных',
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

        <InfoCard title="Список желаний">
          <Box>
            <AddGiftModal opened={openedAddGiftModal} setOpened={setOpenedAddGiftModal} />
            <Button
              onClick={() => setOpenedAddGiftModal(true)}
              leftIcon={<IconTextPlus size={18} />}
            >
              Добавить
            </Button>

            <Grid mt={10}>
              {props.gifts.map((gift, index) => (
                <Grid.Col xs={6} sm={6} md={4} key={index}>
                  <GiftCard
                    gift={gift}
                    isOwner={true}
                    canEdit={true}
                  />
                </Grid.Col>
              ))}
            </Grid>

          </Box>
        </InfoCard>

      </UserFragmentLayout >
    </>
  )
}

export default UserAccount;