import React, { useCallback } from 'react';
import { memo } from 'react';
import { useGetBoardsQuery, useDeleteBoardMutation } from 'store/api/boards';
import { Button, CloseButton } from '@mantine/core';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useHover } from '@mantine/hooks';
import cl from './Board.module.css';
import { useNavigate } from 'react-router-dom';
import { setModal, actionType } from 'store/boardsSlice';

interface IBoardProps {
  id: string;
}

const Board = memo<IBoardProps>(({ id }) => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.boards.modal);
  const { hovered, ref } = useHover();
  const navigate = useNavigate();
  const [deleteBoard] = useDeleteBoardMutation();
  const { board } = useGetBoardsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      board: data?.find((board) => board._id === id),
    }),
  });

  const openBoardHeandler = useCallback(() => {
    navigate(`/board/${id}`);
  }, []);

  const editBoardHeandler = useCallback(async () => {
    dispatch(
      setModal({
        boardData: board,
        state: true,
        type: actionType.Edit,
      })
    );
    console.log(id);
  }, []);

  const deleteBoardHeandler = useCallback(() => {
    deleteBoard(id);
  }, []);

  if (!board) {
    console.log('Board not found in cache!');
    return null;
  }

  const hoverLayout = (
    <>
      <CloseButton
        size={24}
        onClick={deleteBoardHeandler}
        className={cl.deleteBtn}
        aria-label="Close modal"
        title="back to home"
      />
      <h4 className={cl.boardTitle}>{board.title}</h4>
      <p className={cl.boardDescription}>{board.owner}</p>
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
      <p className={cl.boardDescription}>{board.owner}</p>
    </>
  );

  return (
    <div ref={ref} className={`${cl.board} ${cl.gradientBorder}`}>
      {hovered ? hoverLayout : defaultLayout}
    </div>
  );
});

export default Board;
