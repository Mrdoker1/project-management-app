import React from 'react';
import { useGetBoardsQuery } from 'store/api';
import Board from './Board/Board';

const BoardList = () => {
  const { data: boards, isLoading, error } = useGetBoardsQuery();

  if (typeof error == 'number') return <div>Ошибка {error}</div>;
  if (isLoading) return <div>Загрузка...</div>;
  if (!boards) return <div>Ничего не найдено!</div>;
  return (
    <div>
      {boards.map((board) => (
        <Board id={board._id} key={board._id} />
      ))}
    </div>
  );
};

export default BoardList;
