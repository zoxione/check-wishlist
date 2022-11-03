import { Box, Button, Center, Grid, Loader, useMantineTheme } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react'
import { AddGift, DeleteGift, useGifts } from '../../api/Gift';
import { IGift, IUser } from '../../types';
import GiftCard from '../ui/GiftCard';
import { IconCheck, IconX, IconTextPlus } from '@tabler/icons';

import InfoCard from '../ui/InfoCard';
import UserFragmentLayout from './UserFragmentLayout';
import { timeout } from '../../pages/dev';

const AddGiftModal = dynamic(() => import('../logics/AddGiftModal'), {
  ssr: false,
});

interface IProps {
  user: IUser;
};


const UserWishlist: FunctionComponent<IProps> = ((props: IProps) => {
  const theme = useMantineTheme();
  const router = useRouter();

  const [openedAddGiftModal, setOpenedAddGiftModal] = useState(false);

  const { gifts, isLoading, mutate, isError } = useGifts(props.user?.id || '');
  const giftsList: IGift[] = gifts?.filter((gift) => !gift.isGifted)

  const addGiftClient = async (gift: IGift) => {
    const newData = giftsList.concat(gift);

    await mutate(newData, false);

    try {
      await AddGift(gift);


      showNotification({
        title: 'Успешно',
        message: 'Подарок успешно добавлен',
        color: 'teal',
        icon: <IconCheck stroke={1.5} size={24} />,
      });
    }
    catch (error) {
      console.error(error);
      showNotification({
        title: 'Ошибка',
        message: 'Не удалось добавить подарок',
        color: 'red',
        icon: <IconX stroke={1.5} size={24} />,
      });
    }
  }

  const deleteGiftClient = async (id: string) => {
    const newData = giftsList.filter((gift) => gift.id !== id);

    await mutate(newData, false);

    try {
      await DeleteGift(id);

      showNotification({
        title: 'Успешно',
        message: 'Подарок успешно удален',
        color: 'teal',
        icon: <IconCheck stroke={1.5} size={24} />,
      });
    }
    catch (error) {
      console.error(error);
      showNotification({
        title: 'Ошибка',
        message: 'Не удалось удалить подарок',
        color: 'red',
        icon: <IconX stroke={1.5} size={24} />,
      });
    }
  }


  return (
    <UserFragmentLayout>
      <InfoCard title="Список желаний">
        <Box>
          <AddGiftModal opened={openedAddGiftModal} setOpened={setOpenedAddGiftModal} />
          <Button onClick={() => setOpenedAddGiftModal(true)} leftIcon={<IconTextPlus size={18} />} variant="gradient">
            Добавить
          </Button>

          {
            isLoading ?
              (
                <Center>
                  <Loader variant="dots" />
                </Center>
              )
              : (
                <Grid mt={10}>
                  {giftsList?.map((gift, index) => (
                    <Grid.Col xs={6} sm={6} md={4} key={index}>
                      <GiftCard
                        gift={gift}
                        isLoaded={true}
                        isOwner={true}
                        canEdit={true}
                      />
                    </Grid.Col>
                  ))}
                </Grid>
              )
          }
        </Box>
      </InfoCard>
    </UserFragmentLayout>
  )
}
);

export default UserWishlist;