import React, { useEffect } from 'react';
import { setModalState, actionType } from 'store/boardsSlice';
import { Modal, Select, TextInput, Button } from '@mantine/core';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useForm } from '@mantine/form';
import cl from './BoardsModal.module.css';
import { useCreateBoardMutation, useUpdateBoardMutation } from 'store/api/boards';

const BoardsModal = () => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.boards.modal);
  const [createBoard] = useCreateBoardMutation();
  const [updateBoard] = useUpdateBoardMutation();

  const users = modal.boardData.users.map((value) => {
    return {
      value: value,
      label: value,
    };
  });

  const values = {
    name: modal.boardData.title,
    description: modal.boardData._id,
    owner: modal.boardData.owner,
  };

  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      owner: '',
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      description: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
    },
  });

  return (
    <Modal
      centered
      opened={modal.opened}
      onClose={() => {
        dispatch(setModalState(false));
      }}
      title={modal.type === actionType.Edit ? 'Edit Board' : 'Create Board'}
    >
      <form
        onSubmit={form.onSubmit(async (values) => {
          if (modal.type === 1) {
            try {
              await updateBoard({
                _id: modal.boardData._id,
                title: values.name,
                owner: values.owner,
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
                users: modal.boardData.users,
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
          label="Name"
          placeholder="Name"
          {...form.getInputProps('name')}
        />
        <TextInput
          classNames={inputClasses}
          label="Description"
          placeholder="Description"
          {...form.getInputProps('description')}
        />
        <Select
          searchable
          classNames={inputClasses}
          label="Users"
          placeholder="Select user"
          data={users}
          {...form.getInputProps('owner')}
        />
        <Button className={cl.submit} type="submit" mt="sm">
          {modal.type === 1 ? 'Save' : 'Create'}
        </Button>
      </form>
    </Modal>
  );
};

const inputClasses = { input: cl.name, root: cl.inputWrapper, label: cl.label };

export default BoardsModal;
