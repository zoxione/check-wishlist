import { FunctionComponent } from "react";

import { z } from 'zod';

import { Box, Button, Modal, NumberInput, Textarea, TextInput, Text, Select, Group, Grid, Checkbox, NativeSelect } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconCurrencyRubel, IconX, IconCheck } from '@tabler/icons';
import { showNotification } from "@mantine/notifications";
import { IGift } from "../../types";
import { useSession } from "next-auth/react";
import Router from "next/router";



interface IProps {
  opened: boolean;
  setOpened: (opened: boolean) => void;
};

const AddGiftModal: FunctionComponent<IProps> = (props) => {
  const { data: session, status } = useSession();

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      shopName: 'dns',
      shopUrl: '',
      price: 0,
      imageUrl: '',
    },

    validate: zodResolver(
      z.object({
        title: z.string().min(2, { message: 'Название должно быть больше 2 символов' }).max(64, { message: 'Название должно быть меньше 64 символов' }),
        description: z.string().max(120, { message: 'Описание должно быть меньше 120 символов' }),
        shopUrl: z.string().url({ message: 'Ссылка должна быть валидной' }),
        price: z.number().positive({ message: 'Цена должна быть больше 0' }),
        // imageUrl: z.string().url({ message: 'Ссылка должна быть валидной' }),
      })
    ),
  });

  const handleSubmit = async () => {
    const gift: IGift = {
      title: form.values.title,
      description: form.values.description,
      shopName: form.values.shopName,
      shopUrl: form.values.shopUrl,
      price: form.values.price,
      imageUrl: form.values.imageUrl,
      userId: session?.user?.id ? session.user.id : '',
    }
    console.log(JSON.stringify(gift));

    try {
      await fetch(`http://localhost:8080/gift`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(gift),
      }).then((res) => {
        if (res.ok) {
          showNotification({
            title: 'Успешно',
            message: 'Подарок успешно добавлен',
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
            message: 'Не удалось добавить подарок',
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
        message: 'Не удалось добавить подарок',
        color: 'red',
        icon: <IconX stroke={1.5} size={24} />,
      });
    }
  }


  return (
    <Modal
      opened={props.opened}
      onClose={() => props.setOpened(false)}
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
            {...form.getInputProps('title')}
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
            {...form.getInputProps('shopUrl')}
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
                {...form.getInputProps('shopName')}
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

          <Button type="submit" onClick={() => { console.log('d') }} mt={20} fullWidth variant="outline">
            Добавить
          </Button>
        </form>
      </Box>
    </Modal>
  )
}

export default AddGiftModal;
