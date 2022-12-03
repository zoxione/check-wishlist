import { Anchor, Box, Checkbox, RingProgress, Skeleton, Text } from '@mantine/core';
import { IconArrowNarrowRight } from '@tabler/icons';
import Link from 'next/link';
import Router from "next/router";
import { FunctionComponent } from 'react';
import { Carousel } from '@mantine/carousel';

import { GetGiftsUser } from '../../services/Gift';
import { CompleteTransaction, useTransactions, useTransactionsFromUserId } from '../../services/Transaction';
import { IGift, IUser } from '../../../types';
import InfoCard from '../ui/InfoCard';
import MinimalCard from '../ui/MinimalCard';
import UserFragmentLayout from './UserFragmentLayout';
import TransactionCard from '../ui/TransactionCard';


interface IProps {
  user: IUser;
};


const UserDashboard: FunctionComponent<IProps> = (props) => {
  const { transactions: transactionsUser, isLoading: isLoadingTransactionsUser } = useTransactionsFromUserId(props.user?.id ? props.user.id : '');
  const { transactions, isLoading: isLoadingTransactions } = useTransactions();

  const { gifts, isLoading: isLoadingGifts, mutate } = GetGiftsUser(props.user?.id || '');
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
                  <TransactionCard
                    key={index}
                    index={index}
                    tran={tran}
                    isAdmin={false}
                  />
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
                      <TransactionCard
                        key={index}
                        index={index}
                        tran={tran}
                        isAdmin={true}
                      />
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
