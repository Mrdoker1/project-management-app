import React, { memo, useCallback, useEffect } from 'react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { Loader, Text, TextInput } from '@mantine/core';
import { setProfileBoardsSearch, setProfileMenuState } from 'store/profileMenuSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useNavigate } from 'react-router-dom';
import { useLazyGetTasksSetQuery } from 'store/api/tasks';
import { t } from 'i18next';
import cl from './ProfileTasks.module.css';
import { IconSearch } from '@tabler/icons';

const ProfileTasks = memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const search = useAppSelector((state) => state.profileMenu.profileBoardSearch);
  const isOpened = useAppSelector((state) => state.profileMenu.profileIsOpened);
  const { _id, name } = useAppSelector((state) => state.profile);
  const [getTasks, { data: tasks, isLoading, isFetching }] = useLazyGetTasksSetQuery();

  const taskClickHandler = useCallback((route: string) => {
    dispatch(setProfileMenuState(false));
    navigate(route);
  }, []);

  useEffect(() => {
    if (!isOpened) return;
    if (name) getTasks({ ids: [], userId: '', searchQuery: name.toUpperCase() });
  }, [isOpened]);

  if (isLoading || isFetching) {
    return <Loader style={{ width: '100%', margin: '50px 0' }} color="dark" />;
  }

  if (!tasks || tasks.length === 0) {
    return (
      <>
        <Text align="center" size={14} color="#909296">
          {t('You have no assigned tasks')}
        </Text>
      </>
    );
  }

  return (
    <>
      <TextInput
        value={search}
        classNames={searchClasses}
        size="md"
        placeholder={`${t('Search Task...')}`}
        rightSection={<IconSearch size={20} stroke={1} />}
        onChange={(event) => {
          dispatch(setProfileBoardsSearch(event.target.value));
        }}
        autoComplete="off"
      />
      <>
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
            <div className={cl.boardWrapper}>
              {isLoading || isFetching ? (
                <Loader style={{ width: '100%', margin: '50px 0' }} color="dark" />
              ) : (
                tasks.map((task, index) => {
                  if (
                    task.description.toLowerCase().includes(search.toLowerCase()) ||
                    task.title.toLowerCase().includes(search.toLowerCase())
                  ) {
                    if (task.users.includes(_id!)) {
                      return (
                        <div key={index} className={cl.boardItem}>
                          <div
                            key={index}
                            className={cl.boardDescription}
                            onClick={() => taskClickHandler(`/projects/${task.boardId}`)}
                          >
                            <Text size={16} color="#fff">
                              {task.title}
                            </Text>
                            <Text size={14} color="#868E96">
                              {task.description}
                            </Text>
                          </div>
                        </div>
                      );
                    }
                  }
                })
              )}
            </div>
          </>
        </OverlayScrollbarsComponent>
      </>
    </>
  );
});

export default ProfileTasks;

const searchClasses = {
  input: cl.searchInput,
  root: cl.searchWrapper,
  label: cl.searchInput,
};
