import Link from 'next/link';
import React, { FunctionComponent, useState } from 'react'
import { NextPage } from 'next';
import { createStyles, Notification, Container, Group, ActionIcon, Footer, Box, Text, Button, PasswordInput, Input, Modal, NumberInput, Grid, Avatar } from '@mantine/core';
import { IconBrandTwitter, IconCode, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons';
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
import { useSession } from 'next-auth/react';

interface IProps {
  avatar: string;
  name: string;
  email: string;
  job: string;
  password: string;
};


var dataGift: IGift[] = [
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
  {
    title: 'Кофе',
    image: 'https://images.unsplash.com/photo-1611181928379-8b8b8b2b9b1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    price: 100,
    isGifted: false,
    gifter: undefined,
  },
]

const UserSettings: FunctionComponent<IProps> = (props: IProps) => {
  const { status, data } = useSession();

  const [name, setName] = useState(data?.user?.name || '');
  const [email, setEmail] = useState(data?.user?.email || '');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      // const body = { name, email, password, image };
      // await fetch(`/api/user/${props.user?.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(body),
      // }).then((res) => {
      //   if (res.status === 200) {
      //     setShowNotification('success');
      //   }
      //   else {
      //     setShowNotification('error');
      //     console.log(res);
      //   }
      // });
    }
    catch (error) {
      setShowNotification('error');
      console.error(error);
    }
  };

  // Notification component, states: false, success, error
  const [showNotification, setShowNotification] = useState('false');
  const CustomNotification = () => {
    switch (showNotification) {
      case 'success':
        return (
          <Notification
            icon={<IconCheck size={18} />}
            color="teal"
            title="Successfully"
            className="absolute top-0 right-0 m-4 z-[1000]"
            onClick={() => setShowNotification('false')}
          >
            User updated
          </Notification>
        )
      case 'error':
        return (
          <Notification
            icon={<IconX size={18} />}
            color="red"
            title="Error"
            className="absolute top-0 right-0 m-4 z-[1000]"
            onClick={() => setShowNotification('false')}
          >
            An error occurred
          </Notification>
        )
      default:
        return (
          <></>
        )
    }
  }


  const [openModal, setOpenModal] = useState(false);
  const [price, setPrice] = useState(0);

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

      <Container
        sx={(theme) => ({
          marginTop: '30px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        })}
      >
        <InfoCard title="Основная информация">
          <form onSubmit={handleSubmit}>
            <Box
              sx={(theme) => ({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
              })}
            >
              <Avatar
                src={props.avatar ? props.avatar : ""}
                color="violet"
                sx={(theme) => ({
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                })}
              />
              <Input.Wrapper label="Ваш никнейм"
                sx={(theme) => ({
                  width: '100%',
                  [theme.fn.largerThan('xs')]: {
                    width: '320px',
                  },
                })}
              >
                <Input
                  value={name}
                  onChange={(e: any) => setName(e.currentTarget.value)}
                />
              </Input.Wrapper>
              <Input.Wrapper label="Почта"
                sx={(theme) => ({
                  width: '100%',
                  [theme.fn.largerThan('xs')]: {
                    width: '320px',
                  },
                })}
              >
                <Input
                  value={email}
                  onChange={(e: any) => setEmail(e.currentTarget.value)}
                />
              </Input.Wrapper>
              <PasswordInput
                sx={(theme) => ({
                  width: '100%',
                  [theme.fn.largerThan('xs')]: {
                    width: '320px',
                  },
                })}
                label="Пароль"
                value={password}
                onChange={(e: any) => setPassword(e.currentTarget.value)}
              />
              <Box
                sx={(theme) => ({
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '20px',
                  width: '100%',
                  [theme.fn.largerThan('xs')]: {
                    width: '320px',
                  },
                })}
              >
                <Button
                  type="submit"
                  variant="outline"
                  color="teal"
                  sx={(theme) => ({
                    width: '100%',
                  })}
                >
                  Сохранить
                </Button>
                <Button
                  type="submit"
                  variant="filled"
                  color="red"
                >
                  <IconTrash size={18} />
                </Button>
              </Box>
            </Box>
          </form>
        </InfoCard>


        <InfoCard title="Подарки">
          <Box>
            <Modal
              opened={openModal}
              onClose={() => setOpenModal(false)}
              title="Добавить подарок"
              centered
              overlayOpacity={0.55}
              overlayBlur={3}
              overflow="inside"
            >
              <Box
                sx={(theme) => ({
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '20px',
                })}
              >
                <Input.Wrapper label="Название">
                  <Input />
                </Input.Wrapper>
                <Input.Wrapper label="Ссылка на подарок">
                  <Input />
                </Input.Wrapper>
                <Input.Wrapper label="Описание">
                  <Input />
                </Input.Wrapper>
                <NumberInput
                  label="Price"
                  hideControls
                  value={price}
                  parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                  formatter={(value) =>
                    !Number.isNaN(parseFloat(value ? value : '0'))
                      ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      : '$ '
                  }
                />
                <Button
                  type="submit"
                  variant="filled"
                  color="teal"
                >
                  Добавить
                </Button>
              </Box>
            </Modal>
            <Button onClick={() => setOpenModal(true)}>Добавить желаемый подарок</Button>

            <Grid mt={10}>
              {dataGift.map((gift, index) => (
                <Grid.Col xs={6} sm={6} md={4} key={index}>
                  <GiftCard
                    title={'Choppie Stickies'}
                    image={'https://firebasestorage.googleapis.com/v0/b/onlywish-9d17b.appspot.com/o/items%2F590bf649-f3ee-41e6-a6ef-e76fba225b48?alt=media&token=4fad8c05-54b3-465f-8022-dff06acecd01'}
                    price={9.43}
                    isGifted={false}
                    gifter={undefined}
                  />
                </Grid.Col>
              ))}
            </Grid>

          </Box>
        </InfoCard>

      </Container>
    </>
  )
}

export default UserSettings;