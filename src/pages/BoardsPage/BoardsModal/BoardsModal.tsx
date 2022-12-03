import React, { useEffect, useState } from 'react';
import { setModalState, actionType } from 'store/boardsSlice';
import { Modal, Select, TextInput, Button, Textarea, ColorInput } from '@mantine/core';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useForm } from '@mantine/form';
import cl from './BoardsModal.module.css';
import {
  useCreateBoardMutation,
  useGetBoardsQuery,
  useUpdateBoardMutation,
} from 'store/api/boards';
import { useGetUsersQuery } from 'store/api/users';
import { useTranslation } from 'react-i18next';

interface IBoardFormValues {
  title: string;
  description: string;
  owner: string;
  color: string;
}

const BoardsModal = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.boards.modal);
  const owner = useAppSelector((state) => state.profile._id);

  const [createBoard] = useCreateBoardMutation();
  const [updateBoard] = useUpdateBoardMutation();

  const { board } = useGetBoardsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      board: data?.find(({ _id }) => _id === modal.board.id),
    }),
  });

  const { usersList } = useGetUsersQuery(undefined, {
    selectFromResult: ({ data }) => ({
      usersList: data?.map(({ name, _id }) => ({ value: _id, label: name, key: _id })),
    }),
  });

  const [isSubmited, setIsSubmited] = useState(false);

  const form = useForm({
    initialValues,
    validate: {
      title: (value) => (value.length < 2 ? 'Board name must have at least 2 letters' : null),
      description: (value) => {
        if (value.length < 2) return 'Dscription must have at least 2 letters';
        if (value.length > 120) return 'Description must not exceed 120 letters';
        return null;
      },
    },
  });

  useEffect(() => {
    if (board && modal.type == 1) {
      const { title, description, owner, color } = board;

      const values = {
        title,
        description,
        owner,
        color,
      };

      form.setValues(values);
    } else form.setValues({ ...initialValues, owner });
  }, [board, modal.type, owner]);

  const formComponent = (
    <form
      className={cl.form}
      onSubmit={form.onSubmit(async (values) => {
        const { title, owner, description, color } = values;

        setIsSubmited(true);
        if (modal.type === 1) {
          try {
            await updateBoard({
              _id: modal.board.id,
              title,
              owner,
              description,
              color,
              users: [],
            }).unwrap();

            dispatch(setModalState(false));
          } catch (error) {
            console.error('rejected', error);
          }
        } else {
          try {
            await createBoard({
              title,
              owner,
              description,
              color,
              users: [],
            }).unwrap();

            dispatch(setModalState(false));
          } catch (error) {
            console.error('rejected', error);
          }
        }
        setIsSubmited(false);
      })}
    >
      <TextInput
        classNames={inputClasses}
        label={t('Board name')}
        placeholder={t('Board name')}
        {...form.getInputProps('title')}
      />
      <Select
        searchable
        classNames={inputClasses}
        label={t('Owner')}
        placeholder={t('Select user')}
        data={usersList ?? []}
        {...form.getInputProps('owner')}
      />
      <ColorInput
        classNames={inputClasses}
        label={t('Color')}
        format="rgb"
        placeholder={t('Select color')}
        {...form.getInputProps('color')}
      />
      <Textarea
        classNames={inputClasses}
        label={t('Description')}
        placeholder={t('Description')}
        maxLength={120}
        {...form.getInputProps('description')}
      />
      <Button className={cl.submit} type="submit" mt="sm" loading={isSubmited}>
        {modal.type === 1 ? t('Save') : t('Create')}
      </Button>
    </form>
  );

  return (
    <Modal
      centered
      opened={modal.opened}
      onClose={() => {
        dispatch(setModalState(false));
      }}
      title={modal.type === actionType.Edit ? t('Edit Board') : t('Create Board')}
    >
      {formComponent}
    </Modal>
  );
};

const initialValues: IBoardFormValues = {
  title: '',
  description: '',
  owner: '',
  color: 'rgb(140, 140, 140)',
};

const inputClasses = { input: cl.name, root: cl.inputWrapper, label: cl.label };

export default BoardsModal;
