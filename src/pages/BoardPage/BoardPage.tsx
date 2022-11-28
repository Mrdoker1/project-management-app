import { Space } from '@mantine/core';
import React from 'react';
import ColumnList from 'components/ColumnList/ColumnList';
import ColumnModal from './ColumnModal/ColumnModal';
import BoardHeader from './BoardHeader/BoardHeader';

const BoardPage = () => {
  return (
    <main className="main">
      <ColumnModal />
      <div className="container">
        <Space h={40} />
        <BoardHeader />
        <Space h={40} />
        <ColumnList />
        <Space h={20} />
      </div>
    </main>
  );
};

export default BoardPage;
