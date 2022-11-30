import { Modal } from '@mantine/core';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { setIsOpen } from 'store/taskSlice';
import CreateTaskContent from './CreateTaskContent/CreateTaskContent';
import UpdateTaskContent from './UpdateTaskContent/UpdateTaskContent';

const ModalContent = memo(() => {
  const { t } = useTranslation();
  const isOpen = useAppSelector((state) => state.task.isOpen);
  const isEdit = useAppSelector((state) => state.task.isEdit);
  const title = isEdit ? 'Update task' : 'Create task';
  const dispatch = useAppDispatch();

  const closeModal = useCallback(() => {
    dispatch(setIsOpen(false));
  }, []);

  return (
    <Modal overlayOpacity={0.4} centered opened={isOpen} title={t(title)} onClose={closeModal}>
      {isEdit ? <UpdateTaskContent /> : <CreateTaskContent />}
    </Modal>
  );
});

export default ModalContent;
