import { Button, Flex, Loader, createStyles } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import { useAppDispatch } from 'hooks/redux';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetTasksQuery } from 'store/api/tasks';
import { setCreatingTask, setIsEdit, setIsOpen } from 'store/taskSlice';
import ModalContent from './ModalContent/ModalContent';
import Task from './Task/Task';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import cl from './TaskList.module.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useListState } from '@mantine/hooks';

interface ITaskListProps {
  columnId: string;
  boardId: string;
}

const useStyles = createStyles((theme) => ({
  item: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },
}));

const TaskList = memo<ITaskListProps>(({ boardId, columnId }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { data: tasks, isFetching, error } = useGetTasksQuery({ boardId, columnId });
  const { classes, cx } = useStyles();
  const [state, handlers] = useListState(tasks);

  const openCreatingModal = useCallback(() => {
    const task = { boardId, columnId, order: tasks?.length || 0 };
    dispatch(setCreatingTask(task));
    dispatch(setIsEdit(false));
    dispatch(setIsOpen(true));
  }, []);

  if (typeof error == 'number') return <div>{`${t('Ошибка ')} ${error}`}</div>;
  if (isFetching) return <Loader style={{ width: '100%' }} color="dark" />;
  if (!tasks) return <div>{t('Ничего не найдено!')}</div>;

  const taskList = tasks.map((task, index) => (
    <Draggable key={task._id} index={index} draggableId={task._id}>
      {(provided, snapshot) => (
        <div
          className={cl.draggable}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Task _id={task._id} index={index} boardId={boardId} columnId={columnId} key={task._id} />
        </div>
      )}
    </Draggable>
  ));

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) =>
        handlers.reorder({ from: source.index, to: destination?.index || 0 })
      }
    >
      <OverlayScrollbarsComponent
        defer
        className={cl.host}
        options={{
          overflow: {
            y: 'scroll',
            x: 'hidden',
          },
        }}
      >
        <Droppable droppableId={columnId} direction="vertical">
          {(provided) => (
            <div
              className={taskList.length <= 0 ? cl.droppableEmpty : ''}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <Flex className={cl.tasks} gap={{ base: 'xs', sm: 'sm' }}>
                {taskList}
              </Flex>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Button
          onClick={openCreatingModal}
          leftIcon={<IconPlus size={20} />}
          classNames={ButtonClasses}
        >
          {t('Add task')}
        </Button>
      </OverlayScrollbarsComponent>
      <ModalContent />
    </DragDropContext>
  );
});

const ButtonClasses = {
  root: cl.taskBtnWrapper,
  input: cl.taskBtn,
};

export default TaskList;
