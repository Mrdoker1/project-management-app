import { Button, MultiSelect, Select, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { memo, useEffect } from 'react';
import cl from './UpdateTaskContent.module.css';
import { useTranslation } from 'react-i18next';
import { useGetUsersQuery } from 'store/api/users';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { ITask } from 'interfaces/ITask';
import { useUpdateTaskByIdMutation } from 'store/api/tasks';
import { setIsOpen } from 'store/taskSlice';

interface ITaskFormValues {
  title: string;
  description: string;
  userId: string;
  users: string[];
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

  const updateTask = async (values: ITaskFormValues) => {
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
        if (value.length < 2) return 'Description must have at least 2 letters';
        if (value.length > 120) return 'Description must not exceed 120 letters';
        return null;
      },
      userId: (value) => (!value ? 'Select user' : null),
    },
  });

  useEffect(() => {
    if (!updatingTask) return;
    const { title, description, userId, users } = updatingTask;
    form.setValues({ title, description, userId, users });
  }, []);

  return (
    <form className={cl.form} onSubmit={form.onSubmit(updateTask)}>
      <TextInput
        data-autofocus
        classNames={inputClasses}
        label={t('Task name')}
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
      <MultiSelect
        searchable
        clearable
        classNames={inputClasses}
        label={t('Users')}
        nothingFound="Nothing found"
        maxSelectedValues={3}
        limit={20}
        maxDropdownHeight={160}
        transitionDuration={300}
        transition="pop-top-left"
        data={usersList ?? []}
        {...form.getInputProps('users')}
      />
      <Button type="submit" className={cl.submit} mt="sm" loading={isLoading}>
        {t('Save')}
      </Button>
    </form>
  );
});

const initialValues: ITaskFormValues = {
  title: '',
  description: '',
  userId: '',
  users: [],
};

const inputClasses = {
  input: cl.name,
  root: cl.inputWrapper,
  label: cl.label,
  value: cl.selectValue,
};

export default UpdateTaskContent;
