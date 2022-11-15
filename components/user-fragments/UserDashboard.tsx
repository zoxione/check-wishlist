import { Anchor, Box, Checkbox, Skeleton, Table, Text, ScrollArea } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { IconArrowNarrowRight, IconGripVertical } from '@tabler/icons';
import Router from "next/router";
import { FunctionComponent, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Link from 'next/link';

import { CompleteTransaction, useTransactionsFromUserId } from '../../api/Transaction';
import InfoCard from '../ui/InfoCard';
import UserFragmentLayout from './UserFragmentLayout';
import { IUser } from '../../types';


interface IProps {
  user: IUser;
};

const UserDashboard: FunctionComponent<IProps> = (props) => {
  const { transactions, isLoading } = useTransactionsFromUserId(props.user?.id ? props.user.id : '');

  const [state, handlers] = useListState(transactions);

  useEffect(() => {
    handlers.setState(transactions);
  }, [transactions, handlers]);

  console.log(transactions)


  return (
    <>
      <UserFragmentLayout>
        <InfoCard title="Приборная панель">
          {
            isLoading ?
              (
                <>
                  <Skeleton height={130} radius="md" />
                  <Skeleton height={130} mt="20px" radius="md" />
                </>
              )
              : (
                <ScrollArea
                  sx={(theme) => ({
                    overflow: 'hidden',
                  })}
                >
                  <Table
                    sx={(theme) => ({
                      width: '100%',
                      height: '100%',
                      overflow: 'hidden',
                      '.mantine-Table-root': {
                        overflow: 'hidden',
                      },
                      'thead': {
                        overflow: 'hidden',
                      },
                      'tbody': {
                        overflow: 'hidden',
                      },
                    })}
                  >
                    <thead>
                      <tr>
                        <th>Номер</th>
                        <th>Даритель</th>
                        <th>Подарок</th>
                        <th>Время и дата</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        transactions.map((tran) => (
                          <tr key={tran.id}>
                            <td>{transactions.indexOf(tran)}</td>
                            <td>
                              <Link href={`/${tran.Gifter.username}`}>
                                <Anchor>{tran.Gifter.username}</Anchor>
                              </Link>
                            </td>
                            <td>{tran.Gift.title}</td>
                            <td>
                              {
                                new Date(tran.createdAt).toLocaleDateString() + ' '
                                + new Date(tran.createdAt).toLocaleTimeString()
                              }
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </Table>
                </ScrollArea>
              )
          }
        </InfoCard>

        {
          props.user?.role === "admin" && (
            <InfoCard title="Админ панель">
              {
                isLoading ?
                  (
                    <>
                      <Skeleton height={130} radius="md" />
                      <Skeleton height={130} mt="20px" radius="md" />
                    </>
                  )
                  : (
                    <DragDropContext
                      onDragEnd={({ destination, source }) =>
                        handlers.reorder({ from: source.index, to: destination?.index || 0 })
                      }
                    >
                      <Droppable droppableId="dnd-list" direction="vertical">
                        {(provided) => (
                          <div {...provided.droppableProps} ref={provided.innerRef}>
                            {state?.map((item, index) => (
                              <Draggable key={index} index={index} draggableId={index.toString()}>
                                {(provided, snapshot) => (
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
                                      border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
                                        }`,
                                      padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
                                      paddingLeft: theme.spacing.xl - theme.spacing.md,
                                      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
                                      marginBottom: theme.spacing.sm,
                                    })}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                  >
                                    <Box
                                      {...provided.dragHandleProps}
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
                                      <IconGripVertical size={18} stroke={1.5} />
                                      <Text
                                        sx={(theme) => ({
                                          fontSize: 30,
                                          fontWeight: 700,
                                          width: 60,
                                          color: theme.colorScheme === 'dark' ? 'white' : 'black',
                                        })}
                                      >
                                        {index}
                                      </Text>
                                    </Box>
                                    <Box
                                      sx={(theme) => ({
                                        [theme.fn.smallerThan('sm')]: {
                                          textAlign: 'center',
                                        },
                                      })}
                                    >
                                      <Text weight={500}>{item.Gift.title}</Text>
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
                                        <Link href={`/${item.Gifter.username}`} passHref>
                                          <Anchor>
                                            {item.Gifter.username}
                                          </Anchor>
                                        </Link>
                                        <IconArrowNarrowRight size={20} />
                                        <Link href={`/${item.User.username}`} passHref>
                                          <Anchor href="#">
                                            {item.User.username}
                                          </Anchor>
                                        </Link>
                                      </Box>
                                      <Text color="dimmed" size="sm">
                                        Дата создания: {item.createdAt.slice(0, 10)}
                                      </Text>
                                    </Box>
                                    {
                                      props.user?.role === "admin" && item.isCompleted && (
                                        <Checkbox
                                          defaultChecked={item.isCompleted}
                                          disabled
                                          label="Выполнен"
                                          ml="auto"
                                        />
                                      )
                                    }
                                    {
                                      props.user?.role === "admin" && !item.isCompleted && (
                                        <Checkbox
                                          defaultChecked={item.isCompleted}
                                          label="Выполнен"
                                          ml="auto"
                                          sx={(theme) => ({
                                            '.mantine-Checkbox-input': {
                                              cursor: 'pointer',
                                            }
                                          })}
                                          onChange={(event) => {
                                            CompleteTransaction(item.id);
                                            Router.reload()
                                          }}
                                        />
                                      )
                                    }
                                  </Box>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  )
              }
            </InfoCard>
          )
        }
      </UserFragmentLayout>
    </>
  )
}

export default UserDashboard;
