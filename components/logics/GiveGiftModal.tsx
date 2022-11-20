import { Box, Button, Image, Input, Modal, Text, Textarea, Tooltip } from "@mantine/core";
import { joiResolver, useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from '@tabler/icons';
import Joi from 'joi';
import { useSession } from "next-auth/react";
import { FunctionComponent, useState } from "react";
import InputMask from "react-input-mask";

import { GiveGift } from "../../api/Gift";
import { IGift, ITransaction } from "../../types";


interface IProps {
  gift: IGift,
  opened: boolean;
  setOpened: (opened: boolean) => void;
};


const GiveGiftModal: FunctionComponent<IProps> = (props) => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

    if (status === 'authenticated') {
      const transaction: ITransaction = {
        giftId: props.gift?.id ? props.gift.id : '',
        userId: props.gift?.userId ? props.gift.userId : '',
        gifterId: session?.user?.id ? session.user.id : '',
      }

      try {
        await GiveGift(transaction);

        showNotification({
          title: 'Успешно',
          message: 'Подарок успешно отправлен',
          color: 'teal',
          icon: <IconCheck stroke={1.5} size={24} />,
        });

        props.setOpened(false);
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
    else {
      showNotification({
        title: 'Ошибка',
        message: 'Необходимо авторизоваться',
        color: 'red',
        icon: <IconX stroke={1.5} size={24} />,
      });
    }

    setIsLoading(false);
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
            flexDirection: 'column',
            gap: '20px',
          })}
        >
          <Image
            src={props.gift?.imageUrl}
            alt={props.gift?.title}
            fit="contain"
            withPlaceholder
            height={200}
            px={20}
          />
          <Box>
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
            <Text weight={600}>
              {props.gift?.price} ₽
            </Text>
          </Box>
        </Box>

        <form onSubmit={form.onSubmit(() => handleSubmit())}>
          <Input.Wrapper label="Детали карты" size="md" mt={10} required>
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

          <Button type="submit" loading={isLoading} mt={20} fullWidth variant="outline">
            Подарить
          </Button>
        </form>
      </Box>
    </Modal>
  )
}

export default GiveGiftModal;
