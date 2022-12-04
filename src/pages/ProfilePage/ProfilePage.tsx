import { Avatar, Drawer, Flex, Title, Text, Group, Button } from '@mantine/core';
import React, { memo, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setProfileMenuState, setProfileEditState } from 'store/profileMenuSlice';
import ProfileModal from './ProfileModal/ProfileModal';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';
import { openConfirmModal } from '@mantine/modals';
import { IconX, IconCheck } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
import { setToken } from 'store/authSlice';
import { api } from 'store/api';
import { clearProfile } from 'store/profileSlice';
import { useDeleteUserMutation } from 'store/api/users';
import cl from './ProfilePage.module.css';
import ProfileTasks from './ProfileTasks/ProfileTasks';

interface IError {
  data: {
    statusCode: number;
    message: string;
  };
}

const ProfilePage = memo(() => {
  const dispatch = useAppDispatch();
  const [isDeleted, setIsDeleted] = useState(false);
  const isOpened = useAppSelector((state) => state.profileMenu.profileIsOpened);
  const { _id, name, avatar } = useAppSelector((state) => state.profile);

  const [deleteUser] = useDeleteUserMutation();

  const navigate = useNavigate();

  const closeMenuHandler = useCallback(() => {
    dispatch(setProfileMenuState(false));
    dispatch(setProfileEditState(false));
  }, []);

  const editModalHandler = useCallback(() => {
    dispatch(setProfileEditState(true));
  }, []);

  const deleteProfileHandler = () => {
    openConfirmModal({
      title: t('Delete Profile'),
      modalId: 'deleteProfile',
      centered: true,
      className: cl.deleteModal,
      children: <Text size="sm">{t('Are you sure you want to delete your profile?')}</Text>,
      labels: { confirm: t('Delete'), cancel: t('Cancel') },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        try {
          setIsDeleted(true);
          await deleteUser(_id!);
          dispatch(setToken(''));
          dispatch(clearProfile);
          dispatch(api.util.resetApiState());
          dispatch(setProfileMenuState(false));
          dispatch(setProfileEditState(false));
          navigate('/');
          showNotification({
            title: 'Success',
            message: 'Profile delete',
            color: 'teal',
            icon: <IconCheck size={18} />,
            styles: () => ({
              root: { backgroundColor: '#101113', border: '1px solid #343A40' },
              title: { color: '#fff' },
              description: { color: '#fff' },
            }),
          });
        } catch (err) {
          const error = err as IError;
          showNotification({
            title: `Error ${error.data.statusCode}`,
            message: `${error.data.message}`,
            color: 'red',
            icon: <IconX size={18} />,
            styles: () => ({
              root: { backgroundColor: '#101113', border: '1px solid #343A40' },
              title: { color: '#fff' },
              description: { color: '#fff' },
            }),
          });
        }
        setIsDeleted(false);
      },
    });
  };

  return (
    <>
      <Drawer
        opened={isOpened}
        onClose={closeMenuHandler}
        className="profile-drawer"
        zIndex={100}
        position="right"
        withFocusReturn={true}
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
          <Button
            className={cl.button}
            variant="subtle"
            radius={8}
            loaderPosition="center"
            loading={isDeleted}
            sx={{ height: 45 }}
            onClick={deleteProfileHandler}
          >
            {t('Delete Profile')}
          </Button>
        </Group>
        <Text align="center" size={18} color="#909296">
          {t('Your tasks')}
        </Text>

        <ProfileTasks />
      </Drawer>
      <ProfileModal />
    </>
  );
});

export default ProfilePage;
