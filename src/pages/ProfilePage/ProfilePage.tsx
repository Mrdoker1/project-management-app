import {
  Avatar,
  Drawer,
  Flex,
  ScrollArea,
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
import { t } from 'i18next';
import { IconSearch } from '@tabler/icons';

const ProfilePage = memo(() => {
  const dispatch = useAppDispatch();
  const isOpened = useAppSelector((state) => state.profileMenu.profileIsOpened);
  const { _id, name, avatar } = useAppSelector((state) => state.profile);
  const { data: boards, isLoading } = useGetBoardsByUserIdQuery(name!);
  const search = useAppSelector((state) => state.profileMenu.profileBoardSearch);

  const closeMenuHandler = useCallback(() => {
    dispatch(setProfileMenuState(false));
    dispatch(setProfileEditState(false));
  }, []);

  const editModalHandler = useCallback(() => {
    dispatch(setProfileEditState(true));
  }, []);

  if (!boards) return <div>{t('Ничего не найдено!')}</div>;

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
        <ScrollArea sx={{ height: 'calc(100vh - 60px)' }} mx="-md">
          <>
            <Text align="center" size={18} color="#909296">
              {t('Your boards')}
            </Text>
            {boards.length === 0 ? (
              <Text align="center" size={14} color="#909296">
                {t('You have no assigned tasks')}
              </Text>
            ) : (
              <TextInput
                value={search}
                classNames={searchClasses}
                size="md"
                placeholder={`${t('Search Board...')}`}
                rightSection={<IconSearch size={20} stroke={1} />}
                onChange={(event) => {
                  dispatch(setProfileBoardsSearch(event.target.value));
                }}
              />
            )}

            <Accordion className={cl.boardWrapper}>
              {isLoading ? (
                <Loader color="dark" />
              ) : (
                boards.map((board, index) => {
                  if (
                    board.description.toLowerCase().includes(search.toLowerCase()) ||
                    board.title.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return (
                      <Accordion.Item key={index} value={board.title} className={cl.boardItem}>
                        <Accordion.Control className={cl.boardTitle}>
                          {board.title}
                        </Accordion.Control>
                        <Accordion.Panel className={cl.boardDescription}>
                          {board.description}
                        </Accordion.Panel>
                      </Accordion.Item>
                    );
                  }
                })
              )}
            </Accordion>
          </>
        </ScrollArea>
      </Drawer>
      <ProfileModal />
    </>
  );
});

const searchClasses = { input: cl.searchInput, root: cl.searchInput, label: cl.searchInput };

export default ProfilePage;
