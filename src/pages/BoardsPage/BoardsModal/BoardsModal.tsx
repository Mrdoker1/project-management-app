import React, { useEffect } from 'react';
import { setModalState, actionType } from 'store/boardsSlice';
import { Modal, Select, TextInput, Button, Textarea, ColorInput } from '@mantine/core';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useForm } from '@mantine/form';
import cl from './BoardsModal.module.css';
import { useCreateBoardMutation, useUpdateBoardMutation } from 'store/api/boards';

const BoardsModal = () => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.boards.modal);
  const usersData = useAppSelector((state) => state.users.users);
  const [createBoard] = useCreateBoardMutation();
  const [updateBoard] = useUpdateBoardMutation();

  const users = usersData.map((value) => {
    return {
      value: value.name,
      label: value.name,
      key: value._id,
    };
  });

  const values = {
    name: modal.boardData.title,
    description: modal.boardData.description,
    owner: modal.boardData.owner,
    color: modal.boardData.color,
  };

  const form = useForm({
    initialValues: values,
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      description: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
    },
  });

  useEffect(() => {
    form.setValues(values);
  }, [modal]);

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
        className={cl.form}
        onSubmit={form.onSubmit(async (values) => {
          if (modal.type === 1) {
            try {
              await updateBoard({
                _id: modal.boardData._id,
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
                color: values.color,
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
          label="Name"
          placeholder="Name"
          {...form.getInputProps('name')}
        />
        <Select
          searchable
          classNames={inputClasses}
          label="Owner"
          placeholder="Select user"
          data={users}
          {...form.getInputProps('owner')}
        />
        <ColorInput
          classNames={inputClasses}
          label="Color"
          placeholder="Select color"
          {...form.getInputProps('color')}
        />
        <Textarea
          classNames={inputClasses}
          label="Description"
          placeholder="Description"
          {...form.getInputProps('description')}
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
