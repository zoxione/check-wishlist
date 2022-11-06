import { Box, Button, Divider, PasswordInput, Text } from '@mantine/core';
import { FunctionComponent, useState } from 'react'

import InfoCard from '../ui/InfoCard';
import UserFragmentLayout from './UserFragmentLayout';
import SettingsSection from '../ui/SettingsSection';
import { openConfirmModal } from '@mantine/modals';
import { DeleteUser, UpdateUser } from '../../api/User';
import { signOut, useSession } from 'next-auth/react';
import { IUser } from '../../types';
import { showNotification } from '@mantine/notifications';
import router from 'next/router';
import { IconCheck, IconX, IconTrash } from '@tabler/icons';
import { DeleteGiftedGifts, DeleteWishlistGifts } from '../../api/Gift';
import Router from 'next/router';

import ChangePasswordModal from '../logics/ChangePasswordModal';
import ChangePersonalDataModal from '../logics/ChangePersonalDataModal';
import ChangeEmailModal from '../logics/ChangeEmailModal';


interface IProps {
  user: IUser
};


const UserSettings: FunctionComponent<IProps> = (props) => {
  const { data: session, status } = useSession();
  const [openedChangePasswordModal, setOpenedChangePasswordModal] = useState(false);
  const [openedChangePersonalDataModal, setOpenedChangePersonalDataModal] = useState(false);
  const [openedChangeEmailModal, setOpenedChangeEmailModal] = useState(false);

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
        try {
          await DeleteUser(session?.user?.id ? session.user.id : '')
          showNotification({
            title: 'Успешно',
            message: 'Аккаунт успешно удален',
            color: 'teal',
            icon: <IconCheck stroke={1.5} size={24} />,
          });

          signOut();
          Router.push('/');
        }
        catch (error) {
          console.error(error);
          showNotification({
            title: 'Ошибка',
            message: 'Не удалось удалить аккаунт',
            color: 'red',
            icon: <IconX stroke={1.5} size={24} />,
          });
        }
      }
    });


  const clearWishlistModal = () =>
    openConfirmModal({
      title: (
        <Text size="xl" weight={500}>
          Очистить список желаний
        </Text>
      ),
      centered: true,
      children: (
        <Text>
          Вы уверены, что хотите очистить список желаний?
        </Text>
      ),
      labels: { confirm: 'Очистить', cancel: 'Отмена' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        try {
          await DeleteWishlistGifts(session?.user?.id ? session.user.id : '')
          showNotification({
            title: 'Успешно',
            message: 'Список желаний успешно очищен',
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


  const clearGiftedModal = () =>
    openConfirmModal({
      title: (
        <Text size="xl" weight={500}>
          Очистить список подаренных подарков
        </Text>
      ),
      centered: true,
      children: (
        <Text>
          Вы уверены, что хотите очистить список подаренных подарков?
        </Text>
      ),
      labels: { confirm: 'Очистить', cancel: 'Отмена' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        try {
          await DeleteGiftedGifts(session?.user?.id ? session.user.id : '')
          showNotification({
            title: 'Успешно',
            message: 'Список подаренных подарков успешно очищен',
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


  return (
    <UserFragmentLayout>
      <InfoCard title="Аккаунт">
        <Box
          sx={(theme) => ({
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
          })}
        >
          <SettingsSection title="Изменить личные данные">
            <Text>Изменить фамилию, имя, отчество и адрес</Text>
            <ChangePersonalDataModal user={props.user} opened={openedChangePersonalDataModal} setOpened={setOpenedChangePersonalDataModal} />
            <Button variant="gradient" onClick={() => setOpenedChangePersonalDataModal(true)}>
              Изменить
            </Button>
          </SettingsSection>

          <Divider my="xs" />
          <SettingsSection title="Изменить пароль">
            <Text>Изменить пароль для входа в аккаунт</Text>
            <ChangePasswordModal user={props.user} opened={openedChangePasswordModal} setOpened={setOpenedChangePasswordModal} />
            <Button variant="gradient" onClick={() => setOpenedChangePasswordModal(true)}>
              Изменить
            </Button>
          </SettingsSection>

          <Divider my="xs" />
          <SettingsSection title="Изменить почту">
            <Text>Изменить электронную почту для входа в аккаунт</Text>
            <ChangeEmailModal user={props.user} opened={openedChangeEmailModal} setOpened={setOpenedChangeEmailModal} />
            <Button variant="gradient" onClick={() => setOpenedChangeEmailModal(true)}>
              Изменить
            </Button>
          </SettingsSection>

          <Divider my="xs" />
          <SettingsSection title="Удалить аккаунт">
            <Text>Удалить аккаунт и все данные (восстановить невозможно)</Text>
            <Button variant="outline" color="red" onClick={deleteAccountModal}>
              Удалить
            </Button>
          </SettingsSection>
        </Box>
      </InfoCard >

      <InfoCard title="Настройки">
        <Box
          sx={(theme) => ({
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          })}
        >
          <SettingsSection title="Очистить список желаний">
            <Text>Удалить все товары из списка желаний. Это действие необратимо.</Text>
            <Button variant="outline" color="red" onClick={clearWishlistModal}>
              Очистить
            </Button>
          </SettingsSection>

          <Divider my="xs" />
          <SettingsSection title="Очистить список подаренных подарков">
            <Text>Удалить все товары из списка подаренных подарков. Это действие необратимо.</Text>
            <Button variant="outline" color="red" onClick={clearGiftedModal}>
              Очистить
            </Button>
          </SettingsSection>
        </Box>
      </InfoCard>
    </UserFragmentLayout >
  )
}

export default UserSettings;