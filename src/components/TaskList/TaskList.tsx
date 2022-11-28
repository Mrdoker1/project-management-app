import { Button, Flex, Loader, Modal } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetTasksQuery } from 'store/api/tasks';
import { setCreatingTask, setIsEdit, setIsOpen } from 'store/taskSlice';
import ModalContent from './ModalContent/ModalContent';
import Task from './Task/Task';
import cl from './TaskList.module.css';

interface ITaskListProps {
  columnId: string;
  boardId: string;
}

const TaskList = memo<ITaskListProps>(({ boardId, columnId }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { data: tasks, isFetching, error } = useGetTasksQuery({ boardId, columnId });

  const openCreatingModal = useCallback(() => {
    const task = { boardId, columnId, order: tasks?.length || 0 };
    dispatch(setCreatingTask(task));
    dispatch(setIsEdit(false));
    dispatch(setIsOpen(true));
  }, []);

  if (typeof error == 'number') return <div>{`${t('Ошибка ')} ${error}`}</div>;
  if (isFetching) return <Loader style={{ width: '100%' }} color="dark" />;
  if (!tasks) return <div>{t('Ничего не найдено!')}</div>;

  return (
    <Flex className={cl.tasks} gap={{ base: 'xs', sm: 'sm' }}>
      {tasks.map((task) => (
        <Task _id={task._id} boardId={boardId} columnId={columnId} key={task._id} />
      ))}
      <Button
        onClick={openCreatingModal}
        leftIcon={<IconPlus size={20} />}
        classNames={ButtonClasses}
      >
        {t('Add task')}
      </Button>
      <ModalContent />
    </Flex>
  );
});

const ButtonClasses = {
  root: cl.taskBtnWrapper,
  input: cl.taskBtn,
};

export default TaskList;
