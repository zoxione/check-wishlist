import { Accordion, Anchor, Box, Container, Text, Title } from "@mantine/core";
import { IconChevronsDown } from "@tabler/icons";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import AppHead from "../components/logics/Head";
import InfoCard from "../components/ui/InfoCard";
import Search from "../components/ui/Search";

interface Props {}

const Home: NextPage<Props> = (props) => {
  const { status, data } = useSession();
  //console.log(status, data)

  return (
    <>
      <AppHead title="Wishlist" />

      <Container
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100vh - 60px)",
          marginTop: "-80px",
        })}
      >
        <Title mb={50} order={1} align="center">
          Найди{" "}
          <Box
            component="span"
            sx={(theme) => ({
              color: theme.fn.primaryColor(),
            })}
          >
            список желаний
          </Box>{" "}
          друга
        </Title>
        <Search />
      </Container>

      <Box>
        <Link href="#how-it-works" scroll={false}>
          <Anchor
            variant="text"
            sx={(theme) => ({
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              "&:hover": {
                color: theme.fn.primaryColor(),
              },
              animation: "bounce 2s ease infinite",
              "@keyframes bounce": {
                "0%, 20%, 50%, 80%, 100%": {
                  transform: "translateY(0)",
                },
                "40%": {
                  transform: "translateY(-10px)",
                },
                "60%": {
                  transform: "translateY(-5px)",
                },
              },
            })}
          >
            Подробнее
            <IconChevronsDown size={20} />
          </Anchor>
        </Link>

        <Box id="how-it-works" />

        <Container
          sx={(theme) => ({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "60px",
            marginTop: "80px",
            marginBottom: "80px",
          })}
        >
          <Title order={1} align="center">
            Как это работает?
          </Title>

          <InfoCard>
            <Box
              sx={(theme) => ({
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "40px",
                [theme.fn.smallerThan("sm")]: {
                  flexDirection: "column",
                },
              })}
            >
              <Box
                sx={(theme) => ({
                  width: "50%",
                  [theme.fn.smallerThan("sm")]: {
                    width: "100%",
                  },
                })}
              >
                <Text
                  sx={(theme) => ({
                    color: theme.fn.primaryColor(),
                    fontWeight: 700,
                    fontSize: 20,
                  })}
                >
                  Шаг 1
                </Text>
                <Title order={3} mb={10}>
                  Добавьте подарки в свой список желаний
                </Title>
                <Text>
                  Создайте список желаемых подарков с избранных магазинов.
                  Поделитесь своим списком с друзьями или подписчиками, добавив
                  его в свой профиль.
                </Text>
              </Box>
              <Box
                sx={(theme) => ({
                  width: "50%",
                  display: "flex",
                  justifyContent: "center",
                  [theme.fn.smallerThan("sm")]: {
                    width: "100%",
                  },
                })}
              >
                <Image
                  src="/add_gifts.png"
                  alt="add gifts"
                  width={280}
                  height={290}
                  quality={100}
                  priority={true}
                />
              </Box>
            </Box>
          </InfoCard>

          <InfoCard>
            <Box
              sx={(theme) => ({
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "40px",
                [theme.fn.smallerThan("sm")]: {
                  flexDirection: "column",
                  flexFlow: "column-reverse",
                },
              })}
            >
              <Box
                sx={(theme) => ({
                  width: "50%",
                  display: "flex",
                  justifyContent: "center",
                  [theme.fn.smallerThan("sm")]: {
                    width: "100%",
                  },
                })}
              >
                <Image
                  src="/give_gifts.png"
                  alt="give gifts"
                  width={280}
                  height={290}
                  quality={100}
                  priority={true}
                />
              </Box>
              <Box
                sx={(theme) => ({
                  width: "50%",
                  [theme.fn.smallerThan("sm")]: {
                    width: "100%",
                  },
                })}
              >
                <Text
                  sx={(theme) => ({
                    color: theme.fn.primaryColor(),
                    fontWeight: 700,
                    fontSize: 20,
                  })}
                >
                  Шаг 2
                </Text>
                <Title order={3} mb={10}>
                  Ваши поклонники покупают подарки
                </Title>
                <Text>
                  Поделитесь своей ссылкой со своими друзьями или подписчиками,
                  и они смогут посетить ваш список желаний и купить вам подарки.
                  Поклонники могут оставить сообщение и свое имя во время
                  оформления заказа.
                </Text>
              </Box>
            </Box>
          </InfoCard>

          <InfoCard>
            <Box
              sx={(theme) => ({
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "40px",
                [theme.fn.smallerThan("sm")]: {
                  flexDirection: "column",
                },
              })}
            >
              <Box
                sx={(theme) => ({
                  width: "50%",
                  [theme.fn.smallerThan("sm")]: {
                    width: "100%",
                  },
                })}
              >
                <Text
                  sx={(theme) => ({
                    color: theme.fn.primaryColor(),
                    fontWeight: 700,
                    fontSize: 20,
                  })}
                >
                  Шаг 3
                </Text>
                <Title order={3} mb={10}>
                  Мы покупаем подарки и доставляем их
                </Title>
                <Text>
                  Затем мы отправляем подарки, купленные вашими друзьями или
                  подписчиками, прямо на ваш адрес. Процесс заказа полностью
                  отделен от покупки подарка вашим поклонником, чтобы обеспечить
                  100% конфиденциальность.
                </Text>
              </Box>
              <Box
                sx={(theme) => ({
                  width: "50%",
                  display: "flex",
                  justifyContent: "center",
                  [theme.fn.smallerThan("sm")]: {
                    width: "100%",
                  },
                })}
              >
                <Image
                  src="/delivery_gifts.png"
                  alt="delivery gifts"
                  width={280}
                  height={290}
                  quality={100}
                  priority={true}
                />
              </Box>
            </Box>
          </InfoCard>

          <Title mt={40} order={1} align="center">
            Часто задаваемые вопросы
          </Title>

          <Accordion
            variant="separated"
            sx={(theme) => ({
              width: "100%",
              ".mantine-Accordion-item": {
                width: "100%",
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[8]
                    : theme.white,
                "&:hover": {
                  border:
                    theme.colorScheme === "dark"
                      ? "1px solid #373A40"
                      : "1px solid #DEE2E6",
                },
              },
              ".mantine-Accordion-label": {
                fontSize: 18,
                fontWeight: 500,
              },
            })}
          >
            <Accordion.Item value="value1">
              <Accordion.Control>Сколько это стоит?</Accordion.Control>
              <Accordion.Panel>
                На данный момент сервис бесплатный. Мы не взимаем комиссию за
                покупку подарков. Все, что мы хотим, это помочь вам собрать
                подарки на свой день рождения или праздник.
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="value2">
              <Accordion.Control>
                Как я могу получить подарки?
              </Accordion.Control>
              <Accordion.Panel>
                Мы отправляем подарки, купленные вашими друзьями или
                подписчиками, прямо на ваш адрес. Процесс заказа полностью
                отделен от покупки подарка вашим поклонником, чтобы обеспечить
                100% конфиденциальность.
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="value3">
              <Accordion.Control>
                Как я могу узнать, что мне подарили?
              </Accordion.Control>
              <Accordion.Panel>
                В приборной панели аккаунта отображается полная статистика по
                подаркам, которые вы получили. Там же вы можете увидеть, кто
                подарил вам подарок и что подарили.
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>

          <Text align="center" mt={60}>
            Создано{" "}
            <Anchor
              href="https://github.com/zoxione"
              target="_blank"
              sx={(theme) => ({
                color: theme.fn.primaryColor(),
                fontWeight: 500,
                fontSize: 18,
              })}
            >
              @zoxione
            </Anchor>{" "}
            в рамках проекта, 2022
          </Text>
        </Container>
      </Box>
    </>
  );
};

export default Home;
