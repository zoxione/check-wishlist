import { FunctionComponent } from "react";

import { z } from 'zod';
import InputMask from "react-input-mask";

import { Box, Button, Modal, NumberInput, Textarea, TextInput, Text, Select, Group, Grid, Checkbox, Input } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconCurrencyRubel, IconX, IconCheck } from '@tabler/icons';
import { showNotification } from "@mantine/notifications";



interface IProps {
  opened: boolean;
  setOpened: (opened: boolean) => void;
};

const GiveGiftModal: FunctionComponent<IProps> = ({ opened, setOpened }) => {
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
        description: z.string().max(256, { message: 'Описание должно быть меньше 256 символов' }),
      })
    ),
  });

  const handleSubmit = async () => {
    console.log(form.values)

    showNotification({
      title: 'Подарок отправлен',
      message: 'Подарок успешно отправлен',
      color: 'teal',
      icon: <IconCheck stroke={1.5} size={24} />,
    });

    // const res = await signIn('credentials', {
    //   email: form.values.email,
    //   password: form.values.password,
    //   redirect: false,
    //   callbackUrl: "/"
    // });
    // console.log(res);

    // if (res?.ok == false) {
    //   showNotification({
    //     id: 'login-failed',
    //     disallowClose: true,
    //     autoClose: 2000,
    //     title: "Не удалось войти",
    //     message: 'Неверный логин или пароль',
    //     color: 'red',
    //     icon: <IconX />,
    //     loading: false,
    //   });
    // }
    // else {
    //   Router.push("/");
    // }
  }


  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
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
