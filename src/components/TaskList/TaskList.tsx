import { Button, Flex, Loader, Modal } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetTasksQuery } from 'store/api/tasks';
import Task from './Task/Task';
import cl from './TaskList.module.css';

interface ITaskListProps {
  columnId: string;
  boardId: string;
}

const TaskList = memo<ITaskListProps>(({ boardId, columnId }) => {
  const { t } = useTranslation();
  const { data: tasks, isFetching, error } = useGetTasksQuery({ boardId, columnId });

  if (typeof error == 'number') return <div>{`${t('Ошибка ')} ${error}`}</div>;
  if (isFetching) return <Loader style={{ width: '100%' }} color="dark" />;
  if (!tasks) return <div>{t('Ничего не найдено!')}</div>;

  return (
    <Flex className={cl.task} gap={{ base: 'xs', sm: 'sm' }}>
      {tasks.map((task) => (
        <Task _id={task._id} boardId={boardId} columnId={columnId} key={task._id} />
      ))}
      <Button
        //onClick={createBoardHeandler}
        leftIcon={<IconPlus />}
        classNames={ButtonClasses}
      >
        {t('Add task')}
      </Button>
      {/* <Modal centered opened={isOpen} title={t('Create Board')} onClose={closeModal}>
        <ModalContent />
      </Modal> */}
    </Flex>
  );
});

const ButtonClasses = {
  root: cl.taskBtnWrapper,
  input: cl.taskBtn,
};

export default TaskList;
