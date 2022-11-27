import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAppDispatch } from 'hooks/redux';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useCreateColumnMutation, useGetColumnsQuery } from 'store/api/columns';
import { setIsOpen } from 'store/columnSlice';
import cl from './ModalContent.module.css';

export interface ColumnFormValues {
  name: string;
}

const ModalContent = memo(() => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [createColumnMutation, { isLoading }] = useCreateColumnMutation();

  const boardId = useParams<{ id: string }>().id;
  if (!boardId) throw new Error('Unable get id from url!');
  const { data: columns } = useGetColumnsQuery(boardId);

  const createColumn = async (values: ColumnFormValues) => {
    const title = values.name;
    const order = columns?.length || 0;
    await createColumnMutation({ title, order, boardId });
    dispatch(setIsOpen(false));
  };

  const form = useForm({
    initialValues,
    validate: {
      name: (value) => (value.length < 3 ? 'Board name must have at least 3 letters' : null),
    },
  });

  return (
    <form className={cl.form} onSubmit={form.onSubmit(createColumn)}>
      <TextInput
        data-autofocus
        classNames={inputClasses}
        label={t('Column name')}
        //placeholder={t('Column name')}
        {...form.getInputProps('name')}
      />
      <Button className={cl.submit} type="submit" mt="sm" loading={isLoading}>
        {t('Create')}
      </Button>
    </form>
  );
});

const initialValues: ColumnFormValues = {
  name: '',
};

const inputClasses = { input: cl.name, root: cl.inputWrapper, label: cl.label };

export default ModalContent;
