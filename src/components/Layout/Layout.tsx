import HeaderAction from 'components/Header/Header';
import React, { memo } from 'react';
import { default as headerLinks } from '../Header/Header.json';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from 'hooks/redux';
import { selectToken } from 'store/authSlice';
import Footer from 'components/Footer/Footer';

const Layout = memo(() => {
  const token = useAppSelector(selectToken);
  return (
    <>
      <HeaderAction links={token ? headerLinks['links-auth'] : headerLinks.links} />
      <main>
        <Outlet></Outlet>
      </main>
      <Footer />
    </>
  );
});

export default Layout;
