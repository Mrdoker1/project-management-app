import { Button, Flex, Loader } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import { useAppDispatch } from 'hooks/redux';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetTasksQuery, useUpdateTasksSetMutation } from 'store/api/tasks';
import { setCreatingTask, setIsEdit, setIsOpen } from 'store/taskSlice';
import ModalContent from './ModalContent/ModalContent';
import Task from './Task/Task';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import cl from './TaskList.module.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useListState } from '@mantine/hooks';
import { ITask } from 'interfaces/ITask';

const reorder = (array: Array<ITask>, from: number, to: number) => {
  const a = [...array];
  const tmp = a[to];
  a[to] = a[from];
  a[from] = tmp;
  return a.map((t: ITask, index) => ({ _id: t._id, order: index, columnId: t.columnId }));
};

const reorderTask = (array: Array<ITask>, from: number, to: number) => {
  const a = [...array];
  const tmp = a[to];
  a[to] = a[from];
  a[from] = tmp;
  return a.map((t: ITask, index) => ({ ...t, order: index }));
};

interface ITaskListProps {
  columnId: string;
  boardId: string;
}

const TaskList = memo<ITaskListProps>(({ boardId, columnId }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { data: tasks, isFetching, error } = useGetTasksQuery({ boardId, columnId });
  const [tasksListState, setTasksListState] = useState([] as Array<ITask>);
  const [updateTasksMutation, { isLoading }] = useUpdateTasksSetMutation();

  const openCreatingModal = useCallback(() => {
    const task = { boardId, columnId, order: tasks?.length || 0 };
    dispatch(setCreatingTask(task));
    dispatch(setIsEdit(false));
    dispatch(setIsOpen(true));
  }, [tasks]);

  useEffect(() => {
    if (tasks) {
      const taskList = [...tasks];
      if (taskList.length > 0) {
        taskList.sort((a: ITask, b: ITask) => a.order - b.order);
      }
      console.log('sorted', taskList);
      setTasksListState(taskList);
    }
  }, [tasks]);

  if (typeof error == 'number') return <div>{`${t('Ошибка ')} ${error}`}</div>;
  if (isFetching) return <Loader style={{ width: '100%' }} color="dark" />;
  if (!tasks) return <div>{t('Ничего не найдено!')}</div>;

  console.log(tasksListState);

  const taskList = tasksListState.map((task: ITask) => (
    <Draggable key={task._id} index={task.order} draggableId={task._id}>
      {(provided, snapshot) => (
        <div
          className={cl.draggable}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Task
            _id={task._id}
            index={task.order}
            boardId={boardId}
            columnId={columnId}
            key={task._id}
          />
        </div>
      )}
    </Draggable>
  ));

  return (
    <DragDropContext
      onDragEnd={async ({ destination, source }) => {
        setTasksListState(reorderTask(tasksListState, source.index, destination?.index || 0));
        console.log(reorderTask(tasksListState, source.index, destination?.index || 0));
        await updateTasksMutation(reorder(tasksListState, source.index, destination?.index || 0));
      }}
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
