import { Anchor, Box, Checkbox, Container } from '@mantine/core';
import { FunctionComponent } from 'react'

import InfoCard from '../InfoCard';
import UserFragmentLayout from './UserFragmentLayout';

import { createStyles, Text } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { IconGripVertical, IconArrowNarrowRight } from '@tabler/icons';


interface IProps {
  data: {
    id: number;
    giftName: string;
    gifterName: string;
    userName: string;
    createdAt: string;
    isCompleted: boolean;
  }[];
};


const UserDashboard: FunctionComponent<IProps> = ({ data }) => {
  const [state, handlers] = useListState(data);

  return (
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
                  <Draggable key={item.id} index={index} draggableId={item.id.toString()}>
                    {(provided, snapshot) => (
                      <Box
                        sx={(theme) => ({
                          display: 'flex',
                          alignItems: 'center',
                          borderRadius: theme.radius.md,
                          border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
                            }`,
                          padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
                          paddingLeft: theme.spacing.xl - theme.spacing.md, // to offset drag handle
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
                            height: '100%',
                            color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
                            paddingLeft: theme.spacing.md,
                            paddingRight: theme.spacing.md,
                          })}
                        >
                          <IconGripVertical size={18} stroke={1.5} />
                        </Box>
                        <Text
                          sx={(theme) => ({
                            fontSize: 30,
                            fontWeight: 700,
                            width: 60,
                          })}
                        >
                          {index}
                        </Text>
                        <div>
                          <Text weight={500}>{item.giftName}</Text>
                          <Box
                            sx={(theme) => ({
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              marginTop: 5,
                            })}
                          >
                            <Anchor href="#">
                              {item.gifterName}
                            </Anchor>
                            <IconArrowNarrowRight size={18} />
                            <Anchor href="#">
                              {item.userName}
                            </Anchor>
                          </Box>
                          <Text color="dimmed" size="sm">
                            Дата создания: {item.createdAt}
                          </Text>
                          <Checkbox
                            defaultChecked={item.isCompleted}
                            label="Выполнен"
                            mt={10}
                          />
                        </div>
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
  )
}

export default UserDashboard;