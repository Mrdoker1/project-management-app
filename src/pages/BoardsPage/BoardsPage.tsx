import BoardList from 'components/BoardList/BoardList';
import React from 'react';
import { useGetBoardsQuery } from 'store/api/boards';
import { Space, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import cl from './BoardsPage.module.css';
import BoardsModal from 'pages/BoardsPage/BoardsModal/BoardsModal';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setBoardsSearch } from 'store/boardsSlice';
import { useTranslation } from 'react-i18next';

const BoardsPage = () => {
  const { t } = useTranslation();
  const { data: boards } = useGetBoardsQuery();
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.boards.search);

  return (
    <main className="main">
      <BoardsModal />
      <div className="container">
        <Space h={40} />
        <div className={layoutClasses.heading}>
          <h1>
            {t('Projects')} ({boards ? boards.length : 0})
          </h1>
          <TextInput
            value={search}
            onChange={(event) => {
              dispatch(setBoardsSearch(event.target.value));
            }}
            classNames={searchClasses}
            size="md"
            placeholder={`${t('Search Board...')}`}
            rightSection={<IconSearch size={20} stroke={1} />}
          />
        </div>
        <BoardList />
        <Space h={40} />
      </div>
    </main>
  );
};

const searchClasses = { input: cl.name, root: cl.inputWrapper, label: cl.label };
const layoutClasses = { heading: cl.heading };

export default BoardsPage;
