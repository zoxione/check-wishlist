import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Router from "next/router";
import { useSession } from 'next-auth/react';
import { Box, Button, Container, Title, Text, Image, Grid, Anchor } from '@mantine/core';



import { IconChevronsDown } from '@tabler/icons';


import Search from '../components/ui/Search'
import AppHead from '../components/logics/Head';
import Link from 'next/link';


interface Props {

}


const Home: NextPage<Props> = (props) => {
  const { status, data } = useSession();
  console.log(status, data)

  return (
    <>
      <AppHead />

      <Container
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 60px)',
          marginTop: '-80px',
        })}
      >
        <Title mb={50} order={1} align="center">Найди список желаемых подарков друга</Title>
        <Search />
      </Container>

      <Box>
        <Link href="#how-it-works" scroll={false}>
          <Anchor
            variant='text'
            sx={(theme) => ({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              '&:hover': {
                color: theme.fn.primaryColor(),
              },
            })}
          >
            Подробнее
            <IconChevronsDown size={20} />
          </Anchor>
        </Link>

        <Box id="how-it-works" />

        <Container
          sx={(theme) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '60px',
            marginTop: '80px',
            marginBottom: '80px',
          })}
        >
          <Title mb={10} order={1}>Как это работает?</Title>

          <Box
            sx={(theme) => ({
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '40px',
              [theme.fn.smallerThan('sm')]: {
                flexDirection: 'column',
              },
            })}
          >
            <Box
              sx={(theme) => ({
                width: '50%',
                [theme.fn.smallerThan('sm')]: {
                  width: '100%',
                },
              })}
            >
              <Text
                sx={(theme) => ({
                  color: theme.fn.primaryColor(),
                  fontWeight: 700,
                  fontSize: 20,
                })}
              >
                Шаг 1
              </Text>
              <Title order={3} mb={10}>
                Добавьте подарки в свой список желаний
              </Title>
              <Text>
                Создайте список пожеланий, ориентированный на конфиденциальность, с продуктами наших брендов-партнеров или любого другого магазина. Поделитесь своим списком со своими подписчиками, добавив его в свою биографию и рассказав своим поклонникам о своем списке желаний.
              </Text>
            </Box>
            <Box
              sx={(theme) => ({
                width: '50%',
                [theme.fn.smallerThan('sm')]: {
                  width: '100%',
                },
              })}
            >
              <Image
                radius="md"
                src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                alt="Random unsplash image"
              />
            </Box>
          </Box>

          <Box
            sx={(theme) => ({
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '40px',
              [theme.fn.smallerThan('sm')]: {
                flexDirection: 'column',
                flexFlow: 'column-reverse',
              },
            })}
          >
            <Box
              sx={(theme) => ({
                width: '50%',
                [theme.fn.smallerThan('sm')]: {
                  width: '100%',
                },
              })}
            >
              <Image
                radius="md"
                src="https://firebasestorage.googleapis.com/v0/b/onlywish-9d17b.appspot.com/o/common%2Flanding%2Fcheckout.svg?alt=media&token=e135cc0c-f32a-4838-887a-bef39102efd4"
                alt="Random unsplash image"
              />
            </Box>
            <Box
              sx={(theme) => ({
                width: '50%',
                [theme.fn.smallerThan('sm')]: {
                  width: '100%',
                },
              })}
            >
              <Text
                sx={(theme) => ({
                  color: theme.fn.primaryColor(),
                  fontWeight: 700,
                  fontSize: 20,
                })}
              >
                Шаг 2
              </Text>
              <Title order={3} mb={10}>
                Ваши поклонники покупают подарки
              </Title>
              <Text>
                Поделившись ссылкой на «Трон» со своими поклонниками, они смогут посетить ваш список желаний и купить подарки. Поклонники могут оставить сообщение и свое имя во время оформления заказа. Благодаря нашей интеграции вы можете показывать подарки в прямом эфире или автоматически отправлять твиты о новых подарках.
              </Text>
            </Box>
          </Box>


          <Box
            sx={(theme) => ({
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '40px',
              [theme.fn.smallerThan('sm')]: {
                flexDirection: 'column',
              },
            })}
          >
            <Box
              sx={(theme) => ({
                width: '50%',
                [theme.fn.smallerThan('sm')]: {
                  width: '100%',
                },
              })}
            >
              <Text
                sx={(theme) => ({
                  color: theme.fn.primaryColor(),
                  fontWeight: 700,
                  fontSize: 20,
                })}
              >
                Шаг 3
              </Text>
              <Title order={3} mb={10}>
                Мы покупаем подарки и доставляем их
              </Title>
              <Text>
                Затем Throne отправляет подарки, купленные фанатами, прямо на ваш адрес. Процесс заказа в Throne полностью отделен от покупки подарка вашим поклонником, чтобы обеспечить 100% конфиденциальность.
              </Text>
            </Box>
            <Box
              sx={(theme) => ({
                width: '50%',
                [theme.fn.smallerThan('sm')]: {
                  width: '100%',
                },
              })}
            >
              <Image
                radius="md"
                src="https://firebasestorage.googleapis.com/v0/b/onlywish-9d17b.appspot.com/o/common%2Flanding%2Fnewlanding%2FGroup%201%20(1).png?alt=media&token=c49f0538-2258-4fd2-9a64-97f588b2ab77"
                alt="Random unsplash image"
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default Home;