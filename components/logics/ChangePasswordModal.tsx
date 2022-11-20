import { Box, Button, Modal, PasswordInput, Text } from '@mantine/core';
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

const ChangePasswordModal: FunctionComponent<IProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      password: props.user.password,
      passwordConfirm: props.user.password,
    },

    validate: joiResolver(
      Joi.object({
        password: Joi.string().regex(/^[A-Za-z0-9]+$/).min(6).max(19).messages({
          'string.pattern.base': 'Пароль должен состоять только из латинских букв и цифр',
          'string.base': 'Пароль должен быть строкой',
          'string.empty': 'Пароль не может быть пустым',
          'string.min': 'Пароль должен быть больше 5 символов',
          'string.max': 'Пароль должен быть меньше 20 символов',
        }),
        passwordConfirm: Joi.string().valid(Joi.ref('password')).messages({
          'string.base': 'Пароль должен быть строкой',
          'string.empty': 'Пароль не может быть пустым',
          'any.only': 'Пароли должны совпадать',
        }),
      })
    ),
  });

  const handleSubmit = async () => {
    setIsLoading(true);

    const user: IUser = props.user;
    user.password = form.values.password;

    try {
      await UpdateUser(user);

      showNotification({
        title: 'Успешно',
        message: 'Пароль успешно изменен',
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
        message: 'Не удалось изменить пароль',
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
          Изменить пароль
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
          <PasswordInput
            label="Новый пароль"
            size="md"
            {...form.getInputProps('password')}
          />
          <PasswordInput
            label="Подтвердите пароль"
            mt={10}
            size="md"
            {...form.getInputProps('passwordConfirm')}
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


export default ChangePasswordModal;