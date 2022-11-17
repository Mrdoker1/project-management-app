import React from 'react';
import { useGetBoardsQuery } from 'store/api';
import { memo } from 'react';
import cl from './Board.module.css';

interface IBoardProps {
  id: string;
}

const Board = memo<IBoardProps>(({ id }) => {
  const { board } = useGetBoardsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      board: data?.find((board) => board._id === id),
    }),
  });

  if (!board) {
    console.error('Board not found in cache!');
    return null;
  }
  return (
    <div className={cl.board}>
      <h3>{board._id + '. ' + board.title}</h3>
    </div>
  );
});

export default Board;
