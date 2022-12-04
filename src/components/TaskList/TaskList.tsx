import { Button, Flex, Loader } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetTasksQuery } from 'store/api/tasks';
import { setCreatingTask, setIsEdit, setIsOpen } from 'store/taskSlice';
import { setTasks } from 'store/taskListSlice';
import ModalContent from './ModalContent/ModalContent';
import Task from './Task/Task';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import cl from './TaskList.module.css';
import { Draggable } from 'react-beautiful-dnd';
import { ITask } from 'interfaces/ITask';
import { setSelectedBoardId } from 'store/boardsSlice';

interface ITaskListProps {
  columnId: string;
  boardId: string;
  placeholder: React.ReactElement<HTMLElement> | null | undefined;
}

const TaskList = memo<ITaskListProps>(({ boardId, columnId, placeholder }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const tasksListState = useAppSelector((state) => state.taskList);

  const { data: tasks, isFetching, error } = useGetTasksQuery({ boardId, columnId });
  const [taskListState, setTaskListState] = useState([] as Array<ITask>);

  const openCreatingModal = useCallback(() => {
    const task = { boardId, columnId, order: tasks?.length || 0 };
    dispatch(setCreatingTask(task));
    dispatch(setIsEdit(false));
    dispatch(setIsOpen(true));
  }, [tasks]);

  useEffect(() => {
    if (tasks) {
      if (!(boardId in tasksListState)) {
        dispatch(setTasks({ boardId: boardId, columnId: columnId, array: tasks }));
      } else if (boardId in tasksListState) {
        if (!(columnId in tasksListState[boardId])) {
          dispatch(setTasks({ boardId: boardId, columnId: columnId, array: tasks }));
        }
      }
      dispatch(setSelectedBoardId(boardId));
    }
  }, [tasks]);

  useEffect(() => {
    try {
      setTaskListState(tasksListState[boardId][columnId] || []);
    } catch {}
  }, [tasksListState]);

  if (typeof error == 'number') return <div>{`${t('Ошибка ')} ${error}`}</div>;
  if (isFetching) return <Loader style={{ width: '100%' }} color="dark" />;
  if (!tasks) return <div>{t('Ничего не найдено!')}</div>;

  const taskList = taskListState.map((task: ITask) => (
    <Draggable key={task._id} index={task.order} draggableId={task._id}>
      {(provided) => (
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
            data={task}
          />
        </div>
      )}
    </Draggable>
  ));

  return (
    <>
      <OverlayScrollbarsComponent
        defer
        className={cl.host}
        options={{
          scrollbars: { theme: 'task-scroll' },
          overflow: {
            y: 'scroll',
            x: 'hidden',
          },
        }}
      >
        <Flex className={cl.tasks} gap={{ base: 'xs', sm: 'sm' }}>
          {taskList}
          {placeholder}
        </Flex>
      </OverlayScrollbarsComponent>
      <Button
        onClick={openCreatingModal}
        leftIcon={<IconPlus size={20} />}
        classNames={ButtonClasses}
      >
        {t('Create task')}
      </Button>
      <ModalContent />
    </>
  );
});

const ButtonClasses = {
  root: cl.taskBtnWrapper,
  input: cl.taskBtn,
  label: cl.taskBtnLabel,
};

export default TaskList;
