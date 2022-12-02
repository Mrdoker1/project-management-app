import React, { useCallback, useState } from 'react';
import { Modal, TextInput, Button, PasswordInput, Text, Flex, FileInput } from '@mantine/core';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useForm } from '@mantine/form';
import users, { useDeleteUserMutation, useUpdateUserMutation } from 'store/api/users';
import { useTranslation } from 'react-i18next';
import { setProfileEditState, setProfileMenuState } from 'store/profileMenuSlice';
import { checkPassword, convertToBase64 } from 'utils/helpers';
import { clearProfile, setProfile } from 'store/profileSlice';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons';
import cl from './ProfileModal.module.css';
import { openConfirmModal } from '@mantine/modals';
import { api } from 'store/api';
import { setToken } from 'store/authSlice';
import { useNavigate } from 'react-router-dom';

interface IError {
  data: {
    statusCode: number;
    message: string;
  };
}

interface IForm {
  _id: string;
  name: string;
  login: string;
  password: string;
  avatar: File | null;
}

const ProfileModal = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [getUsers] = users.endpoints.getUsers.useLazyQuery();
  const dispatch = useAppDispatch();
  const isOpened = useAppSelector((state) => state.profileMenu.profileEditIsOpened);
  const { _id, login, name, avatar } = useAppSelector((state) => state.profile);
  const stateAvatar = avatar;
  const navigate = useNavigate();

  const form = useForm<IForm>({
    initialValues: {
      _id: _id!,
      name: name!,
      login: login!,
      password: '',
      avatar: null,
    },
    validate: (values) => ({
      name: values.name.length < 3 ? 'Too short name at least 3' : null,
      login: values.login.length < 3 ? 'Too short login at least 3' : null,
      password: checkPassword(values.password),
      avatar: values.avatar ? (values.avatar.size / 1024 > 100 ? 'File is too big' : null) : null,
    }),
  });

  const sendForm = useCallback(
    async (values: {
      _id: string;
      name: string;
      login: string;
      password: string;
      avatar: File | null;
    }) => {
      try {
        setIsLoading(true);

        let avatar;
        if (values.avatar) {
          avatar = await convertToBase64(values.avatar).then((result) => {
            return result as string;
          });
        } else {
          avatar = stateAvatar || name;
        }

        await updateUser({ ...values, avatar: avatar! }).unwrap();
        const data = await getUsers().unwrap();
        const user = data.find((user) => user.login === values.login);
        if (!user) throw new Error('User not exists!');
        await dispatch(setProfile(user));

        showNotification({
          title: 'Success',
          message: 'Profile update',
          color: 'teal',
          icon: <IconCheck size={18} />,

          styles: () => ({
            root: { backgroundColor: '#101113', border: '1px solid #343A40' },
            title: { color: '#fff' },
            description: { color: '#fff' },
          }),
        });
      } catch (err) {
        setIsLoading(false);
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
      setIsLoading(false);
    },
    []
  );

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
            color: 'red',
            icon: <IconX size={18} />,
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
      },
    });
  };

  const formComponent = (
    <form className={cl.form} onSubmit={form.onSubmit(sendForm)}>
      <TextInput
        classNames={inputClasses}
        label={t('Login')}
        placeholder={t('Login')}
        {...form.getInputProps('login')}
      />
      <TextInput
        classNames={inputClasses}
        label={t('Name')}
        placeholder={t('Name')}
        {...form.getInputProps('name')}
      />
      <FileInput
        label={t('Avatar')}
        classNames={inputClasses}
        placeholder={`${t('Change Avatar')}`}
        accept=".png,.jpg,.jpeg"
        clearable={true}
        {...form.getInputProps('avatar')}
      />
      <PasswordInput
        classNames={passwordClasses}
        label={t('Password')}
        {...form.getInputProps('password')}
        autoComplete="current-password"
      />
      <Flex gap={8}>
        <Button
          className={cl.submit}
          loading={isLoading}
          loaderPosition="center"
          type="submit"
          mt="sm"
        >
          {t('Accept Changes')}
        </Button>
        <Button
          className={cl.submit}
          loaderPosition="center"
          mt="sm"
          color="red"
          onClick={deleteProfileHandler}
        >
          {t('Delete profile')}
        </Button>
      </Flex>
    </form>
  );

  return (
    <Modal
      centered
      opened={isOpened}
      onClose={() => {
        dispatch(setProfileEditState(false));
      }}
      title="Edit Profile"
    >
      {formComponent}
    </Modal>
  );
};

const inputClasses = { input: cl.name, root: cl.inputWrapper, label: cl.label };
const passwordClasses = {
  input: cl.password,
  root: cl.inputWrapper,
  label: cl.label,
  innerInput: cl.innerInput,
  rightSection: cl.rightSection,
  visibilityToggle: cl.visibilityToggle,
};

export default ProfileModal;
