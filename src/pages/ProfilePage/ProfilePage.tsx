import {
  Avatar,
  Drawer,
  Flex,
  Title,
  Text,
  Group,
  Button,
  Loader,
  Accordion,
  TextInput,
} from '@mantine/core';
import React, { memo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import {
  setProfileMenuState,
  setProfileEditState,
  setProfileBoardsSearch,
} from 'store/profileMenuSlice';
import cl from './ProfilePage.module.css';
import ProfileModal from './ProfileModal/ProfileModal';
import { useGetBoardsByUserIdQuery } from 'store/api/boards';
import { useGetTasksSetQuery } from 'store/api/tasks';
import { t } from 'i18next';
import { IconSearch } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

const ProfilePage = memo(() => {
  const dispatch = useAppDispatch();
  const isOpened = useAppSelector((state) => state.profileMenu.profileIsOpened);
  const { _id, name, avatar } = useAppSelector((state) => state.profile);
  const { data: boards } = useGetBoardsByUserIdQuery(_id!);
  const { data: tasks, isLoading } = useGetTasksSetQuery({
    ids: [],
    userId: _id!,
    searchQuery: '',
  });
  const search = useAppSelector((state) => state.profileMenu.profileBoardSearch);
  const navigate = useNavigate();

  const taskClickHandler = useCallback((route: string) => {
    dispatch(setProfileMenuState(false));
    navigate(route);
  }, []);

  const closeMenuHandler = useCallback(() => {
    dispatch(setProfileMenuState(false));
    dispatch(setProfileEditState(false));
  }, []);

  const editModalHandler = useCallback(() => {
    dispatch(setProfileEditState(true));
  }, []);

  console.log(tasks, boards);

  if (!tasks || !boards) return <div>{t('Ничего не найдено!')}</div>;

  return (
    <>
      <Drawer
        opened={isOpened}
        onClose={closeMenuHandler}
        className="profile-drawer"
        zIndex={100}
        position="right"
        styles={() => ({
          closeButton: {
            color: '#fff',
          },
        })}
      >
        <div className="animated-background animated-background--centerRight"></div>

        <div className={cl.profileHeader}>
          <Flex gap={24} align="flex-end">
            <Avatar color="cyan" radius={100} size={100} src={avatar?.toString()}>
              {name?.slice(0, 2)}
            </Avatar>
            <Flex direction="column" gap={4}>
              <Title order={4} size={18}>
                {name}
              </Title>
              <Text size={12}>ID: {_id}</Text>
            </Flex>
          </Flex>
        </div>
        <Group style={{ marginBottom: 50 }}>
          <Button
            className={cl.button}
            variant="subtle"
            radius={8}
            sx={{ height: 45 }}
            onClick={editModalHandler}
          >
            {t('Edit Profile')}
          </Button>
          <Button className={cl.button} variant="subtle" radius={8} sx={{ height: 45 }}>
            {t('Change Avatar')}
          </Button>
        </Group>
        <Text align="center" size={18} color="#909296">
          {t('Your tasks')}
        </Text>
        {tasks.length === 0 ? (
          <Text align="center" size={14} color="#909296">
            {t('You have no assigned tasks')}
          </Text>
        ) : (
          <TextInput
            value={search}
            classNames={searchClasses}
            size="md"
            placeholder={`${t('Search Task...')}`}
            rightSection={<IconSearch size={20} stroke={1} />}
            onChange={(event) => {
              dispatch(setProfileBoardsSearch(event.target.value));
            }}
          />
        )}
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
              {isLoading ? (
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
                          if (board._id === task.boardId) {
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
      </Drawer>
      <ProfileModal />
    </>
  );
});

const searchClasses = { input: cl.searchInput, root: cl.searchInput, label: cl.searchInput };

export default ProfilePage;
