import { Space } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import ColumnList from 'components/ColumnList/ColumnList';
import ColumnModal from './ColumnModal/ColumnModal';
import BoardHeader from './BoardHeader/BoardHeader';
import { useGetBoardsQuery } from 'store/api/boards';
import { useLocation } from 'react-router-dom';
import cl from './BoardPage.module.css';

const BoardPage = () => {
  const location = useLocation();
  const path = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
  const [gradient, setGradient] = useState('');
  const { board } = useGetBoardsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      board: data?.find((board) => board._id === path),
    }),
  });

  useEffect(() => {
    if (board) {
      const rgba = `rgba${board.color.slice(3, board.color.length - 1)}, 0)`;
      const rgbaZero = `rgba${board.color.slice(3, board.color.length - 1)}, 0.3)`;
      const gradient = `linear-gradient(180deg, ${rgba}, 50%, ${rgbaZero})`;
      setGradient(gradient);
    }
  }, [board]);

  return (
    <main className="main">
      <section style={{ background: gradient }} className={cl.splash}>
        <div className="container page-wrapper fullsize flex-column">
          <BoardHeader />
          <ColumnList />
          <Space h={20} />
        </div>
        <ColumnModal />
      </section>
    </main>
  );
};

export default BoardPage;
