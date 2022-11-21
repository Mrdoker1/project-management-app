import React from 'react';
import { setModalState } from 'store/boardsSlice';
import { Modal } from '@mantine/core';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useForm } from '@mantine/form';
import { TextInput, Button } from '@mantine/core';
import cl from './BoardsModal.module.css';

const BoardsModal = () => {
  const dispatch = useAppDispatch();
  const modalState = useAppSelector((state) => state.boards.modal.opened);

  const form = useForm({
    initialValues: { name: '', email: '', age: 0 },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      age: (value) => (value < 18 ? 'You must be at least 18 to register' : null),
    },
  });

  return (
    <Modal
      centered
      opened={modalState}
      onClose={() => {
        dispatch(setModalState(false));
      }}
      title="Edit Board"
    >
      <form onSubmit={form.onSubmit(console.log)}>
        <TextInput
          classNames={inputClasses}
          label="Description"
          placeholder="Description"
          {...form.getInputProps('Description')}
        />
        <TextInput
          classNames={inputClasses}
          label="Email"
          placeholder="Email"
          {...form.getInputProps('email')}
        />
        <Button className={cl.submit} type="submit" mt="sm">
          Save
        </Button>
      </form>
    </Modal>
  );
};

const inputClasses = { input: cl.name, root: cl.inputWrapper, label: cl.label };

export default BoardsModal;
