import { NavLink as MantineNavLink, Space, Text } from '@mantine/core';
import React from 'react';
import cl from './BoardPage.module.css';
import { useTranslation } from 'react-i18next';
import { IconChevronLeft } from '@tabler/icons';
import { NavLink } from 'react-router-dom';
import ColumnList from 'components/ColumnList/ColumnList';
import ColumnModal from './ColumnModal/ColumnModal';

const BoardPage = () => {
  const { t } = useTranslation();

  return (
    <main className="main">
      <ColumnModal />
      <div className="container">
        <Space h={40} />
        <div className={cl.header}>
          <MantineNavLink
            classNames={navLinkClasses}
            component={NavLink}
            to="/projects"
            label={t('Projects')}
            icon={<IconChevronLeft size={28} stroke={3} />}
          />
          <Text fz="md" fw={400}>
            {t(
              'Sets targets and objectives and actively works towards them, whilst raising the quality of the outcomes.'
            )}
          </Text>
        </div>
        <Space h={40} />
        <ColumnList />
        <Space h={40} />
      </div>
    </main>
  );
};

const navLinkClasses = {
  root: cl.navlink,
  body: cl.navlinkBody,
  label: cl.navlinkLabel,
  icon: cl.navlinkIcon,
};

export default BoardPage;
