import React, { useCallback } from 'react';
import { useGetBoardsQuery } from 'store/api/boards';
import { SimpleGrid, Button, Loader } from '@mantine/core';
import Board from './Board/Board';
import { IconPlus } from '@tabler/icons';
import cl from './BoardList.module.css';
import { actionType, setModalState, setModalType } from 'store/boardsSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useTranslation } from 'react-i18next';

const BoardList = () => {
  const { t } = useTranslation();
  const { data: boards, isLoading, error } = useGetBoardsQuery();
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.boards.search).toLowerCase();
  const createBoardHeandler = useCallback(() => {
    dispatch(setModalType(actionType.Create));
    dispatch(setModalState(true));
  }, []);

  if (typeof error == 'number') return <div>{`${t('Ошибка ')} ${error}`}</div>;
  if (isLoading) return <Loader style={{ width: '100%' }} color="dark" />;
  if (!boards) return <div>{t('Ничего не найдено!')}</div>;

  return (
    <>
      <div>
        <SimpleGrid
          cols={3}
          spacing="xl"
          breakpoints={[
            { maxWidth: 980, cols: 3, spacing: 'md' },
            { maxWidth: 755, cols: 2, spacing: 'sm' },
            { maxWidth: 600, cols: 1, spacing: 'sm' },
          ]}
        >
          {boards.map((board) => {
            if (
              board.description.toLowerCase().includes(search) ||
              board.title.toLowerCase().includes(search)
            ) {
              return <Board id={board._id} key={board._id} />;
            }
          })}
          <Button
            onClick={createBoardHeandler}
            radius={17}
            fullWidth={true}
            variant="outline"
            type="submit"
            leftIcon={<IconPlus />}
            classNames={ButtonClasses}
          >
            {t('Create Board')}
          </Button>
        </SimpleGrid>
      </div>
    </>
  );
};

const ButtonClasses = {
  input: cl.board,
  root: cl.gradientBorder,
};

export default BoardList;
