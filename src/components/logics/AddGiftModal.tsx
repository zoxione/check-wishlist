import { Box, Button, Input, LoadingOverlay, Modal, Text, Textarea, TextInput } from "@mantine/core";
import { joiResolver, useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconExclamationMark, IconX, IconArrowBackUp } from '@tabler/icons';
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
  const [type, setType] = useState('');
  const [shopNameSelect, setShopNameSelect] = useState("");

  const form1 = useForm({
    initialValues: {
      description: '',
      price: 0,
    },

    validate: joiResolver(
      Joi.object({
        description: giftSchema.description,
        price: giftSchema.price,
      })
    ),
  });

  const form2 = useForm({
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

    showNotification({
      title: 'Подождите',
      message: 'Добавление подарка займет немного времени',
      color: 'yellow',
      icon: <IconExclamationMark stroke={1.5} size={24} />,
    });

    try {
      let gift: IGift = {
        title: '',
        description: '',
        shopName: '',
        shopUrl: '',
        price: '',
        imageUrl: '',
        userId: session?.user?.id ? session.user.id : '',
      };

      if (type === 'money') {
        gift.title = 'Деньги';
        gift.description = form1.values.description;
        gift.price = form1.values.price;
        gift.imageUrl = 'https://cserfwfqoxxsyqezqezy.supabase.co/storage/v1/object/public/check/gifts/gift-box';
      }
      else if (type === 'gift') {
        if (shopNameSelect === 'aliexpress') {
          if (form2.values.shopUrl.includes('aliexpress.ru') === false) {
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
          if (form2.values.shopUrl.includes('wildberries.ru') === false) {
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

        let parseData = await ParseGift(shopNameSelect, form2.values.shopUrl);

        if (!parseData) {
          throw new Error("Не удалось получить данные с сайта");
        }

        gift.title = parseData.title;
        gift.description = form2.values.description;
        gift.shopName = shopNameSelect;
        gift.shopUrl = form2.values.shopUrl;
        gift.price = parseData.price;
        gift.imageUrl = parseData.imageUrl;
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
        {type === '' && (
          <>
            <Box
              sx={(theme) => ({
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px',
              })}
            >
              <Button variant="default" sx={() => ({ textAlign: 'center', fontSize: '20px', height: '220px', width: '100%' })} onClick={() => setType('money')}>
                Деньги <br /> <br /> 💵
              </Button>
              <Button variant="default" sx={() => ({ textAlign: 'center', fontSize: '20px', height: '220px', width: '100%' })} onClick={() => setType('gift')}>
                Подарок <br /> <br /> 🎁
              </Button>
            </Box>
          </>
        )}

        {type === 'money' && (
          <>
            <Button variant="default" onClick={() => setType('')} leftIcon={<IconArrowBackUp size={18} />}>
              Вернуться
            </Button>
            <LoadingOverlay visible={isLoading} overlayBlur={2} radius="md" />
            <form onSubmit={form1.onSubmit(() => handleSubmit())}>
              <Textarea
                label="Описание"
                size="md"
                mt={10}
                placeholder="Мне это очень нужно, спасибо за подарок"
                {...form1.getInputProps('description')}
              />
              <TextInput
                label="Сумма"
                size="md"
                required
                placeholder="100.00"
                {...form1.getInputProps("price")}
              />

              <Button type="submit" loading={isLoading} mt={20} fullWidth variant="outline">
                Добавить
              </Button>
            </form>
          </>
        )}

        {type === 'gift' && (
          <>
            <Button variant="default" onClick={() => setType('')} leftIcon={<IconArrowBackUp size={18} />}>
              Вернуться
            </Button>
            <LoadingOverlay visible={isLoading} overlayBlur={2} radius="md" />
            <form onSubmit={form2.onSubmit(() => handleSubmit())}>
              <Textarea
                label="Описание"
                size="md"
                mt={10}
                placeholder="Мне это очень нужно, спасибо за подарок"
                {...form2.getInputProps('description')}
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
                  onClick={() => { setShopNameSelect("aliexpress"); form2.setValues({ shopUrl: '' }) }}
                  disabled={shopNameSelect === "aliexpress"}
                >
                  <IconAliexpress />
                  aliexpress.ru
                </Button>
                <Button
                  variant="default"
                  sx={{ '.mantine-Button-label': { alignItems: 'center', gap: 10 } }}
                  onClick={() => { setShopNameSelect("wildberries"); form2.setValues({ shopUrl: '' }) }}
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
                {...form2.getInputProps("shopUrl")}
              />

              <Button type="submit" loading={isLoading} mt={20} fullWidth variant="outline">
                Добавить
              </Button>
            </form>
          </>
        )}
      </Box>
    </Modal>
  )
}

export default AddGiftModal;
