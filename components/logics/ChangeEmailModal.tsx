import { Box, Button, Modal, Text, TextInput } from '@mantine/core';
import { joiResolver, useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons';
import Joi from 'joi';
import { FunctionComponent, useState } from 'react';

import { UpdateUser } from '../../api/User';
import { IUser } from '../../types';

interface IProps {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  user: IUser;
};

const ChangeEmailModal: FunctionComponent<IProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: props.user?.email,
    },

    validate: joiResolver(
      Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).messages({
          'string.base': 'Email должен быть строкой',
          'string.empty': 'Email не может быть пустым',
          'string.email': 'Email должен быть валидным',
        }),
      })
    ),
  });

  const handleSubmit = async () => {
    setIsLoading(true);

    const user: IUser = props.user;
    user.email = form.values.email;

    try {
      await UpdateUser(user);

      showNotification({
        title: 'Успешно',
        message: 'Почта успешно изменена',
        color: 'teal',
        icon: <IconCheck stroke={1.5} size={24} />,
      });

      props.setOpened(false);
      // router.replace(router.asPath);
    }
    catch (error) {
      console.error(error);
      showNotification({
        title: 'Ошибка',
        message: 'Не удалось изменить почту',
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
          Изменить почту
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
            label="Почта"
            size="md"
            {...form.getInputProps('email')}
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


export default ChangeEmailModal;