import React, { useCallback } from 'react';
import { memo } from 'react';
import { useGetBoardsQuery, useDeleteBoardMutation } from 'store/api/boards';
import { Button, CloseButton } from '@mantine/core';
import { useAppDispatch } from 'hooks/redux';
import { useHover } from '@mantine/hooks';
import cl from './Board.module.css';
import { useNavigate } from 'react-router-dom';
import { setModal, actionType } from 'store/boardsSlice';
import { createUseStyles } from 'react-jss';
import { Theme, makeStyles } from 'jss-theme';

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

  const background = () => {
    const rgba = `rgba${board!.color.slice(3, board!.color.length - 1)}, 1)`;
    const rgbaZero = `rgba${board!.color.slice(3, board!.color.length - 1)}, 0)`;
    return `linear-gradient(to bottom, ${rgba}, ${rgbaZero})`;
  };

  const useStyles = createUseStyles({
    gradientBorder: () => ({
      position: 'relative',
      boxSizing: 'border-box',
      backgroundClip: 'padding-box',
      border: 'solid 1px transparent',
      '&:before': {
        content: '""',
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        zIndex: '-1',
        margin: '-1px',
        borderRadius: 'inherit',
        background: background(),
      },
    }),
  });

  const classes = useStyles();

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
    <div ref={ref} className={`${cl.board} ${classes.gradientBorder}`}>
      {hovered ? hoverLayout : defaultLayout}
    </div>
  );
});

export default Board;
