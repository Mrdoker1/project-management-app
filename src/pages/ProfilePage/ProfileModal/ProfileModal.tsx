import React, { memo, useCallback, useEffect, useState } from 'react';
import { Modal, TextInput, Button, PasswordInput, Flex, FileInput } from '@mantine/core';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useForm } from '@mantine/form';
import users, { useUpdateUserMutation } from 'store/api/users';
import { useTranslation } from 'react-i18next';
import { setProfileEditState } from 'store/profileMenuSlice';
import { checkPassword, convertToBase64 } from 'utils/helpers';
import { setProfile } from 'store/profileSlice';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX, IconUpload } from '@tabler/icons';
import cl from './ProfileModal.module.css';

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

const ProfileModal = memo(() => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [updateUser] = useUpdateUserMutation();
  const [getUsers] = users.endpoints.getUsers.useLazyQuery();
  const dispatch = useAppDispatch();
  const isOpened = useAppSelector((state) => state.profileMenu.profileEditIsOpened);
  const { _id, login, name, avatar } = useAppSelector((state) => state.profile);

  const form = useForm<IForm>({
    initialValues,
    validate: (values) => ({
      name: values.name.length < 3 ? 'Too short name at least 3' : null,
      login: values.login.length < 3 ? 'Too short login at least 3' : null,
      password: checkPassword(values.password),
      avatar: values.avatar
        ? values.avatar.size / 1024 > 100
          ? 'File is too big'
          : null
        : 'Avatar required',
    }),
  });

  useEffect(() => {
    form.setValues({ login, name, _id });
  }, [login]);

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

        let avatarImg;
        if (values.avatar && typeof values.avatar !== null) {
          avatarImg = await convertToBase64(values.avatar).then((result) => {
            return result as string;
          });
        } else {
          avatarImg = avatar || name;
        }

        await updateUser({ ...values, avatar: avatarImg! }).unwrap();
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
        icon={<IconUpload size={14} />}
        accept=".png,.jpg,.jpeg"
        clearable={true}
        {...form.getInputProps('avatar')}
      />
      <PasswordInput
        classNames={passwordClasses}
        label={t('Password')}
        placeholder={`${t('New Password')}`}
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
      title={t('Edit Profile')}
    >
      {formComponent}
    </Modal>
  );
});

const initialValues: IForm = {
  _id: '',
  name: '',
  login: '',
  password: '',
  avatar: null,
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
