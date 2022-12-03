import { Box, Paper, Title, Text, Checkbox, Anchor } from '@mantine/core';
import Link from 'next/link';
import Router from 'next/router';
import { IconArrowNarrowRight } from '@tabler/icons';
import { FunctionComponent, ReactNode } from 'react';
import { ITransaction } from '../../../types';
import { CompleteTransaction } from '../../services/Transaction';


interface IProps {
  tran: any;
  index: number;
  isAdmin: boolean;
}


const TransactionCard: FunctionComponent<IProps> = ({ tran, index, isAdmin }) => {

  if (isAdmin) {
    return (
      <Box
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'row',
          [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
          },
          justifyContent: 'flex-start',
          alignItems: 'center',
          borderRadius: theme.radius.md,
          border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
          padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
          paddingLeft: theme.spacing.xl - theme.spacing.md,
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
          marginBottom: theme.spacing.sm,
        })}
        key={index}
      >
        <Box
          sx={(theme) => ({
            ...theme.fn.focusStyles(),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            height: '100%',
            color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
            paddingLeft: theme.spacing.md,
            paddingRight: theme.spacing.md,
          })}
        >
          <Text
            sx={(theme) => ({
              fontSize: 30,
              fontWeight: 700,
              width: 60,
              color: theme.colorScheme === 'dark' ? 'white' : 'black',
            })}
          >
            {index + 1}
          </Text>
        </Box>
        <Box
          sx={(theme) => ({
            [theme.fn.smallerThan('sm')]: {
              textAlign: 'center',
            },
          })}
        >
          <Text weight={500}>{tran.Gift.title}</Text>
          <Box
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginTop: 5,
              [theme.fn.smallerThan('sm')]: {
                flexDirection: 'column',
                gap: '0px',
              },
            })}
          >
            <Link href={`/${tran.Gifter.username}`} passHref>
              <Anchor size="sm">
                {tran.Gifter.username}
              </Anchor>
            </Link>
            <IconArrowNarrowRight size={20} />
            <Link href={`/${tran.User.username}`} passHref>
              <Anchor size="sm">
                {tran.User.username}
              </Anchor>
            </Link>
          </Box>
          <Text color="dimmed" size="sm">
            Дата и время: {new Date(tran.createdAt).toLocaleDateString() + ' ' + new Date(tran.createdAt).toLocaleTimeString()}
          </Text>
        </Box>
        {
          tran.isCompleted ? (
            <Checkbox
              defaultChecked={tran.isCompleted}
              disabled
              label="Выполнен"
              ml="auto"
            />
          ) : (
            <Checkbox
              defaultChecked={tran.isCompleted}
              label="Выполнен"
              ml="auto"
              sx={(theme) => ({
                '.mantine-Checkbox-input': {
                  cursor: 'pointer',
                }
              })}
              onChange={(event) => {
                CompleteTransaction(tran.id);
                Router.reload()
              }}
            />
          )
        }
      </Box>
    )
  }
  else {
    return (
      <Box
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'row',
          [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
          },
          justifyContent: 'flex-start',
          alignItems: 'center',
          borderRadius: theme.radius.md,
          border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
          padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
          paddingLeft: theme.spacing.xl - theme.spacing.md,
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
          marginBottom: theme.spacing.sm,
        })}
        key={index}
      >
        <Box
          sx={(theme) => ({
            ...theme.fn.focusStyles(),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            height: '100%',
            color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
            paddingLeft: theme.spacing.md,
            paddingRight: theme.spacing.md,
          })}
        >
          <Text
            sx={(theme) => ({
              fontSize: 30,
              fontWeight: 700,
              width: 60,
              color: theme.colorScheme === 'dark' ? 'white' : 'black',
            })}
          >
            {index + 1}
          </Text>
        </Box>
        <Box
          sx={(theme) => ({
            [theme.fn.smallerThan('sm')]: {
              textAlign: 'center',
            },
          })}
        >
          <Text weight={500}>{tran.Gift.title}</Text>
          <Box
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginTop: 5,
              [theme.fn.smallerThan('sm')]: {
                flexDirection: 'column',
                gap: '0px',
              },
            })}
          >
            <Text size="sm">
              Подарил: {' '}
              <Link href={`/${tran.Gifter.username}`} passHref>
                <Anchor>
                  {tran.Gifter.username}
                </Anchor>
              </Link>
            </Text>
          </Box>
          <Text color="dimmed" size="sm">
            Дата и время: {new Date(tran.createdAt).toLocaleDateString() + ' ' + new Date(tran.createdAt).toLocaleTimeString()}
          </Text>
        </Box>
      </Box>
    )
  }
}

export default TransactionCard;