import { Anchor, Box, Card, Checkbox, Container, Skeleton } from '@mantine/core';
import { FunctionComponent, useEffect, useState } from 'react'

import InfoCard from '../ui/InfoCard';
import UserFragmentLayout from './UserFragmentLayout';

import { createStyles, Text } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { IconGripVertical, IconArrowNarrowRight } from '@tabler/icons';
import { GetStaticProps } from 'next';
import { ITransaction } from '../../types';

import useSWR from 'swr'
import Router from "next/router";

// const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());

interface IProps {
  transactions: ITransaction[];
};

const UserDashboard: FunctionComponent<IProps> = (props) => {
  // const { data, error } = useSWR('http://localhost:8080/transaction', fetcher)
  // const transactions: ITransaction[] = data;
  // console.log(transactions)



  const [state, handlers] = useListState(props.transactions);

  return (
    <>
      <UserFragmentLayout>
        <InfoCard title="Приборная панель">
          <DragDropContext
            onDragEnd={({ destination, source }) =>
              handlers.reorder({ from: source.index, to: destination?.index || 0 })
            }
          >
            <Droppable droppableId="dnd-list" direction="vertical">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {state.map((item, index) => (
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
                            <Text weight={500}>{item.giftId}</Text>
                            <Box
                              sx={(theme) => ({
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '10px',
                                marginTop: 5,
                                [theme.fn.smallerThan('sm')]: {
                                  flexDirection: 'column',
                                  gap: '0px',
                                },
                              })}
                            >
                              <Anchor href="#">
                                {item.gifterId}
                              </Anchor>
                              <IconArrowNarrowRight size={20} />
                              <Anchor href="#">
                                {item.userId}
                              </Anchor>
                            </Box>
                            <Text color="dimmed" size="sm">
                              Дата создания: {item.createdAt?.toString()}
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
                                  onChange={(event) => {
                                    fetch(`http://localhost:8080/transaction/${item.id}`, {
                                      // fetch(`http://ovz2.j61057165.m7o9p.vps.myjino.ru:49274/transaction/${item.id}`, {
                                      method: 'PATCH',
                                      headers: {
                                        'Content-Type': 'application/json'
                                      },
                                      body: JSON.stringify({
                                        isCompleted: event.target.checked
                                      })
                                    })
                                    Router.reload()
                                    // Router.push({
                                    //   pathname: '/user',
                                    //   query: { activeFragment: 2 },
                                    // })
                                  }}
                                  label="Выполнен"
                                  ml="auto"
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
        </InfoCard>
      </UserFragmentLayout>
    </>
  )
}

export default UserDashboard;