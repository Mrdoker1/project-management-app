import BoardList from 'components/BoardList/BoardList';
import React from 'react';
import { useGetBoardsQuery } from 'store/api/boards';
import { Input, Space } from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import cl from './BoardsPage.module.css';
import BoardsModal from 'pages/BoardsPage/BoardsModal/BoardsModal';
import { useGetUsersQuery } from 'store/api/users';

const BoardsPage = () => {
  const { data: boards } = useGetBoardsQuery();
  const {} = useGetUsersQuery();

  return (
    <main className="main">
      <BoardsModal />
      <div className="container">
        <div className={layoutClasses.heading}>
          <h1>Projects ({boards ? boards.length : 0})</h1>
          <Input
            classNames={searchClasses}
            component="input"
            size="md"
            placeholder="Search Board..."
            rightSection={<IconSearch size={20} stroke={1} />}
          />
        </div>
        <Space h={80} />
        <BoardList />
      </div>
    </main>
  );
};

const searchClasses = { input: cl.name, root: cl.inputWrapper, label: cl.label };
const layoutClasses = { heading: cl.heading };

export default BoardsPage;
