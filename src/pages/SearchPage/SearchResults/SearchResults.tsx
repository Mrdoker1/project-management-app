import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { memo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setProfileMenuState } from 'store/profileMenuSlice';
import { Loader, Text, SimpleGrid, Button, Title } from '@mantine/core';
import { useLazyGetTasksSetQuery } from 'store/api/tasks';
import { useDebouncedValue } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';

import cl from './SearchResults.module.css';

const SearchResults = memo(() => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [getTasks, { data: tasks, isFetching }] = useLazyGetTasksSetQuery();
  const search = useAppSelector((state) => state.search.query);
  const [debounced] = useDebouncedValue(search, 400);

  useEffect(() => {
    if (debounced.length === 0) return;
    getTasks({ ids: [], userId: '', searchQuery: search }, true);
  }, [debounced]);

  const taskClickHandler = useCallback((route: string) => {
    dispatch(setProfileMenuState(false));
    navigate(route);
  }, []);

  if (isFetching) {
    return <Loader style={{ width: '100%', margin: '50px 0' }} color="dark" />;
  }

  if (debounced.length === 0) {
    return (
      <Title order={3} color="#fff" ta="center">
        {t('Enter your search query')}
      </Title>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <Title order={3} color="#fff" ta="center">
        {t('Didn`t not found')}
      </Title>
    );
  }

  return (
    <div className={cl.boardWrapper}>
      <>
        <SimpleGrid
          cols={3}
          spacing="xl"
          breakpoints={[
            { maxWidth: 980, cols: 3, spacing: 'md' },
            { maxWidth: 755, cols: 2, spacing: 'sm' },
            { maxWidth: 600, cols: 1, spacing: 'sm' },
            { minWidth: 981, cols: 4, spacing: 'md' },
          ]}
          className={cl.resultsWrapper}
        >
          {tasks.map((task, index) => {
            return (
              <div key={index} className={cl.resultItem}>
                <Text size={16} color="#fff">
                  {task.title}
                </Text>

                <Text size={14} color="#868E96">
                  {task.description}
                </Text>
                <Button
                  className={cl.button}
                  mt="sm"
                  onClick={() => taskClickHandler(`/projects/${task.boardId}`)}
                >
                  {t('Open Board')}
                </Button>
              </div>
            );
          })}
        </SimpleGrid>
      </>
    </div>
  );
});

export default SearchResults;
