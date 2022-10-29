import { FunctionComponent } from "react";

import { z } from 'zod';
import InputMask from "react-input-mask";

import { Box, Button, Modal, NumberInput, Textarea, TextInput, Text, Select, Group, Grid, Checkbox, Input } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconCurrencyRubel, IconX, IconCheck } from '@tabler/icons';
import { showNotification } from "@mantine/notifications";
import { IGift, ITransaction } from "../../types";
import { useSession } from "next-auth/react";
import Router from "next/router";



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

    validate: zodResolver(
      z.object({
        numberCard: z.string().regex(/^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/, { message: 'Номер карты должен быть в формате 0000 0000 0000 0000' }),
        dateCard: z.string().regex(/^[0-9]{2}\/[0-9]{2}$/, { message: 'Дата должна быть в формате 00/00' }),
        cvvCard: z.string().regex(/^[0-9]{3}$/, { message: 'CVV должен быть в формате 000' }),
        description: z.string().max(120, { message: 'Описание должно быть меньше 120 символов' }),
      })
    ),
  });

  const handleSubmit = async () => {
    const transaction: ITransaction = {
      giftId: props.gift?.id ? props.gift.id : '',
      userId: props.gift?.userId ? props.gift.userId : '',
      gifterId: session?.user?.id ? session.user.id : '',
    }
    console.log(JSON.stringify(transaction));

    try {
      await fetch(`http://localhost:8080/gift_give`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transaction),
      }).then((res) => {
        if (res.ok) {
          showNotification({
            title: 'Успешно',
            message: 'Подарок успешно отправлен',
            color: 'teal',
            icon: <IconCheck stroke={1.5} size={24} />,
          });
          props.setOpened(false);
          Router.reload();
        }
        else {
          console.log(res);
          showNotification({
            title: 'Ошибка',
            message: 'Не удалось отправить подарок',
            color: 'red',
            icon: <IconX stroke={1.5} size={24} />,
          });
        }
      });
    }
    catch (error) {
      console.error(error);
      showNotification({
        title: 'Ошибка',
        message: 'Не удалось отправить подарок',
        color: 'red',
        icon: <IconX stroke={1.5} size={24} />,
      });
    }
  }


  return (
    <Modal
      opened={props.opened}
      onClose={() => props.setOpened(false)}
      title="Подарить подарок"
      centered
      overlayOpacity={0.55}
      overlayBlur={3}
      overflow="inside"
      closeOnClickOutside={false}
    >
      <Box
        sx={(theme) => ({
          maxWidth: '350px',
          margin: '0 auto',
        })}
      >
        <form onSubmit={form.onSubmit(() => handleSubmit())}>
          <Input.Wrapper label="Номер карты" required>
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
            <Input.Wrapper label="Срок действия" required>
              <Input
                component={InputMask}
                mask="99/99"
                size="md"
                required
                placeholder="MM/YY"
                {...form.getInputProps('dateCard')}
              />
            </Input.Wrapper>
            <Input.Wrapper label="Код безопасности" required>
              <Input
                component={InputMask}
                mask="999"
                size="md"
                required
                placeholder="XXX"
                {...form.getInputProps('cvvCard')}
              />
            </Input.Wrapper>
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
    </Modal>
  )
}

export default GiveGiftModal;
