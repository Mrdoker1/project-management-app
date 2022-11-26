import React, { useCallback, useEffect, useState } from 'react';
import { memo } from 'react';
import { useGetBoardsQuery, useDeleteBoardMutation } from 'store/api/boards';
import { Button, CloseButton, Text } from '@mantine/core';
import { useAppDispatch } from 'hooks/redux';
import { useHover } from '@mantine/hooks';
import cl from './Board.module.css';
import { useNavigate } from 'react-router-dom';
import { actionType, setModalBoardId, setModalState, setModalType } from 'store/boardsSlice';
import { closeModal, openConfirmModal } from '@mantine/modals';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface IBoardProps {
  id: string;
}

const Board = memo<IBoardProps>(({ id }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { hovered, ref } = useHover();
  const navigate = useNavigate();
  const [deleteBoard] = useDeleteBoardMutation();
  const { board } = useGetBoardsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      board: data?.find((board) => board._id === id),
    }),
  });

  const [gradient, setGradient] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);

  const boardStyle = {
    position: 'relative',
    boxSizing: 'border-box',
    backgroundClip: 'padding-box',
    border: 'solid 1px transparent',
  } as React.CSSProperties;

  const gradientStyle = {
    content: '""',
    position: 'absolute',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    zIndex: '-1',
    margin: '-1px',
    borderRadius: 'inherit',
    background: gradient,
  } as React.CSSProperties;

  useEffect(() => {
    if (board) {
      const rgba = `rgba${board.color.slice(3, board.color.length - 1)}, 1)`;
      const rgbaZero = `rgba${board.color.slice(3, board.color.length - 1)}, 0)`;
      const gradient = `linear-gradient(180deg, ${rgba}, 30%, ${rgbaZero})`;
      setGradient(gradient);
    }
  }, [board]);

  const openBoardHeandler = useCallback(() => {
    navigate(`/board/${id}`);
  }, []);

  const editBoardHeandler = useCallback(async () => {
    dispatch(setModalState(true));
    dispatch(setModalType(actionType.Edit));
    dispatch(setModalBoardId(id));
    console.log(id);
  }, []);

  const deleteBoardHandler = useCallback(() => {
    openConfirmModal({
      title: t('Delete board'),
      modalId: 'boardDeleteModal',
      centered: true,
      closeOnConfirm: false,
      children: (
        <Text size="sm">
          {t('Are you sure you want to delete this board? This action is destructive.')}
        </Text>
      ),
      labels: { confirm: t('Delete board'), cancel: t('Cancel') },
      confirmProps: { color: 'red', loading: isDeleted },
      onCancel: () => console.log('Cancel'),
      onConfirm: async () => {
        setIsDeleted(true);
        await deleteBoard(id);
        closeModal('boardDeleteModal');
      },
    });
  }, []);

  if (!board) {
    console.log('Board not found in cache!');
    return null;
  }

  const hoverLayout = (
    <>
      <CloseButton
        size={24}
        onClick={deleteBoardHandler}
        className={cl.deleteBtn}
        aria-label="Close modal"
        title="Delete Board"
      />
      <h4 className={cl.boardTitle}>{board.title}</h4>
      <p className={cl.boardDescription}>{board.description}</p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={cl.buttons}
      >
        <Button onClick={openBoardHeandler} className={cl.button}>
          {t('Open Board')}
        </Button>
        <Button onClick={editBoardHeandler} className={cl.button}>
          {t('Edit')}
        </Button>
      </motion.div>
    </>
  );

  const defaultLayout = (
    <>
      <h4 className={cl.boardTitle}>{board.title}</h4>
      <p className={cl.boardDescription}>{board.description}</p>
    </>
  );

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        ref={ref}
        style={boardStyle}
        className={`${cl.board}`}
      >
        {hovered ? hoverLayout : defaultLayout}
        <motion.div style={gradientStyle}></motion.div>
      </motion.div>
    </>
  );
});

export default Board;
