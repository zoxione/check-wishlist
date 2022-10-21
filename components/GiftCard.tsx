import { IconEye, IconMessageCircle } from '@tabler/icons';
import { Card, Text, Group, Center, createStyles, Button, Modal, Box, Input, NumberInput } from '@mantine/core';
import { FunctionComponent, useState } from 'react';
import { Image } from '@mantine/core';
import { IGift } from '../types';


// interface IProps {
//   title: string;
//   image: string;
//   price: number;
//   isGifted: boolean;
//   gifter: string | undefined;
// }


const GiftCard: FunctionComponent<IGift> = ({ title, image, price, isGifted, gifter }: IGift) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Card withBorder p="lg" radius="md">
      <Card.Section mb="sm">
        <Image src={image} alt={title} height={180} />
      </Card.Section>

      <Text mt="xs">
        {title}
      </Text>

      <Text weight={600} >
        $ {price}
      </Text>

      <Button variant="light" fullWidth mt="md" radius="md" onClick={() => setOpenModal(true)}>
        Подарить
      </Button>

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
            Подарить
          </Button>
        </Box>
      </Modal>
    </Card>
  );
}

export default GiftCard;