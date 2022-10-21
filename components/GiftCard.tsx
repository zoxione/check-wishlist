import { IconEye, IconMessageCircle } from '@tabler/icons';
import { Card, Text, Group, Center, createStyles } from '@mantine/core';
import { FunctionComponent } from 'react';
import { Image } from '@mantine/core';
import { IGift } from '../types';


// interface IProps {
//   title: string;
//   image: string;
//   price: number;
//   isGifted: boolean;
//   gifter: string | undefined;
// }


const GiftCard: FunctionComponent<IGift> = ({ title, image, price, isGifted, gifter }: IGift) => {


  return (
    <Card withBorder p="lg" radius="md">
      <Card.Section mb="sm">
        <Image src={image} alt={title} height={180} />
      </Card.Section>

      <Text mt="xs">
        {title}
      </Text>

      <Text weight={600} >
        $ {price}
      </Text>
    </Card>
  );
}

export default GiftCard;