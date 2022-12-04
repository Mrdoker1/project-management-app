import React, { useCallback, useEffect } from 'react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { Accordion, Loader, Text } from '@mantine/core';
import { setProfileMenuState } from 'store/profileMenuSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useNavigate } from 'react-router-dom';
import { useLazyGetBoardsByUserIdQuery } from 'store/api/boards';
import { useLazyGetTasksSetQuery } from 'store/api/tasks';
import { t } from 'i18next';
import cl from './ProfileTasks.module.css';

function ProfileTasks() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const search = useAppSelector((state) => state.profileMenu.profileBoardSearch);
  const isOpened = useAppSelector((state) => state.profileMenu.profileIsOpened);
  const { _id } = useAppSelector((state) => state.profile);
  const [getBoards, { data: boards, isLoading: isBoardsLoading }] = useLazyGetBoardsByUserIdQuery();
  const [getTasks, { data: tasks }] = useLazyGetTasksSetQuery();

  const taskClickHandler = useCallback((route: string) => {
    dispatch(setProfileMenuState(false));
    navigate(route);
  }, []);

  useEffect(() => {
    getBoards(_id!);
    getTasks({ ids: [], userId: _id!, searchQuery: '' });
  }, [isOpened]);

  if (!tasks || !boards) return <div>{t('Ничего не найдено!')}</div>;

  return (
    <OverlayScrollbarsComponent
      defer
      options={{
        overflow: {
          y: 'scroll',
          x: 'hidden',
        },
      }}
    >
      <>
        <Accordion className={cl.boardWrapper}>
          {isBoardsLoading ? (
            <Loader color="dark" />
          ) : (
            boards.map((board, index) => {
              return (
                <Accordion.Item key={index} value={board.title} className={cl.boardItem}>
                  <Accordion.Control className={cl.boardTitle}>{board.title}</Accordion.Control>
                  {tasks.map((task, index) => {
                    if (
                      task.description.toLowerCase().includes(search.toLowerCase()) ||
                      task.title.toLowerCase().includes(search.toLowerCase())
                    ) {
                      if (board._id === task.boardId && task.userId === _id) {
                        return (
                          <Accordion.Panel
                            key={index}
                            className={cl.boardDescription}
                            onClick={() => taskClickHandler(`/projects/${board._id}`)}
                          >
                            <Text size={16} color="#fff">
                              {task.title}
                            </Text>
                            <Text size={14} color="#868E96">
                              {task.description}
                            </Text>
                          </Accordion.Panel>
                        );
                      }
                    }
                  })}
                </Accordion.Item>
              );
            })
          )}
        </Accordion>
      </>
    </OverlayScrollbarsComponent>
  );
}

export default ProfileTasks;
