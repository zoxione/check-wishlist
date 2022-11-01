import { Box, Button, Container, Divider, Group, PasswordInput, Text } from '@mantine/core';
import { FunctionComponent } from 'react'
import Joi from 'joi';
import { useForm, zodResolver, joiResolver } from '@mantine/form';
import InfoCard from '../ui/InfoCard';
import UserFragmentLayout from './UserFragmentLayout';
import SettingsSection from '../ui/SettingsSection';
import { openConfirmModal } from '@mantine/modals';
import { DeleteUser, UpdateUser } from '../../api/User';
import { signOut, useSession } from 'next-auth/react';
import { IUser } from '../../types';
import { showNotification } from '@mantine/notifications';
import router from 'next/router';
import {
  IconCheck,
  IconX,
  IconTrash
} from '@tabler/icons';
import { DeleteGiftedGifts } from '../../api/Gift';
import Router from 'next/router';


interface IProps {
  user: IUser
};


const UserSettings: FunctionComponent<IProps> = (props) => {
  const { data: session, status } = useSession();

  const changePasswordForm = useForm({
    initialValues: {
      password: props.user?.password,
      passwordConfirm: props.user?.password,
    },

    validate: joiResolver(
      Joi.object({
        password: Joi.string().min(6).max(19).messages({
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

  const handleChangePasswordSubmit = async () => {
    const user: IUser = props.user;
    user.password = changePasswordForm.values.password;

    try {
      await UpdateUser(user);

      showNotification({
        title: 'Успешно',
        message: 'Пароль успешно изменен',
        color: 'teal',
        icon: <IconCheck stroke={1.5} size={24} />,
      });

      router.replace(router.asPath);
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
  }

  const changePasswordModal = () =>
    openConfirmModal({
      title: (
        <Text size="xl" weight={500}>
          Изменить пароль
        </Text>
      ),
      centered: true,
      children: (
        <Box>
          <Text>
            Введите новый пароль и подтвердите его в поле ниже. Пароль должен быть не менее 6 символов.
          </Text>
          <form onSubmit={changePasswordForm.onSubmit(() => handleChangePasswordSubmit())}>
            <PasswordInput
              mt={10}
              {...changePasswordForm.getInputProps('password')}
            />
          </form>
        </Box>
      ),
      labels: { confirm: 'Изменить пароль', cancel: 'Отмена' },
      confirmProps: { color: 'red' },
      onConfirm: async () => await DeleteUser(session?.user?.id ? session.user.id : ''),
    });

  const clearGiftedModal = () =>
    openConfirmModal({
      title: (
        <Text size="xl" weight={500}>
          Очистить список
        </Text>
      ),
      centered: true,
      children: (
        <Text>
          Вы уверены, что хотите очистить список подарков?
        </Text>
      ),
      labels: { confirm: 'Очистить', cancel: 'Отмена' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        try {
          await DeleteGiftedGifts(session?.user?.id ? session.user.id : '')
          showNotification({
            title: 'Успешно',
            message: 'Список подарков успешно очищен',
            color: 'teal',
            icon: <IconCheck stroke={1.5} size={24} />,
          });
        }
        catch (error) {
          console.error(error);
          showNotification({
            title: 'Ошибка',
            message: 'Не удалось очистить список',
            color: 'red',
            icon: <IconX stroke={1.5} size={24} />,
          });
        }
      }
    });

  // const clearWishlistModal = () =>
  //   openConfirmModal({
  //     title: (
  //       <Text size="xl" weight={500}>
  //         Очистить список
  //       </Text>
  //     ),
  //     centered: true,
  //     children: (
  //       <Text>
  //         Вы уверены, что хотите очистить список желаний?
  //       </Text>
  //     ),
  //     labels: { confirm: 'Очистить', cancel: 'Отмена' },
  //     confirmProps: { color: 'red' },
  //     onConfirm: async () => {
  //       try {
  //         await DeleteWishlistGifts(session?.user?.id ? session.user.id : '')
  //         showNotification({
  //           title: 'Успешно',
  //           message: 'Список желаний успешно очищен',
  //           color: 'teal',
  //           icon: <IconCheck stroke={1.5} size={24} />,
  //         });
  //       }
  //       catch (error) {
  //         console.error(error);
  //         showNotification({
  //           title: 'Ошибка',
  //           message: 'Не удалось очистить список',
  //           color: 'red',
  //           icon: <IconX stroke={1.5} size={24} />,
  //         });
  //       }
  //     }
  //   });

  const deleteAccountModal = () =>
    openConfirmModal({
      title: (
        <Text size="xl" weight={500}>
          Удалить аккаунт
        </Text>
      ),
      centered: true,
      children: (
        <Text>
          Вы уверены, что хотите удалить свой профиль? Это действие является разрушительным,
          и вам придется обратиться в службу поддержки, чтобы восстановить ваши данные.
        </Text>
      ),
      labels: { confirm: 'Удалить аккаунт', cancel: "Нет, не удаляй" },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        await DeleteUser(session?.user?.id ? session.user.id : '')

        signOut();

        Router.push('/');
      }
    });

  return (
    <UserFragmentLayout>
      <InfoCard title="Настройки">
        <Box
          sx={(theme) => ({
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            marginTop: '50px',
          })}
        >

          {/* <SettingsSection
            desc="Очистить список подаренных подарков"
            btnText="Очистить"
            onClick={clearGiftedModal}
          />
          <Divider my="sm" /> */}

          {/* <SettingsSection
            desc="Очистить список желаемых подарков"
            btnText="Очистить"
            onClick={clearWishlistModal}
          />
          <Divider my="sm" /> */}

          {/* <SettingsSection
            desc="Изменить пароль для входа в аккаунт"
            btnText="Изменить пароль"
            onClick={changePasswordModal}
          />
          <Divider my="sm" /> */}


          <SettingsSection
            desc="Удалить аккаунт и все данные о нем с сервера (восстановить невозможно)"
            btnText="Удалить аккаунт"
            onClick={deleteAccountModal}
          />
        </Box>
      </InfoCard>
    </UserFragmentLayout>
  )
}

export default UserSettings;