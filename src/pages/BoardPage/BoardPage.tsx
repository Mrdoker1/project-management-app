import { Space } from '@mantine/core';
import React from 'react';
import ColumnList from 'components/ColumnList/ColumnList';
import ColumnModal from './ColumnModal/ColumnModal';
import BoardHeader from './BoardHeader/BoardHeader';

const BoardPage = () => {
  return (
    <main className="main">
      <div className="container flex-column">
        <BoardHeader />
        <ColumnList />
        <Space h={20} />
      </div>
      <ColumnModal />
    </main>
  );
};

export default BoardPage;
