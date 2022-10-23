import Link from 'next/link';
import React, { FunctionComponent, useState } from 'react'
import { NextPage } from 'next';
import { createStyles, Notification, Container, Group, ActionIcon, Footer, Box, Text, Button, PasswordInput, Input, Modal, NumberInput, Grid, Avatar, TextInput, useMantineTheme, Center } from '@mantine/core';
import { IconTextPlus, IconCode, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons';
import InfoCard from '../InfoCard';

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
import { IGift } from '../../types';
import GiftCard from '../GiftCard';
import UserFragmentLayout from './UserFragmentLayout';


import { useSession } from 'next-auth/react';
import { useForm } from '@mantine/form';
import AddGiftModal from '../logics/AddGiftModal';




var dataGift: IGift[] = [
  {
    title: 'Кофе',
    description: 'Кофе вкусный',
    image: 'https://images.unsplash.com/photo-1611181928379-8b8b8b2b9b1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    price: 100,
    isGifted: false,
    gifter: undefined,
  },
  {
    title: 'Кофе',
    image: 'https://images.unsplash.com/photo-1611181928379-8b8b8b2b9b1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    price: 100,
    isGifted: false,
    gifter: undefined,
  },
  {
    title: 'Кофе',
    image: 'https://images.unsplash.com/photo-1611181928379-8b8b8b2b9b1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    price: 100,
    isGifted: false,
    gifter: undefined,
  },
  {
    title: 'Кофе',
    image: 'https://images.unsplash.com/photo-1611181928379-8b8b8b2b9b1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    price: 100,
    isGifted: false,
    gifter: undefined,
  },
]


interface IProps {
  avatar: string;
  name: string;
  email: string;
  job: string;
  password: string;
};


const UserAccount: FunctionComponent<IProps> = (props: IProps) => {
  const { status, data } = useSession();
  const theme = useMantineTheme();

  // Модалка
  const [openedAddGiftModal, setOpenedAddGiftModal] = useState(false);

  const form = useForm({
    initialValues: {
      name: data?.user?.name,
      password: data?.user?.email,
    },

    // validate: {
    //   name: (value: string | any[]) => (value.length > 2 ? null : 'Я не знаю, что это такое'),
    //   password: (value: string | any[]) => (value.length > 5 ? null : 'Пароль должен быть больше 5 символов'),
    // },
  });

  const handleSubmit = async () => {
    confirm('Вы уверены, что хотите изменить данные?');

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
    <>
      <Container
        sx={(theme) => ({
          height: '210px',
          maxWidth: '100vw',
          padding: '0',
          margin: '0',
          backgroundSize: 'cover',
          backgroundColor: theme.fn.primaryColor(),
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
                  src={props.avatar ? props.avatar : ""}
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
                {...form.getInputProps('name')}
              />
              <PasswordInput
                label="Пароль"
                mt={10}
                size="md"
                {...form.getInputProps('password')}
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
              {dataGift.map((gift, index) => (
                <Grid.Col xs={6} sm={6} md={4} key={index}>
                  <GiftCard
                    title={'Choppie Stickies'}
                    image={'https://firebasestorage.googleapis.com/v0/b/onlywish-9d17b.appspot.com/o/items%2F590bf649-f3ee-41e6-a6ef-e76fba225b48?alt=media&token=4fad8c05-54b3-465f-8022-dff06acecd01'}
                    description={'Chopdas ChopdasChopdasCho dsada d sa dadas da sdas pdas sd d'}
                    price={9.43}
                    isGifted={false}
                    gifter={undefined}
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