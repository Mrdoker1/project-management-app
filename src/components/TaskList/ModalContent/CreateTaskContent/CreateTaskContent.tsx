import { Button, Loader, MultiSelect, Select, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { memo, useEffect } from 'react';
import cl from './CreateTaskContent.module.css';
import { useTranslation } from 'react-i18next';
import { useGetUsersQuery } from 'store/api/users';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { ITask } from 'interfaces/ITask';
import { useCreateTaskMutation } from 'store/api/tasks';
import { setIsOpen } from 'store/taskSlice';
import { addTask } from 'store/taskListSlice';

interface TaskFormValues {
  title: string;
  description: string;
  userId: string;
  users: string[];
}

const CreateTaskContent = memo(() => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const creatingTask = useAppSelector((state) => state.task.creatingTask);
  const currentUserId = useAppSelector((state) => state.profile._id);

  const { usersList } = useGetUsersQuery(undefined, {
    selectFromResult: ({ data }) => ({
      usersList: data?.map(({ name, _id }) => ({ value: _id, label: name, key: _id })),
    }),
  });

  const [createTaskMutation, { isLoading }] = useCreateTaskMutation();

  const createTask = async (values: TaskFormValues) => {
    if (!creatingTask) return;
    const task: Omit<ITask, '_id'> = { ...creatingTask, ...values };
    const response = await createTaskMutation(task).unwrap();

    if (response) {
      dispatch(
        addTask({
          boardID: task.boardId,
          columnID: task.columnId,
          task: response,
        })
      );
    }
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
    form.setValues({
      userId: currentUserId,
    });
  }, []);

  if (!usersList?.length) return <Loader style={{ width: '100%' }} color="dark" />;

  return (
    <form className={cl.form} onSubmit={form.onSubmit(createTask)}>
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
        limit={20}
        maxDropdownHeight={160}
        data={usersList ?? []}
        {...form.getInputProps('userId')}
      />
      <MultiSelect
        searchable
        clearable
        classNames={inputClasses}
        label={t('Assigned users')}
        limit={20}
        maxDropdownHeight={160}
        data={usersList ?? []}
        {...form.getInputProps('users')}
      />
      <Button type="submit" className={cl.submit} mt="sm" loading={isLoading}>
        {t('Create')}
      </Button>
    </form>
  );
});

const initialValues: TaskFormValues = {
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
  dropdown: cl.dropdown,
  item: cl.dropdownItem,
};

export default CreateTaskContent;
