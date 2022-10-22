import { Container } from '@mantine/core';
import { FunctionComponent } from 'react'

import InfoCard from '../InfoCard';
import UserFragmentLayout from './UserFragmentLayout';


interface IProps {

};


const UserDashboard: FunctionComponent<IProps> = ({ }) => {


  return (
    <UserFragmentLayout>
      <InfoCard title="Приборная панель">

      </InfoCard>
    </UserFragmentLayout>
  )
}

export default UserDashboard;