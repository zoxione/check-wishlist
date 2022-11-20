import { Box, Button, Modal, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from '@tabler/icons';
import { FunctionComponent, useState } from "react";

import { DeleteGift } from "../../api/Gift";
import { IGift } from "../../types";


interface IProps {
  gift: IGift,
  opened: boolean;
  setOpened: (opened: boolean) => void;
};


const DeleteGiftModal: FunctionComponent<IProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      await DeleteGift(props.gift.id ? props.gift.id : '');

      showNotification({
        title: 'Успешно',
        message: 'Подарок удален',
        color: 'teal',
        icon: <IconCheck stroke={1.5} size={24} />,
      });

      props.setOpened(false);
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

    setIsLoading(false);
  }


  return (
    <Modal
      opened={props.opened}
      onClose={() => props.setOpened(false)}
      title={
        <Text size="xl" weight={500}>
          Удалить подарок?
        </Text>
      }
      centered
      overlayOpacity={0.55}
      overlayBlur={3}
      overflow="inside"
      closeOnClickOutside={true}
    >
      <Box
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'end',
          gap: '15px',
          marginTop: "20px",
        })}
      >
        <Button onClick={() => props.setOpened(false)} variant="default">
          Отмена
        </Button>
        <Button onClick={() => handleSubmit()} loading={isLoading} variant="filled" color="red">
          Да, удалить
        </Button>
      </Box>
    </Modal>
  )
}

export default DeleteGiftModal;
