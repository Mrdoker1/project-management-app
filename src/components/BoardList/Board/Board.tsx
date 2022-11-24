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

interface IBoardProps {
  id: string;
}

const Board = memo<IBoardProps>(({ id }) => {
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
      console.log(gradient);
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
    let isLoading = false;
    openConfirmModal({
      title: 'Delete board',
      modalId: 'boardDeleteModal',
      centered: true,
      closeOnConfirm: false,
      children: (
        <Text size="sm">
          Are you sure you want to delete this board? This action is destructive.
        </Text>
      ),
      labels: { confirm: 'Delete board', cancel: 'Cancel' },
      confirmProps: { color: 'red', loading: isLoading },
      onCancel: () => console.log('Cancel'),
      onConfirm: async () => {
        isLoading = true;
        console.log(isLoading);
        await deleteBoard(id);
        closeModal('boardDeleteModal');
        isLoading = false;
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
      <div className={cl.buttons}>
        <Button onClick={openBoardHeandler} className={cl.button}>
          Open Board
        </Button>
        <Button onClick={editBoardHeandler} className={cl.button}>
          Edit
        </Button>
      </div>
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
      <div ref={ref} style={boardStyle} className={`${cl.board}`}>
        {hovered ? hoverLayout : defaultLayout}
        <div style={gradientStyle}></div>
      </div>
    </>
  );
});

export default Board;
