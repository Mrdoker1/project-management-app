import { Button, Select, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { memo, useEffect } from 'react';
import cl from './UpdateTaskContent.module.css';
import { useTranslation } from 'react-i18next';
import { useGetUsersQuery } from 'store/api/users';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { ITask } from 'interfaces/ITask';
import { useUpdateTaskByIdMutation } from 'store/api/tasks';
import { setIsOpen } from 'store/taskSlice';

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

  const { usersList } = useGetUsersQuery(undefined, {
    selectFromResult: ({ data }) => ({
      usersList: data?.map(({ name, _id }) => ({ value: _id, label: name, key: _id })),
    }),
  });

  const updateTask = async (values: TaskFormValues) => {
    if (!updatingTask) return;
    const task: ITask = { ...updatingTask, ...values };
    await updateTaskMutation(task);
    dispatch(setIsOpen(false));
  };

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
      <Button type="submit" className={cl.submit} mt="sm" loading={isLoading}>
        {t('Update')}
      </Button>
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
