import { Button, CloseButton, Group, Text } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { useAppDispatch } from 'hooks/redux';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDeleteTaskByIdMutation, useGetTasksQuery } from 'store/api/tasks';
import { setIsEdit, setIsOpen, setUpdatingTask } from 'store/taskSlice';
import cl from './Task.module.css';

interface ITaskListProps {
  _id: string;
  columnId: string;
  boardId: string;
}

const Task = memo<ITaskListProps>(({ _id, columnId, boardId }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [deleteTaskMutation] = useDeleteTaskByIdMutation();

  const { task } = useGetTasksQuery(
    { boardId, columnId },
    {
      selectFromResult: ({ data }) => ({
        task: data?.find((task) => task._id === _id),
      }),
    }
  );

  const openUpdatingModal = useCallback(async () => {
    if (!task) return;
    dispatch(setUpdatingTask(task));
    dispatch(setIsEdit(true));
    dispatch(setIsOpen(true));
  }, [task]);

  const deleteTask = () => {
    openConfirmModal({
      title: t('Delete column'),
      modalId: 'columnDeleteModal',
      centered: true,
      children: (
        <Text size="sm">
          {t('Are you sure you want to delete this column? This action is destructive.')}
        </Text>
      ),
      labels: { confirm: t('Delete task'), cancel: t('Cancel') },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        deleteTaskMutation({ _id, columnId, boardId });
      },
    });
  };

  if (!task) {
    console.log('Сolumn not found in cache!');
    return null;
  }

  const { title } = task;

  return (
    <Group className={cl.task}>
      <Button onClick={openUpdatingModal} classNames={ButtonClasses}>
        {title}
      </Button>
      <CloseButton onClick={deleteTask} size={24} className={cl.closeBtn} />
    </Group>
  );
});

const ButtonClasses = {
  root: cl.taskBtnWrapper,
  input: cl.taskBtn,
  inner: cl.taskBtnInner,
};

export default Task;
