import React, { useEffect, useState } from 'react';
import { setModalState, actionType } from 'store/boardsSlice';
import { Modal, Select, TextInput, Button, Textarea, ColorInput, Loader } from '@mantine/core';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useForm } from '@mantine/form';
import cl from './BoardsModal.module.css';
import { useCreateBoardMutation, useGetBoardQuery, useUpdateBoardMutation } from 'store/api/boards';
import { useGetUsersQuery } from 'store/api/users';
import { useTranslation } from 'react-i18next';

const BoardsModal = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.boards.modal);

  const [createBoard] = useCreateBoardMutation();
  const [updateBoard] = useUpdateBoardMutation();

  const { data: board, isFetching } = useGetBoardQuery(modal.board.id);
  const { data: users } = useGetUsersQuery();

  const defaultValues = {
    name: '',
    description: '',
    owner: modal.type == 2 ? 'Mask' : '',
    color: '',
  };

  const [usersList, setUsers] = useState([{ value: '', label: '', key: '' }]);
  const [boardData, setBoard] = useState(defaultValues);

  const form = useForm({
    initialValues: boardData,
    validate: {
      name: (value) => (value.length < 2 ? 'Board name must have at least 2 letters' : null),
      description: (value) => {
        if (value.length < 2) return 'Dscription must have at least 2 letters';
        if (value.length > 120) return 'Description must not exceed 120 letters';
        return null;
      },
    },
  });

  useEffect(() => {
    if (users) {
      const usersData = users.map((value) => {
        return { value: value.name, label: value.name, key: value._id };
      });
      setUsers(usersData);
    }

    if (board) {
      const values = {
        name: board.title,
        description: board.description,
        owner: board.owner,
        color: board.color,
      };
      modal.type == 1 ? form.setValues(values) : form.setValues(defaultValues);
      setBoard(values);
    }
  }, [board, modal]);

  const formComponent = (
    <form
      className={cl.form}
      onSubmit={form.onSubmit(async (values) => {
        if (modal.type === 1) {
          try {
            await updateBoard({
              _id: modal.board.id,
              title: values.name,
              owner: values.owner,
              description: values.description,
              color: values.color,
              users: [],
            }).unwrap();
            dispatch(setModalState(false));
          } catch (error) {
            console.error('rejected', error);
          }
        } else {
          try {
            await createBoard({
              title: values.name,
              owner: values.owner,
              description: values.description,
              color: values.color ? values.color : 'rgb(140, 140, 140)',
              users: [],
            }).unwrap();
            dispatch(setModalState(false));
          } catch (error) {
            console.error('rejected', error);
          }
        }
      })}
    >
      <TextInput
        classNames={inputClasses}
        label={t('Board name')}
        placeholder={t('Board name')}
        {...form.getInputProps('name')}
      />
      <Select
        searchable
        classNames={inputClasses}
        label={t('Owner')}
        placeholder={t('Select user')}
        data={usersList}
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
      <Button className={cl.submit} type="submit" mt="sm">
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
      {isFetching ? <Loader color="dark" /> : formComponent}
    </Modal>
  );
};

const inputClasses = { input: cl.name, root: cl.inputWrapper, label: cl.label };

export default BoardsModal;
