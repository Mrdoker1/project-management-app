import React, { memo } from 'react';
import { IconChevronLeft } from '@tabler/icons';
import { NavLink, useParams } from 'react-router-dom';
import { Text, NavLink as MantineNavLink, Loader } from '@mantine/core';
import cl from './BoardHeader.module.css';
import { useGetBoardQuery } from 'store/api/boards';
import { useTranslation } from 'react-i18next';

const BoardHeader = memo(() => {
  const { t } = useTranslation();
  const boardId = useParams<{ id: string }>().id;
  if (!boardId) throw new Error('Unable get id from url!');

  const { data: board, isLoading, error } = useGetBoardQuery(boardId);

  if (typeof error == 'number') return <div>{`${t('Ошибка ')} ${error}`}</div>;
  if (isLoading) return <Loader style={{ width: '100%' }} color="dark" />;
  if (!board) throw new Error('Board not found');

  return (
    <div className={cl.header}>
      <MantineNavLink
        classNames={navLinkClasses}
        component={NavLink}
        to="/projects"
        label={board.title}
        icon={<IconChevronLeft size={28} stroke={3} />}
      />
      <Text fz="md" fw={400}>
        {board.description}
      </Text>
    </div>
  );
});

const navLinkClasses = {
  root: cl.navlink,
  body: cl.navlinkBody,
  label: cl.navlinkLabel,
  icon: cl.navlinkIcon,
};

export default BoardHeader;
