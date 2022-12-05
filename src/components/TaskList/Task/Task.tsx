import { Button, CloseButton, Group, Text } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDeleteTaskByIdMutation, useUpdateTasksSetMutation } from 'store/api/tasks';
import { setIsEdit, setIsOpen, setUpdatingTask } from 'store/taskSlice';
import cl from './Task.module.css';
import { ITask } from 'interfaces/ITask';
import { setTasks } from 'store/taskListSlice';
import { IconX } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';

interface ITaskListProps {
  _id: string;
  index: number;
  columnId: string;
  boardId: string;
  data: ITask;
}

const reorderDelete = (sourceArray: Array<ITask>, order: number) => {
  const a = [...sourceArray];
  a.splice(order, 1);
  return a.map((t: ITask, index) => ({ ...t, order: index }));
};

const Task = memo<ITaskListProps>(({ _id, index, columnId, boardId, data }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [deleteTaskMutation] = useDeleteTaskByIdMutation();
  const [updateTasksMutation] = useUpdateTasksSetMutation();
  const tasksListState = useAppSelector((state) => state.taskList);

  const openUpdatingModal = useCallback(async () => {
    if (!data) return;
    dispatch(setUpdatingTask(data));
    dispatch(setIsEdit(true));
    dispatch(setIsOpen(true));
  }, [data]);

  const deleteTask = () => {
    openConfirmModal({
      title: t('Delete task'),
      modalId: 'taskDeleteModal',
      centered: true,
      children: (
        <Text size="sm">
          {t('Are you sure you want to delete this task? This action is destructive.')}
        </Text>
      ),
      labels: { confirm: t('Delete task'), cancel: t('Cancel') },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        const updatedTaskList = reorderDelete(tasksListState[boardId][columnId], data.order);
        deleteTaskMutation({ _id, columnId, boardId });
        updateTasksMutation(
          updatedTaskList.map((t: ITask) => ({
            _id: t._id,
            order: t.order,
            columnId: t.columnId,
          }))
        );
        dispatch(setTasks({ boardID: boardId, columnID: columnId, array: updatedTaskList }));
      },
    });
  };

  if (!data) {
    showNotification({
      title: 'Data Error!',
      message: 'Task not found in cache!',
      color: 'red',
      icon: <IconX size={18} />,
      styles: () => ({
        root: { backgroundColor: '#101113', border: '1px solid #343A40' },
        title: { color: '#fff' },
        description: { color: '#fff' },
      }),
    });
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
