import Link from 'next/link';
import React, { FunctionComponent, useState } from 'react'
import { NextPage } from 'next';
import { createStyles, Notification, Container, Group, ActionIcon, Footer, Box, Text, Button, PasswordInput, Input } from '@mantine/core';
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

interface IProps {
  avatar: string;
  name: string;
  email: string;
  job: string;
  password: string;
};

const UserSettings: FunctionComponent<IProps> = (props: IProps) => {
  const [name, setName] = useState(props.name ? props.name : "");
  const [email, setEmail] = useState(props.email ? props.email : "");
  const [password, setPassword] = useState(props.password ? props.password : "");

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
              {/* <Avatar
              src={image}
              color="violet"
              classNames={{
                root: "w-[140px] h-[140px] rounded-full hover:brightness-50 cursor-pointer"
              }}
            /> */}
              <Input.Wrapper label="Your name"
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
              <Input.Wrapper label="Email"
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
                label="Password"
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
                  Save
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

          </Box>
        </InfoCard>

      </Container>
    </>
  )
}

export default UserSettings;