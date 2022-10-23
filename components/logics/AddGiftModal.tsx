import { FunctionComponent } from "react";

import { z } from 'zod';

import { Box, Button, Modal, NumberInput, Textarea, TextInput, Text, Select, Group, Grid, Checkbox, NativeSelect } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconCurrencyRubel, IconX, IconCheck } from '@tabler/icons';
import { showNotification } from "@mantine/notifications";



interface IProps {
  opened: boolean;
  setOpened: (opened: boolean) => void;
};

const AddGiftModal: FunctionComponent<IProps> = ({ opened, setOpened }) => {
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      shop: 'dns',
      link: '',
      price: 0,
      isUrgent: false,
    },

    validate: zodResolver(
      z.object({
        name: z.string().min(2, { message: 'Имя должно быть больше 2 символов' }),
        description: z.string().max(256, { message: 'Описание должно быть меньше 256 символов' }),
        link: z.string().url({ message: 'Ссылка должна быть валидной' }),
        price: z.number().positive({ message: 'Цена должна быть больше 0' }),
      })
    ),
  });

  const handleSubmit = async () => {
    console.log(form.values)

    showNotification({
      id: 'add-gift-success',
      disallowClose: true,
      autoClose: 2000,
      title: "Подарок добавлен",
      message: "Подарок успешно добавлен в список подарков",
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
      title="Добавить подарок"
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
          <TextInput
            label="Название"
            size="md"
            required
            placeholder="Наушники"
            {...form.getInputProps('name')}
          />
          <Textarea
            label="Описание"
            size="md"
            mt={10}
            placeholder="Мне это очень нужно, спасибо за подарок"
            {...form.getInputProps('description')}
          />

          <TextInput
            label="Ссылка"
            size="md"
            mt={10}
            required
            placeholder="https://www.dns-shop.ru/product/96be2d41015ac823/radiocastotnaa-garnitura-razer-barracuda-x-cernyj/"
            {...form.getInputProps('link')}
            rightSection={
              <NativeSelect
                styles={{
                  input: {
                    fontWeight: 500,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                  },
                }}
                size="md"
                required
                data={[
                  { value: 'dns', label: 'ДНС' },
                  { value: 'regard', label: 'Регард' },
                ]}
                {...form.getInputProps('shop')}
              />
            }
            rightSectionWidth={92}
          />

          <NumberInput
            label="Цена, ₽"
            hideControls
            rightSection={<IconCurrencyRubel size={18} />}
            mt={10}
            required
            {...form.getInputProps('price')}
          />
          <Checkbox
            mt="md"
            label="Это срочно"
            {...form.getInputProps('isUrgent', { type: 'checkbox' })}
          />


          <Button type="submit" mt={20} fullWidth variant="outline">
            Добавить
          </Button>
        </form>
      </Box>
    </Modal>
  )
}

export default AddGiftModal;
