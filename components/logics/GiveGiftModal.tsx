import { FunctionComponent } from "react";
import InputMask from "react-input-mask";
import { Box, Button, Modal, Textarea, Text, Image, Input } from "@mantine/core";
import { useForm, joiResolver } from "@mantine/form";
import { IconX, IconCheck } from '@tabler/icons';
import { showNotification } from "@mantine/notifications";
import { useSession } from "next-auth/react";
import Joi from 'joi';

import { IGift, ITransaction } from "../../types";
import { GiveGift } from "../../api/Gift";


interface IProps {
  gift: IGift,
  opened: boolean;
  setOpened: (opened: boolean) => void;
};


const GiveGiftModal: FunctionComponent<IProps> = (props) => {
  const { data: session, status } = useSession();

  const form = useForm({
    initialValues: {
      numberCard: '',
      dateCard: '',
      cvvCard: '',
      description: '',
    },

    validate: joiResolver(
      Joi.object({
        numberCard: Joi.string().regex(/^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/).messages({
          'string.base': 'Номер карты должен быть строкой',
          'string.empty': 'Номер карты не может быть пустым',
          'string.pattern.base': 'Номер карты должен быть в формате 0000 0000 0000 0000',
        }),
        dateCard: Joi.string().regex(/^[0-9]{2}\/[0-9]{2}$/).messages({
          'string.base': 'Срок действия карты должен быть строкой',
          'string.empty': 'Срок действия карты не может быть пустым',
          'string.pattern.base': 'Срок действия карты должен быть в формате 00/00',
        }),
        cvvCard: Joi.string().regex(/^[0-9]{3}$/).messages({
          'string.base': 'CVV карты должен быть строкой',
          'string.empty': 'CVV карты не может быть пустым',
          'string.pattern.base': 'CVV карты должен быть в формате 000',
        }),
        description: Joi.string().max(79).allow('').messages({
          'string.base': 'Описание должно быть строкой',
          'string.max': 'Описание должно быть меньше 80 символов',
        }),
      })
    ),
  });

  const handleSubmit = async () => {
    if (status === 'authenticated') {
      const transaction: ITransaction = {
        giftId: props.gift?.id ? props.gift.id : '',
        userId: props.gift?.userId ? props.gift.userId : '',
        gifterId: session?.user?.id ? session.user.id : '',
      }
      console.log(JSON.stringify(transaction));

      try {
        await GiveGift(transaction);

        showNotification({
          title: 'Успешно',
          message: 'Подарок успешно отправлен',
          color: 'teal',
          icon: <IconCheck stroke={1.5} size={24} />,
        });

        props.setOpened(false);
        // Router.reload();
      }
      catch (error) {
        console.error(error);
        showNotification({
          title: 'Ошибка',
          message: 'Не удалось добавить подарок',
          color: 'red',
          icon: <IconX stroke={1.5} size={24} />,
        });
      }
    }
  }


  return (
    <Modal
      opened={props.opened}
      onClose={() => props.setOpened(false)}
      title={
        <Text size="xl" weight={500}>
          Отправить подарок
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
        <Box
          sx={(theme) => ({
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            marginBottom: '20px'
          })}
        >
          <Box
            sx={(theme) => ({
              width: '50%'
            })}
          >
            <Image src={props.gift?.imageUrl} withPlaceholder />
          </Box>
          <Box
            sx={(theme) => ({
              width: '50%',
              textAlign: 'center'
            })}
          >
            <Text size="xl">
              {props.gift?.title}
            </Text>
            <Text size="md" weight={500}>
              {props.gift?.price} ₽
            </Text>
          </Box>
        </Box>


        <form onSubmit={form.onSubmit(() => handleSubmit())}>
          <Input.Wrapper label="Детали карты" required>
            <Input
              component={InputMask}
              mask="9999 9999 9999 9999"
              size="md"
              required
              placeholder="XXXX XXXX XXXX XXXX"
              {...form.getInputProps('numberCard')}
            />
          </Input.Wrapper>
          <Box
            sx={(theme) => ({
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '15px',
              marginTop: '10px',
            })}
          >
            <Input
              component={InputMask}
              mask="99/99"
              size="md"
              required
              placeholder="MM/YY"
              {...form.getInputProps('dateCard')}
            />
            <Input
              component={InputMask}
              mask="999"
              size="md"
              required
              placeholder="XXX"
              {...form.getInputProps('cvvCard')}
            />
          </Box>
          <Textarea
            label="Описание"
            size="md"
            mt={10}
            placeholder="Желаю тебе счастья и здоровья"
            {...form.getInputProps('description')}
          />

          <Button type="submit" mt={20} fullWidth variant="outline">
            Подарить
          </Button>
        </form>
      </Box>
    </Modal >
  )
}

export default GiveGiftModal;
