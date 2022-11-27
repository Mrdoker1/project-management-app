import { Button, CloseButton, Group } from '@mantine/core';
import React, { memo } from 'react';
import { useGetTasksQuery } from 'store/api/tasks';
import cl from './Task.module.css';

interface ITaskListProps {
  _id: string;
  columnId: string;
  boardId: string;
}

const Task = memo<ITaskListProps>(({ _id, columnId, boardId }) => {
  const { task } = useGetTasksQuery(
    { boardId, columnId },
    {
      selectFromResult: ({ data }) => ({
        task: data?.find((task) => task._id === _id),
      }),
    }
  );

  if (!task) {
    console.log('Сolumn not found in cache!');
    return null;
  }

  const { title } = task;

  return (
    <Group className={cl.task}>
      <Button classNames={ButtonClasses}>{title}</Button>
      <CloseButton />
    </Group>
  );
});

const ButtonClasses = {
  root: cl.taskBtnWrapper,
  input: cl.taskBtn,
};

export default Task;
