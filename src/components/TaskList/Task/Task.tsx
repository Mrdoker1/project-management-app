import { Button, CloseButton, Group, Text } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { useAppDispatch } from 'hooks/redux';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDeleteTaskByIdMutation } from 'store/api/tasks';
import { setIsEdit, setIsOpen, setUpdatingTask } from 'store/taskSlice';
import cl from './Task.module.css';
import { ITask } from 'interfaces/ITask';

interface ITaskListProps {
  _id: string;
  index: number;
  columnId: string;
  boardId: string;
  data: ITask;
}

const Task = memo<ITaskListProps>(({ _id, index, columnId, boardId, data }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [deleteTaskMutation] = useDeleteTaskByIdMutation();

  const openUpdatingModal = useCallback(async () => {
    if (!data) return;
    dispatch(setUpdatingTask(data));
    dispatch(setIsEdit(true));
    dispatch(setIsOpen(true));
  }, [data]);

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

  if (!data) {
    console.log('Сolumn not found in cache!');
    return null;
  }

  const { title } = data;

  return (
    <Group className={cl.task}>
      <Button classNames={ButtonClasses}>
        <div onClick={openUpdatingModal}>{title}</div>
      </Button>
      <CloseButton onClick={deleteTask} size={24} className={cl.closeBtn} />
    </Group>
  );
});

const ButtonClasses = {
  root: cl.taskBtnWrapper,
  input: cl.taskBtn,
  inner: cl.taskBtnInner,
  label: cl.taskBtnLabel,
};

export default Task;
