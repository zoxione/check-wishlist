import { Container } from '@mantine/core';
import { FunctionComponent } from 'react'

import InfoCard from '../InfoCard';
import UserFragmentLayout from './UserFragmentLayout';


interface IProps {

};


const UserSettings: FunctionComponent<IProps> = ({ }) => {


  return (
    <UserFragmentLayout>
      <InfoCard title="Настройки">

      </InfoCard>
    </UserFragmentLayout>
  )
}

export default UserSettings;