import { FunctionComponent, useEffect } from 'react'
import Router from "next/router";
import { Anchor, Box, Checkbox, Skeleton } from '@mantine/core';
import { Text } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { IconGripVertical, IconArrowNarrowRight } from '@tabler/icons';

import UserFragmentLayout from './UserFragmentLayout';
import InfoCard from '../ui/InfoCard';
import { useTransactions } from '../../api/Transaction';
import { CompleteTransaction } from '../../api/Transaction';
import Link from 'next/link';


interface IProps {

};

const UserDashboard: FunctionComponent<IProps> = (props) => {
  const { transactions, isLoading } = useTransactions();
  console.log(transactions);

  const [state, handlers] = useListState(transactions);

  useEffect(() => {
    handlers.setState(transactions);
  }, [transactions, handlers]);


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
                                  item.isCompleted ? (
                                    <Checkbox
                                      defaultChecked={item.isCompleted}
                                      disabled
                                      label="Выполнен"
                                      ml="auto"
                                    />
                                  )
                                    : (
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
      </UserFragmentLayout>
    </>
  )
}

export default UserDashboard;
