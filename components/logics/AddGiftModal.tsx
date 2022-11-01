import { FunctionComponent } from "react";

import { Box, Button, Modal, NumberInput, Textarea, TextInput, Text, Select, Group, Grid, Checkbox, NativeSelect } from "@mantine/core";
import { useForm, joiResolver } from "@mantine/form";
import { IconCurrencyRubel, IconX, IconCheck } from '@tabler/icons';
import { showNotification } from "@mantine/notifications";
import { IGift } from "../../types";
import { useSession } from "next-auth/react";
import Router from "next/router";

import Joi from 'joi';



interface IProps {
  onAddGift: (gift: IGift) => void;
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

    validate: joiResolver(
      Joi.object({
        title: Joi.string().min(3).max(29).messages({
          'string.base': 'Название должно быть строкой',
          'string.empty': 'Название не может быть пустым',
          'string.min': 'Название должно быть больше 2 символов',
          'string.max': 'Название должно быть меньше 30 символов',
        }),
        description: Joi.string().max(79).allow('').messages({
          'string.base': 'Описание должно быть строкой',
          'string.max': 'Описание должно быть меньше 80 символов',
        }),
        shopName: Joi.allow(''),
        shopUrl: Joi.string().uri().messages({
          'string.base': 'Ссылка должна быть строкой',
          'string.empty': 'Ссылка не может быть пустой',
          'string.uri': 'Ссылка должна быть валидной',
        }),
        price: Joi.number().positive().messages({
          'number.base': 'Цена должна быть числом',
          'number.empty': 'Цена не может быть пустой',
          'number.positive': 'Цена должна быть больше 0',
        }),
        imageUrl: Joi.string().uri().allow('').messages({
          'string.base': 'Ссылка должна быть строкой',
          'string.uri': 'Ссылка должна быть валидной',
        }),
      })
    ),
  });

  const handleSubmit = async () => {
    switch (form.values.shopName) {
      case 'dns':
        let regex = /https:\/\/www\.dns-shop\.ru\/product\/[A-Za-z0-9]+\/([A-Za-z0-9]+(-[A-Za-z0-9]+)+)\//i
        let match = form.values.shopUrl.match(regex);

        if (match) {
          // парсим сайт
        }
        else {
          showNotification({
            title: 'Ошибка',
            message: 'Ссылка должна быть на товар DNS',
            color: 'red',
            icon: <IconX stroke={1.5} size={24} />,
          });
          return;
        }
        break;
      case 'regard':
        break;
      default:
        break;
    }

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

    props.onAddGift(gift);
    props.setOpened(false);
    // Router.reload();

    // try {
    //   AddGift(gift);

    //   showNotification({
    //     title: 'Успешно',
    //     message: 'Подарок успешно добавлен',
    //     color: 'teal',
    //     icon: <IconCheck stroke={1.5} size={24} />,
    //   });


    // }
    // catch (error) {
    //   console.error(error);
    //   showNotification({
    //     title: 'Ошибка',
    //     message: 'Не удалось добавить подарок',
    //     color: 'red',
    //     icon: <IconX stroke={1.5} size={24} />,
    //   });
    // }
  }


  return (
    <Modal
      opened={props.opened}
      onClose={() => props.setOpened(false)}
      title={
        <Text size="xl" weight={500}>
          Добавить подарок
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

          <TextInput
            label="Ссылка на изображение"
            size="md"
            mt={10}
            placeholder="https://c.dns-shop.ru/thumb/st1/fit/500/500/5effd2afc06f810b4424b43eb595da53/dc5dd08ef0adb5bef02bd822042966ceab39738b2abd77eda73ec029cec8be44.jpg"
            {...form.getInputProps('imageUrl')}
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
