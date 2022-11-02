import { FunctionComponent } from 'react'

import InfoCard from '../ui/InfoCard';
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