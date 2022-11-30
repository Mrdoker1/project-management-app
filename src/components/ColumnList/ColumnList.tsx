import { Button, Flex, Loader, Modal } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useGetColumnsQuery } from 'store/api/columns';
import { setIsOpen } from 'store/columnSlice';
import Column from './Column/Column';
import cl from './ColumnList.module.css';
import ModalContent from './ModalContent/ModalContent';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import 'overlayscrollbars/overlayscrollbars.css';

const ColumnList = memo(() => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.column.isOpen);

  const { t } = useTranslation();
  const boardId = useParams<{ id: string }>().id;
  if (!boardId) throw new Error('Unable get id from url!');

  const { data: columns, isFetching, error } = useGetColumnsQuery(boardId);

  const closeModal = useCallback(() => {
    dispatch(setIsOpen(false));
  }, []);

  const openModal = useCallback(() => {
    dispatch(setIsOpen(true));
  }, []);

  if (typeof error == 'number') return <div>{`${t('Ошибка ')} ${error}`}</div>;
  if (isFetching) return <Loader style={{ width: '100%' }} color="dark" />;
  if (!columns) return <div>{t('Ничего не найдено!')}</div>;

  return (
    <>
      <OverlayScrollbarsComponent
        className={cl.scroll}
        defer
        options={{
          scrollbars: { autoHide: 'scroll', theme: 'board-scroll' },
          overflow: {
            y: 'hidden',
            x: 'scroll',
          },
        }}
      >
        <Flex className={cl.row} gap={{ base: 'sm', sm: 'lg' }}>
          {columns.map((column) => (
            <Column _id={column._id} boardId={boardId} key={column._id} />
          ))}
          <Button
            onClick={openModal}
            radius={17}
            fullWidth={true}
            variant="outline"
            type="submit"
            leftIcon={<IconPlus size={20} />}
            classNames={ButtonClasses}
          >
            {t('Add column')}
          </Button>
        </Flex>
      </OverlayScrollbarsComponent>
      <Modal centered opened={isOpen} title={t('Create Board')} onClose={closeModal}>
        <ModalContent />
      </Modal>
    </>
  );
});

const ButtonClasses = {
  input: cl.columnBtn,
  root: cl.columnBtnWrapper,
  inner: cl.columnBtnInner,
};

export default ColumnList;
