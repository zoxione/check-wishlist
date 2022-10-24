import { Box, Button, Container, Divider, Group, Text } from '@mantine/core';
import { FunctionComponent } from 'react'

import InfoCard from '../ui/InfoCard';
import UserFragmentLayout from './UserFragmentLayout';


interface IProps {

};


const UserSettings: FunctionComponent<IProps> = ({ }) => {


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
          <Box
            sx={(theme) => ({
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '15px',
              [theme.fn.largerThan('xs')]: {
                flexDirection: 'row',
                alignItems: 'flex-start',
              },
            })}
          >
            <Text>Выйти из аккаунта</Text>
            <Button variant="outline" color="red">Очистить желаемые подарки</Button>
          </Box>
          <Divider my="sm" />
          <Box
            sx={(theme) => ({
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '15px',
              [theme.fn.largerThan('xs')]: {
                flexDirection: 'row',
                alignItems: 'flex-start',
              },
            })}
          >
            <Text>Выйти из аккаунта</Text>
            <Button variant="outline" color="red">Очистить подаренные подарки</Button>
          </Box>
          <Divider my="sm" />
          <Box
            sx={(theme) => ({
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '15px',
              [theme.fn.largerThan('xs')]: {
                flexDirection: 'row',
                alignItems: 'flex-start',
              },
            })}
          >
            <Text>Выйти из аккаунта</Text>
            <Button variant="outline" color="red">Удалить аккаунт</Button>
          </Box>
        </Box>
      </InfoCard>
    </UserFragmentLayout>
  )
}

export default UserSettings;