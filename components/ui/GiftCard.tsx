import { IconEye, IconTrash, IconX, IconCheck } from '@tabler/icons';
import { Card, Text, Button, Box, Skeleton, Image, Tooltip } from '@mantine/core';
import { FunctionComponent, useState } from 'react';
import dynamic from 'next/dynamic';

import { IGift } from '../../types';
import UpdateGiftModal from '../logics/UpdateGiftModal';
import { openConfirmModal } from '@mantine/modals';
import { DeleteGift } from '../../api/Gift';
import { showNotification } from '@mantine/notifications';
import DeleteGiftModal from '../logics/DeleteGiftModal';
import Link from 'next/link';

const GiveGiftModal = dynamic(() => import('../logics/GiveGiftModal'), {
  ssr: false,
});


interface IProps {
  gift: IGift,
  gifts?: IGift[],
  isLoaded: boolean,
  isOwner: boolean;
  canEdit: boolean;
}


const GiftCard: FunctionComponent<IProps> = (props) => {
  const [openedGiveGiftModal, setOpenedGiveGiftModal] = useState(false);
  const [openedUpdateGiftModal, setOpenedUpdateGiftModal] = useState(false);
  const [openedDeleteGiftModal, setOpenedDeleteGiftModal] = useState(false);

  if (props.isLoaded === false) {
    return (
      <>
        <Card withBorder p="lg" radius="md">
          <Card.Section mb="sm">
            <Skeleton height={250} radius={0} />
          </Card.Section>
          <Box
            sx={(theme) => ({
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            })}
          >
            <Skeleton height={30} />
            <Skeleton height={60} />
            <Skeleton height={20} width="120px" />
          </Box>
        </Card>
      </>
    )
  }


  return (
    <Card p="lg" withBorder radius="md"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        cursor: 'pointer',
        height: '434px',
        maxWidth: '300px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px',
        },
      })}
    >
      <Card.Section mb={30}>
        <Image src={props.gift?.imageUrl} alt={props.gift?.title} height={260} fit="contain" p={10} withPlaceholder />
      </Card.Section>

      <Box
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: "100%"
        })}
      >
        <Tooltip label={props.gift?.title} multiline transition="slide-up" transitionDuration={200}>
          <Box
            sx={(theme) => ({
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            })}
          >
            <Text>
              {props.gift?.title}
            </Text>
          </Box>
        </Tooltip>

        <Tooltip label={props.gift?.description} multiline transition="slide-up" transitionDuration={200}>
          <Box
            sx={(theme) => ({
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            })}
          >
            <Text weight={300}>
              {props.gift?.description}
            </Text>
          </Box>
        </Tooltip>

        <Text weight={600}>
          {props.gift?.price} ₽
        </Text>

        {
          !props.canEdit && props.isOwner && !props.gift?.isGifted &&
          <>
            <Box
              mt={20}
              sx={(theme) => ({
                display: 'flex',
                justifyContent: 'space-between',
                gap: '10px',
              })}
            >
              <Link href={{ pathname: '/user', query: { activeFragment: 1 } }} passHref>
                <Button variant="light" radius="md" fullWidth>
                  Изменить
                </Button>
              </Link>
            </Box>
          </>
        }
        {
          props.canEdit && props.isOwner && !props.gift?.isGifted &&
          <>
            <Box
              mt={20}
              sx={(theme) => ({
                display: 'flex',
                justifyContent: 'space-between',
                gap: '10px',
              })}
            >
              <UpdateGiftModal gift={props.gift} opened={openedUpdateGiftModal} setOpened={setOpenedUpdateGiftModal} />
              <Button variant="light" radius="md" fullWidth onClick={() => setOpenedUpdateGiftModal(true)}>
                Изменить
              </Button>
              <DeleteGiftModal gift={props.gift} opened={openedDeleteGiftModal} setOpened={setOpenedDeleteGiftModal} />
              <Button variant="filled" color="red" onClick={() => { setOpenedDeleteGiftModal(true) }}>
                <IconTrash size={20} />
              </Button>
            </Box>
          </>
        }
        {
          !props.isOwner && !props.gift?.isGifted &&
          <>
            <GiveGiftModal gift={props.gift} opened={openedGiveGiftModal} setOpened={setOpenedGiveGiftModal} />
            <Button variant="outline" fullWidth radius="md" onClick={() => setOpenedGiveGiftModal(true)}>
              Подарить
            </Button>
          </>
        }
        {
          props.gift?.isGifted &&
          <>
            <Button variant="default" disabled fullWidth radius="md">
              Подарен
            </Button>
          </>
        }
      </Box>
    </Card>
  );

}

export default GiftCard;