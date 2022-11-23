import { Anchor, Box, Checkbox, RingProgress, Skeleton, Text } from '@mantine/core';
import { IconArrowNarrowRight } from '@tabler/icons';
import Link from 'next/link';
import Router from "next/router";
import { FunctionComponent } from 'react';
import { Carousel } from '@mantine/carousel';

import { useGifts } from '../../api/Gift';
import { CompleteTransaction, useTransactions, useTransactionsFromUserId } from '../../api/Transaction';
import { IGift, IUser } from '../../types';
import InfoCard from '../ui/InfoCard';
import MinimalCard from '../ui/MinimalCard';
import UserFragmentLayout from './UserFragmentLayout';


interface IProps {
  user: IUser;
};


const UserDashboard: FunctionComponent<IProps> = (props) => {
  const { transactions: transactionsUser, isLoading: isLoadingTransactionsUser } = useTransactionsFromUserId(props.user?.id ? props.user.id : '');
  const { transactions, isLoading: isLoadingTransactions } = useTransactions();

  const { gifts, isLoading: isLoadingGifts, mutate } = useGifts(props.user?.id || '');
  const wishlist: IGift[] = gifts?.filter((gift) => !gift.isGifted)
  const gifted: IGift[] = gifts?.filter((gift) => gift.isGifted)
  let gifters: any[] = [];
  transactionsUser?.forEach((tran) => {
    if (!gifters.find((g) => g.id === tran.Gifter.id)) {
      gifters.push(tran.Gifter);
    }
  })

  return (
    <>
      <UserFragmentLayout>
        <InfoCard title="Приборная панель">
          {
            isLoadingTransactionsUser || isLoadingGifts ? (
              <>
                <Skeleton height={200} radius="md" />
                <Skeleton height={150} width={150} mt={25} mb={25} mx="auto" radius={999} />
              </>
            ) : (
              <>
                <Box
                  sx={(theme) => ({

                  })}
                >
                  <Carousel
                    slideSize="50%"
                    height={220}
                    slideGap="md"
                    loop
                    withControls={false}
                    sx={(theme) => ({
                      '.mantine-Carousel-container': {
                        alignItems: 'center',
                      },
                    })}
                  >
                    <Carousel.Slide>
                      <MinimalCard title="Количество подарков">
                        {wishlist?.length + gifted?.length}
                      </MinimalCard>
                    </Carousel.Slide>
                    <Carousel.Slide>
                      <MinimalCard title="Количество подаренных подарков">
                        {gifted?.length}
                      </MinimalCard>
                    </Carousel.Slide>
                    <Carousel.Slide>
                      <MinimalCard title="Число дарителей">
                        {gifters?.length}
                      </MinimalCard>
                    </Carousel.Slide>
                  </Carousel>
                </Box>

                <Box
                  sx={(theme) => ({
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  })}
                >
                  <RingProgress
                    size={170}
                    thickness={16}
                    label={
                      <Text align="center" size={30} weight={900}>
                        {gifted?.length + '/' + (wishlist?.length + gifted?.length)}
                      </Text>
                    }
                    sections={[
                      { value: gifted?.length / (wishlist?.length + gifted?.length === 0 ? 1 : wishlist?.length + gifted?.length) * 100, color: 'grape', tooltip: 'Подаренных' },
                    ]}
                  />
                </Box>
              </>
            )
          }

          {
            isLoadingTransactionsUser ? (
              <>
                <Skeleton height={120} mt={40} radius="md" />
                <Skeleton height={120} mt={15} radius="md" />
              </>
            ) : (
              <>
                {transactionsUser?.length > 0 && (
                  <Text size="lg" weight={700} mt={20} mb={10}>
                    Последние подарки
                  </Text>
                )}
                {transactionsUser?.map((tran, index) => (
                  <Box
                    sx={(theme) => ({
                      display: 'flex',
                      flexDirection: 'row',
                      [theme.fn.smallerThan('sm')]: {
                        flexDirection: 'column',
                      },
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      borderRadius: theme.radius.md,
                      border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
                      padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
                      paddingLeft: theme.spacing.xl - theme.spacing.md,
                      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
                      marginBottom: theme.spacing.sm,
                    })}
                    key={index}
                  >
                    <Box
                      sx={(theme) => ({
                        ...theme.fn.focusStyles(),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        height: '100%',
                        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
                        paddingLeft: theme.spacing.md,
                        paddingRight: theme.spacing.md,
                      })}
                    >
                      <Text
                        sx={(theme) => ({
                          fontSize: 30,
                          fontWeight: 700,
                          width: 60,
                          color: theme.colorScheme === 'dark' ? 'white' : 'black',
                        })}
                      >
                        {index + 1}
                      </Text>
                    </Box>
                    <Box
                      sx={(theme) => ({
                        [theme.fn.smallerThan('sm')]: {
                          textAlign: 'center',
                        },
                      })}
                    >
                      <Text weight={500}>{tran.Gift.title}</Text>
                      <Box
                        sx={(theme) => ({
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          marginTop: 5,
                          [theme.fn.smallerThan('sm')]: {
                            flexDirection: 'column',
                            gap: '0px',
                          },
                        })}
                      >
                        <Text size="sm">
                          Подарил: {' '}
                          <Link href={`/${tran.Gifter.username}`} passHref>
                            <Anchor>
                              {tran.Gifter.username}
                            </Anchor>
                          </Link>
                        </Text>
                      </Box>
                      <Text color="dimmed" size="sm">
                        Дата и время: {new Date(tran.createdAt).toLocaleDateString() + ' ' + new Date(tran.createdAt).toLocaleTimeString()}
                      </Text>
                    </Box>
                  </Box>
                ))}
              </>
            )
          }
        </InfoCard>


        {
          props.user?.role === "admin" && (
            <InfoCard title="Админ панель">
              {
                isLoadingTransactions ? (
                  <>
                    <Skeleton height={120} mt={40} radius="md" />
                    <Skeleton height={120} mt={15} radius="md" />
                  </>
                ) : (
                  <>
                    {transactions?.map((tran, index) => (
                      <Box
                        sx={(theme) => ({
                          display: 'flex',
                          flexDirection: 'row',
                          [theme.fn.smallerThan('sm')]: {
                            flexDirection: 'column',
                          },
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          borderRadius: theme.radius.md,
                          border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
                          padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
                          paddingLeft: theme.spacing.xl - theme.spacing.md,
                          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
                          marginBottom: theme.spacing.sm,
                        })}
                        key={index}
                      >
                        <Box
                          sx={(theme) => ({
                            ...theme.fn.focusStyles(),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            height: '100%',
                            color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
                            paddingLeft: theme.spacing.md,
                            paddingRight: theme.spacing.md,
                          })}
                        >
                          <Text
                            sx={(theme) => ({
                              fontSize: 30,
                              fontWeight: 700,
                              width: 60,
                              color: theme.colorScheme === 'dark' ? 'white' : 'black',
                            })}
                          >
                            {index + 1}
                          </Text>
                        </Box>
                        <Box
                          sx={(theme) => ({
                            [theme.fn.smallerThan('sm')]: {
                              textAlign: 'center',
                            },
                          })}
                        >
                          <Text weight={500}>{tran.Gift.title}</Text>
                          <Box
                            sx={(theme) => ({
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              marginTop: 5,
                              [theme.fn.smallerThan('sm')]: {
                                flexDirection: 'column',
                                gap: '0px',
                              },
                            })}
                          >
                            <Link href={`/${tran.Gifter.username}`} passHref>
                              <Anchor size="sm">
                                {tran.Gifter.username}
                              </Anchor>
                            </Link>
                            <IconArrowNarrowRight size={20} />
                            <Link href={`/${tran.User.username}`} passHref>
                              <Anchor size="sm">
                                {tran.User.username}
                              </Anchor>
                            </Link>
                          </Box>
                          <Text color="dimmed" size="sm">
                            Дата и время: {new Date(tran.createdAt).toLocaleDateString() + ' ' + new Date(tran.createdAt).toLocaleTimeString()}
                          </Text>
                        </Box>
                        {
                          tran.isCompleted ? (
                            <Checkbox
                              defaultChecked={tran.isCompleted}
                              disabled
                              label="Выполнен"
                              ml="auto"
                            />
                          ) : (
                            <Checkbox
                              defaultChecked={tran.isCompleted}
                              label="Выполнен"
                              ml="auto"
                              sx={(theme) => ({
                                '.mantine-Checkbox-input': {
                                  cursor: 'pointer',
                                }
                              })}
                              onChange={(event) => {
                                CompleteTransaction(tran.id);
                                Router.reload()
                              }}
                            />
                          )
                        }
                      </Box>
                    ))}
                  </>
                )
              }
            </InfoCard>
          )
        }
      </UserFragmentLayout>
    </>
  )
}

export default UserDashboard;
