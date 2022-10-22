import { Container } from '@mantine/core';
import { FunctionComponent } from 'react'

import InfoCard from '../InfoCard';
import UserFragmentLayout from './UserFragmentLayout';


interface IProps {

};


const UserAnalytics: FunctionComponent<IProps> = ({ }) => {


  return (
    <UserFragmentLayout>
      <InfoCard title="Аналитика">

      </InfoCard>
    </UserFragmentLayout>
  )
}

export default UserAnalytics;