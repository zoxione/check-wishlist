import { Box, Button, Image, Modal, Text, Textarea, Tooltip } from "@mantine/core";
import { joiResolver, useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from '@tabler/icons';
import Joi from 'joi';
import { useSession } from "next-auth/react";
import { FunctionComponent, useState } from "react";

import { UpdateGift } from "../../api/Gift";
import { IGift } from "../../types";


interface IProps {
  gift: IGift,
  opened: boolean;
  setOpened: (opened: boolean) => void;
};


const UpdateGiftModal: FunctionComponent<IProps> = (props) => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      title: '',
      description: props.gift?.description,
      shopName: '',
      shopUrl: '',
      price: 0,
      imageUrl: '',
    },

    validate: joiResolver(
      Joi.object({
        title: Joi.string().min(3).max(29).allow('').messages({
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
        shopUrl: Joi.string().uri().allow('').messages({
          'string.base': 'Ссылка должна быть строкой',
          'string.empty': 'Ссылка не может быть пустой',
          'string.uri': 'Ссылка должна быть валидной',
        }),
        price: Joi.number().positive().allow('').messages({
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
    setIsLoading(true);

    try {
      let gift: IGift = props.gift;
      gift.title = form.values.title;
      gift.description = form.values.description;
      gift.shopName = form.values.shopName;
      gift.shopUrl = form.values.shopUrl;
      gift.price = form.values.price;
      gift.imageUrl = form.values.imageUrl;

      await UpdateGift(gift);

      showNotification({
        title: 'Успешно',
        message: 'Подарок успешно обновлен',
        color: 'teal',
        icon: <IconCheck stroke={1.5} size={24} />,
      });

      form.reset();
      props.setOpened(false);
    }
    catch (error) {
      console.error(error);
      showNotification({
        title: 'Ошибка',
        message: 'Не удалось обновить подарок',
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
          Изменить подарок
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
          {/* <TextInput
            label="Название"
            size="md"
            required
            placeholder="Наушники"
            {...form.getInputProps('title')}
          /> */}
          <Textarea
            label="Описание"
            size="md"
            mt={10}
            placeholder="Мне это очень нужно, спасибо за подарок"
            {...form.getInputProps('description')}
          />

          {/* <TextInput
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
          /> */}

          <Button type="submit" loading={isLoading} mt={20} fullWidth variant="outline">
            Изменить
          </Button>
        </form>
      </Box>
    </Modal>
  )
}

export default UpdateGiftModal;
