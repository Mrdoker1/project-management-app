import React, { useCallback } from 'react';
import { useGetBoardsQuery } from 'store/api/boards';
import { SimpleGrid, Button } from '@mantine/core';
import Board from './Board/Board';
import { IconPlus } from '@tabler/icons';
import cl from './BoardList.module.css';
import { actionType, setModal } from 'store/boardsSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

const BoardList = () => {
  const { data: boards, isLoading, error } = useGetBoardsQuery();
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.boards.modal);
  const createBoardHeandler = useCallback(() => {
    const emptyBoard = {
      _id: '',
      title: '',
      owner: '',
      users: [],
    };
    dispatch(setModal({ boardData: emptyBoard, state: true, type: actionType.Create }));
  }, []);

  if (typeof error == 'number') return <div>Ошибка {error}</div>;
  if (isLoading) return <div>Загрузка...</div>;
  if (!boards) return <div>Ничего не найдено!</div>;
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
          {boards.map((board) => (
            <Board id={board._id} key={board._id} />
          ))}
          <Button
            onClick={createBoardHeandler}
            radius={17}
            fullWidth={true}
            variant="outline"
            leftIcon={<IconPlus />}
            classNames={ButtonClasses}
          >
            Create Board
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
