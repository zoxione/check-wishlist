import { IconEye, IconTrash, IconX, IconCheck } from '@tabler/icons';
import { Card, Text, Group, Center, createStyles, Button, Modal, Box, Input, NumberInput } from '@mantine/core';
import { FunctionComponent, useState } from 'react';
import { Image } from '@mantine/core';

import GiveGiftModal from './logics/GiveGiftModal';
import { showNotification } from '@mantine/notifications';


interface IProps {
  title: string;
  description: string | null;
  image: string | null;
  price: number;
  isGifted: boolean;
  gifter: string | null;
  isOwner: boolean;
}


const GiftCard: FunctionComponent<IProps> = (props) => {
  const [openedGiveGiftModal, setOpenedGiveGiftModal] = useState(false);

  const deleteGift = () => {
    console.log('delete');

    showNotification({
      id: 'delete-gift-success',
      disallowClose: true,
      autoClose: 2000,
      title: "Подарок удален",
      message: "Подарок успешно удален из списка",
      color: 'green',
      icon: <IconCheck />,
      loading: false,
    });
  }

  return (
    <Card withBorder p="lg" radius="md"
      sx={(theme) => ({

        '&:hover': {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        },
      })}
    >
      <Card.Section mb="sm">
        <Image src={props.image} alt={props.title} height={250} />
        {
          !props.isOwner &&
          <Button
            variant="filled"
            color="red"
            onClick={() => deleteGift()}
            style={{ position: 'absolute', top: 0, right: 0, borderRadius: '0 0 0 10px' }}
          >
            <IconTrash size={20} />
          </Button>
        }
      </Card.Section>

      <Text mt="xs">
        {props.title}
      </Text>

      <Text weight={300} >
        {props.description}
      </Text>

      <Text weight={600} >
        {props.price} ₽
      </Text>

      <GiveGiftModal opened={openedGiveGiftModal} setOpened={setOpenedGiveGiftModal} />
      <Button variant="light" fullWidth mt="md" radius="md" onClick={() => setOpenedGiveGiftModal(true)}>
        Подарить
      </Button>
    </Card>
  );
}

export default GiftCard;