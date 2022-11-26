import { Box, Button, Input, LoadingOverlay, Modal, Text, Textarea, TextInput } from "@mantine/core";
import { joiResolver, useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconExclamationMark, IconX } from '@tabler/icons';
import Joi from 'joi';
import { useSession } from "next-auth/react";
import { FunctionComponent, useState } from "react";

import { AddGift, ParseGift } from "../../services/Gift";
import { IGift } from "../../../types";
import IconWildberries from '../../../public/wildberries.svg';
import IconAliexpress from '../../../public/aliexpress.svg';
import { giftSchema } from "../../lib/joi";


interface IProps {
  opened: boolean;
  setOpened: (opened: boolean) => void;
};

const AddGiftModal: FunctionComponent<IProps> = (props) => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [shopNameSelect, setShopNameSelect] = useState("");

  const form = useForm({
    initialValues: {
      description: '',
      shopUrl: '',
    },

    validate: joiResolver(
      Joi.object({
        description: giftSchema.description,
        shopUrl: giftSchema.shopUrl,
      })
    ),
  });

  const handleSubmit = async () => {
    setIsLoading(true);

    if (shopNameSelect === 'aliexpress') {
      if (form.values.shopUrl.includes('aliexpress.ru') === false) {
        showNotification({
          title: 'Ошибка',
          message: 'Ссылка должна быть на aliexpress.ru',
          color: 'red',
          icon: <IconExclamationMark stroke={1.5} size="1.5rem" />,
        });
        setIsLoading(false);
        return;
      }
    }
    else if (shopNameSelect === 'wildberries') {
      if (form.values.shopUrl.includes('wildberries.ru') === false) {
        showNotification({
          title: 'Ошибка',
          message: 'Ссылка должна быть на wildberries.ru',
          color: 'red',
          icon: <IconExclamationMark stroke={1.5} size="1.5rem" />,
        });
        setIsLoading(false);
        return;
      }
    }


    showNotification({
      title: 'Подождите',
      message: 'Добавление подарка займет немного времени',
      color: 'yellow',
      icon: <IconExclamationMark stroke={1.5} size={24} />,
    });

    try {
      let parseData = await ParseGift(shopNameSelect, form.values.shopUrl);

      if (!parseData) {
        throw new Error("Не удалось получить данные с сайта");
      }

      const gift: IGift = {
        title: parseData.title,
        description: form.values.description,
        shopName: shopNameSelect,
        shopUrl: form.values.shopUrl,
        price: parseData.price,
        imageUrl: parseData.imageUrl,
        userId: session?.user?.id ? session.user.id : '',
      }

      await AddGift(gift);

      showNotification({
        title: 'Успешно',
        message: 'Подарок успешно добавлен',
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

    setIsLoading(false);
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
      closeOnClickOutside={isLoading ? false : true}
      closeOnEscape={isLoading ? false : true}
      withCloseButton={isLoading ? false : true}
    >
      <Box
        sx={(theme) => ({
          maxWidth: '350px',
          margin: '0 auto',
        })}
      >
        <LoadingOverlay visible={isLoading} overlayBlur={2} radius="md" />
        <form onSubmit={form.onSubmit(() => handleSubmit())}>
          <Textarea
            label="Описание"
            size="md"
            mt={10}
            placeholder="Мне это очень нужно, спасибо за подарок"
            {...form.getInputProps('description')}
          />

          <Input.Wrapper
            label="Выберите магазин"
            required
            size="md"
            mt={10}
          >
          </Input.Wrapper>
          <Button.Group orientation="vertical">
            <Button
              variant="default"
              sx={{ '.mantine-Button-label': { alignItems: 'center', gap: 10 } }}
              onClick={() => { setShopNameSelect("aliexpress"); form.setValues({ shopUrl: '' }) }}
              disabled={shopNameSelect === "aliexpress"}
            >
              <IconAliexpress />
              aliexpress.ru
            </Button>
            <Button
              variant="default"
              sx={{ '.mantine-Button-label': { alignItems: 'center', gap: 10 } }}
              onClick={() => { setShopNameSelect("wildberries"); form.setValues({ shopUrl: '' }) }}
              disabled={shopNameSelect === "wildberries"}
            >
              <IconWildberries />
              wildberries.ru
            </Button>
          </Button.Group>

          <TextInput
            label="Ссылка на товар"
            size="md"
            mt={10}
            required
            placeholder="https://www.wildberries.ru/catalog/30967922/detail.aspx?targetUrl=MI"
            disabled={shopNameSelect !== "wildberries" && shopNameSelect !== "aliexpress"}
            {...form.getInputProps("shopUrl")}
          />

          <Button type="submit" loading={isLoading} mt={20} fullWidth variant="outline">
            Добавить
          </Button>
        </form>
      </Box>
    </Modal>
  )
}

export default AddGiftModal;