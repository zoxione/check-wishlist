import { IconEye, IconTrash, IconX, IconCheck } from '@tabler/icons';
import { Card, Text, Group, Center, createStyles, Button, Modal, Box, Input, NumberInput, Skeleton } from '@mantine/core';
import { FunctionComponent, useEffect, useState } from 'react';
import { Image } from '@mantine/core';

import { showNotification } from '@mantine/notifications';
import { IGift } from '../../types';
import Router from 'next/router';
import dynamic from 'next/dynamic';


const GiveGiftModal = dynamic(() => import('../logics/GiveGiftModal'), {
  ssr: false,
});


interface IProps {
  gift: IGift,
  gifts?: IGift[],
  onDeleteGift?: (id: string) => void,
  isLoaded: boolean,
  isOwner: boolean;
  canEdit: boolean;
}


const GiftCard: FunctionComponent<IProps> = (props) => {
  const [openedGiveGiftModal, setOpenedGiveGiftModal] = useState(false);

  const handleDeleteGift = () => {
    if (props.onDeleteGift) {
      props.onDeleteGift(props.gift.id ? props.gift.id : '');
    }
  }

  if (props.isLoaded === false) {
    return (
      <>
        <Card withBorder p="lg" radius="md">
          <Card.Section mb="sm">
            <Skeleton height={250} radius={0} />
          </Card.Section>
          <Box
            sx={(theme) => ({
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            })}
          >
            <Skeleton height={30} />
            <Skeleton height={60} />
            <Skeleton height={20} width="120px" />
          </Box>
        </Card>
      </>
    )
  }

  // // Router.events.on('routeChangeStart', () => setLoading(true));
  // // Router.events.on('routeChangeComplete', () => setLoading(false));

  // useEffect(() => {
  //   setLoading(props.isLoading);
  // }, [props.isLoading]);

  // const deleteGift = async () => {
  //   try {
  //     // DeleteGift(props.gift);

  //     showNotification({
  //       title: 'Успешно',
  //       message: 'Подарок удален',
  //       color: 'teal',
  //       icon: <IconCheck stroke={1.5} size={24} />,
  //     });

  //     // Router.reload();
  //   }
  //   catch (error) {
  //     console.error(error);
  //     showNotification({
  //       title: 'Ошибка',
  //       message: 'Не удалось удалить подарок',
  //       color: 'red',
  //       icon: <IconX stroke={1.5} size={24} />,
  //     });
  //   }
  // }


  return (
    <Card withBorder p="lg" radius="md"
      sx={(theme) => ({

        '&:hover': {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        },
      })}
    >
      <Card.Section mb="sm">
        <Image src={props.gift?.imageUrl} alt={props.gift?.title} height={250} fit="fill" withPlaceholder />
        {
          props.isOwner && props.canEdit &&
          <Button
            variant="filled"
            color="red"
            onClick={() => { handleDeleteGift() }}
            style={{ position: 'absolute', top: 0, right: 0, borderRadius: '0 0 0 10px' }}
          >
            <IconTrash size={20} />
          </Button>
        }
      </Card.Section>

      <Text mt="xs">
        {props.gift?.title}
      </Text>

      <Text weight={300} >
        {props.gift?.description}
      </Text>

      <Text weight={600} >
        {props.gift?.price} ₽
      </Text>

      {
        !props.isOwner && !props.gift?.isGifted &&
        <>
          <GiveGiftModal gift={props.gift} opened={openedGiveGiftModal} setOpened={setOpenedGiveGiftModal} />
          <Button variant="light" fullWidth mt="md" radius="md" onClick={() => setOpenedGiveGiftModal(true)}>
            Подарить
          </Button>
        </>
      }
    </Card>
  );

}

export default GiftCard;