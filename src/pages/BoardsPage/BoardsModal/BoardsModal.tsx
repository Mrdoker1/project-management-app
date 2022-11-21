import React from 'react';
import { setModalState } from 'store/boardsSlice';
import { Modal, Select, TextInput, Button } from '@mantine/core';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useForm } from '@mantine/form';
import cl from './BoardsModal.module.css';

const BoardsModal = () => {
  const dispatch = useAppDispatch();
  const modalState = useAppSelector((state) => state.boards.modal.opened);

  const form = useForm({
    initialValues: { name: '', description: '' },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      description: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
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
          classNames={inputClasses}
          label="Assigned User"
          placeholder="Pick one"
          data={[
            { value: 'react', label: 'React' },
            { value: 'ng', label: 'Angular' },
            { value: 'svelte', label: 'Svelte' },
            { value: 'vue', label: 'Vue' },
          ]}
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
