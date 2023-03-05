import HeaderAction from 'components/Header/Header';
import React, { memo } from 'react';
import { default as headerLinks } from '../Header/Header.json';
import { Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from 'hooks/redux';
import Footer from 'components/Footer/Footer';
import { motion } from 'framer-motion';

const Layout = memo(() => {
  const token = useAppSelector((state) => state.auth.token);
  const { pathname } = useLocation();

  return (
    <>
      <HeaderAction links={token ? headerLinks['links-auth'] : headerLinks.links} />
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        variants={{
          initial: {
            opacity: 0,
          },
          in: {
            opacity: 1,
          },
          out: {
            opacity: 0,
          },
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0.45 }}
        className="center-wrapper"
      >
        <Outlet></Outlet>
      </motion.div>
      <Footer />
    </>
  );
});

export default Layout;
