import { Button, Group, Select, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { memo, useEffect } from 'react';
import cl from './CreateTaskContent.module.css';
import { useTranslation } from 'react-i18next';
import { useGetUsersQuery } from 'store/api/users';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { ITask } from 'interfaces/ITask';
import { useCreateTaskMutation } from 'store/api/tasks';
import { setIsOpen } from 'store/taskSlice';

interface TaskFormValues {
  title: string;
  description: string;
  userId: string;
}

const CreateTaskContent = memo(() => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const creatingTask = useAppSelector((state) => state.task.creatingTask);
  const currentUserName = useAppSelector((state) => state.profile.name);

  const { usersList } = useGetUsersQuery(undefined, {
    selectFromResult: ({ data }) => ({
      usersList: data?.map(({ name, _id }) => ({ value: name, label: name, key: _id })),
    }),
  });

  const [createTaskMutation, { isLoading }] = useCreateTaskMutation();

  const createTask = async (values: TaskFormValues) => {
    if (!creatingTask) return;
    const task: Omit<ITask, '_id'> = { ...values, ...creatingTask, users: [] };
    await createTaskMutation(task);
    dispatch(setIsOpen(false));
  };

  const closeModal = () => {
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
    form.setValues({ userId: currentUserName });
  }, []);

  return (
    <form className={cl.form} onSubmit={form.onSubmit(createTask)}>
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
          {t('Create')}
        </Button>
        <Button className={cl.submit} mt="sm" onClick={closeModal}>
          {t('Cancel')}
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

export default CreateTaskContent;
