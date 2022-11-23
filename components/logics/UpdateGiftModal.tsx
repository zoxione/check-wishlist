import { Box, Button, Image, Modal, Text, Textarea, Tooltip } from "@mantine/core";
import { joiResolver, useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from '@tabler/icons';
import Joi from 'joi';
import { FunctionComponent, useState } from "react";

import { UpdateGift } from "../../api/Gift";
import { IGift } from "../../types";
import { giftSchema } from "../logics/ValidationForm";


interface IProps {
  gift: IGift,
  opened: boolean;
  setOpened: (opened: boolean) => void;
};


const UpdateGiftModal: FunctionComponent<IProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      description: props.gift?.description,
    },

    validate: joiResolver(
      Joi.object({
        description: giftSchema.description,
      })
    ),
  });

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      let gift: IGift = props.gift;
      gift.description = form.values.description;

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
          <Textarea
            label="Описание"
            size="md"
            mt={10}
            placeholder="Мне это очень нужно, спасибо за подарок"
            {...form.getInputProps('description')}
          />
          <Button type="submit" loading={isLoading} mt={20} fullWidth variant="outline">
            Изменить
          </Button>
        </form>
      </Box>
    </Modal>
  )
}

export default UpdateGiftModal;
