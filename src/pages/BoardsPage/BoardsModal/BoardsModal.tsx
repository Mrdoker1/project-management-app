import React, { useEffect } from 'react';
import { setModalState, actionType } from 'store/boardsSlice';
import { Modal, Select, TextInput, Button, Textarea, ColorInput } from '@mantine/core';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useForm } from '@mantine/form';
import cl from './BoardsModal.module.css';
import {
  boards,
  useCreateBoardMutation,
  useGetBoardQuery,
  useUpdateBoardMutation,
} from 'store/api/boards';
import { useSelector } from 'react-redux';
import { useGetUsersQuery, users } from 'store/api/users';

const BoardsModal = () => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.boards.modal);
  useGetBoardQuery(modal.board.id);
  useGetUsersQuery();
  const getUsersSelector = users.endpoints.getUsers.select();
  const getBoardsSelector = boards.endpoints.getBoard.select(modal.board.id);
  const usersData = useSelector(getUsersSelector).data;
  const boardData = useSelector(getBoardsSelector).data;
  const [createBoard] = useCreateBoardMutation();
  const [updateBoard] = useUpdateBoardMutation();

  const usersList = usersData!.map((value) => {
    return {
      value: value.name,
      label: value.name,
      key: value._id,
    };
  });

  const values = {
    name: boardData!.title,
    description: boardData!.description,
    owner: boardData!.owner,
    color: boardData!.color,
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
          label="Name"
          placeholder="Name"
          {...form.getInputProps('name')}
        />
        <Select
          searchable
          classNames={inputClasses}
          label="Owner"
          placeholder="Select user"
          data={usersList}
          {...form.getInputProps('owner')}
        />
        <ColorInput
          classNames={inputClasses}
          label="Color"
          format="rgb"
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
