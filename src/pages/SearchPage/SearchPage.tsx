import React, { memo } from 'react';
import { TextInput, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { IconSearch } from '@tabler/icons';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import SearchResults from './SearchResults/SearchResults';
import { setSearchQuery } from 'store/searchSlice';

import cl from './SearchPage.module.css';

const SearchPage = memo(() => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.search.query);

  return (
    <main className="main page-search animated-background animated-background--topRight">
      <div className="container page-wrapper">
        <Title order={1} className={cl.pageTitle}>
          {t('Search')}
        </Title>
        <TextInput
          value={search}
          classNames={searchClasses}
          size="md"
          placeholder={`${t('Search Task...')}`}
          rightSection={<IconSearch size={20} stroke={1} />}
          onChange={(event) => dispatch(setSearchQuery(event.currentTarget.value))}
          autoComplete="off"
        />
        <>
          <SearchResults />
        </>
      </div>
    </main>
  );
});

export default SearchPage;

const searchClasses = {
  input: cl.searchInput,
  root: cl.searchWrapper,
  label: cl.searchInput,
};
