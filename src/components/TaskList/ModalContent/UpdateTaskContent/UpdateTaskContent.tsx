import { Button, Group, Select, Text, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { memo, useEffect } from 'react';
import cl from './UpdateTaskContent.module.css';
import { useTranslation } from 'react-i18next';
import { useGetUsersQuery } from 'store/api/users';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { ITask } from 'interfaces/ITask';
import { useDeleteTaskByIdMutation, useUpdateTaskByIdMutation } from 'store/api/tasks';
import { setIsOpen } from 'store/taskSlice';
import { openConfirmModal } from '@mantine/modals';

interface TaskFormValues {
  title: string;
  description: string;
  userId: string;
}

const UpdateTaskContent = memo(() => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const updatingTask = useAppSelector((state) => state.task.updatingTask);
  const [updateTaskMutation, { isLoading }] = useUpdateTaskByIdMutation();
  const [deleteTaskMutation] = useDeleteTaskByIdMutation();

  const { usersList } = useGetUsersQuery(undefined, {
    selectFromResult: ({ data }) => ({
      usersList: data?.map(({ name, _id }) => ({ value: name, label: name, key: _id })),
    }),
  });

  const updateTask = async (values: TaskFormValues) => {
    if (!updatingTask) return;
    const task: ITask = { ...updatingTask, ...values };
    await updateTaskMutation(task);
    dispatch(setIsOpen(false));
  };

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
        if (!updatingTask) return;
        const { _id, columnId, boardId } = updatingTask;
        deleteTaskMutation({ _id, columnId, boardId });
        dispatch(setIsOpen(false));
      },
    });
  };

  // const closeModal = () => {
  //   dispatch(setIsOpen(false));
  // };

  const form = useForm({
    initialValues,
    validate: {
      title: (value) => (value.length < 3 ? 'Board name must have at least 3 letters' : null),
      description: (value) => {
        if (value.length < 2) return 'Dscription must have at least 2 letters';
        if (value.length > 120) return 'Description must not exceed 120 letters';
        return null;
      },
      userId: (value) => (!value ? 'Select user' : null),
    },
  });

  useEffect(() => {
    if (!updatingTask) return;
    const { title, description, userId } = updatingTask;
    form.setValues({ title, description, userId });
  }, []);

  return (
    <form className={cl.form} onSubmit={form.onSubmit(updateTask)}>
      <TextInput
        data-autofocus
        classNames={inputClasses}
        label={t('Column name')}
        {...form.getInputProps('title')}
      />
      <Textarea
        classNames={inputClasses}
        label={t('Description')}
        maxLength={120}
        {...form.getInputProps('description')}
      />
      <Select
        searchable
        classNames={inputClasses}
        label={t('Owner')}
        data={usersList ?? []}
        {...form.getInputProps('userId')}
      />
      <Group align="center" position="center">
        <Button type="submit" className={cl.submit} mt="sm" loading={isLoading}>
          {t('Update')}
        </Button>
        <Button className={cl.submit} mt="sm" onClick={deleteTask}>
          {t('Delete')}
        </Button>
      </Group>
    </form>
  );
});

const initialValues: TaskFormValues = {
  title: '',
  description: '',
  userId: '',
};

const inputClasses = { input: cl.name, root: cl.inputWrapper, label: cl.label };

export default UpdateTaskContent;
