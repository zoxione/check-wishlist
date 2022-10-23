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
      card: '',
      description: '',
    },

    validate: zodResolver(
      z.object({
        card: z.string().regex(/^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/, { message: 'Номер карты должен быть в формате 0000 0000 0000 0000' }),
        description: z.string().max(256, { message: 'Описание должно быть меньше 256 символов' }),
      })
    ),
  });

  const handleSubmit = async () => {
    console.log(form.values)

    showNotification({
      id: 'give-gift-success',
      disallowClose: true,
      autoClose: 2000,
      title: "Подарок отправлен",
      message: "Подарок успешно отправлен получателю",
      color: 'green',
      icon: <IconCheck />,
      loading: false,
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
              {...form.getInputProps('card')}
            />
          </Input.Wrapper>
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
