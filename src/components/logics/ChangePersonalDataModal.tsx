import { Box, Button, Modal, Text, TextInput } from '@mantine/core';
import { joiResolver, useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons';
import Joi from 'joi';
import { FunctionComponent, useState } from 'react';

import { UpdateUser } from '../../services/User';
import { IUser } from '../../../types';
import { userSchema } from '../../lib/joi';

interface IProps {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  user: IUser;
};

const ChangePersonalDataModal: FunctionComponent<IProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      fullname: props.user?.fullname,
      address: props.user?.address,
    },

    validate: joiResolver(
      Joi.object({
        fullname: userSchema.fullname,
        address: userSchema.address,
      })
    ),
  });

  const handleSubmit = async () => {
    setIsLoading(true);

    const user: IUser = props.user;
    user.fullname = form.values.fullname;
    user.address = form.values.address;

    try {
      await UpdateUser(user);

      showNotification({
        title: 'Успешно',
        message: 'Личные данные успешно изменены',
        color: 'teal',
        icon: <IconCheck stroke={1.5} size={24} />,
      });

      props.setOpened(false);
    }
    catch (error) {
      console.error(error);
      showNotification({
        title: 'Ошибка',
        message: 'Не удалось изменить личные данные',
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
          Изменить личные данные
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
          maxWidth: '350px',
          margin: '0 auto',
        })}
      >
        <form onSubmit={form.onSubmit(() => handleSubmit())}>
          <TextInput
            label="ФИО"
            size="md"
            {...form.getInputProps('fullname')}
          />
          <TextInput
            label="Адрес доставки"
            mt={10}
            size="md"
            {...form.getInputProps('address')}
          />
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
            <Button type="submit" loading={isLoading} variant="filled" color="red">
              Изменить
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}


export default ChangePersonalDataModal;