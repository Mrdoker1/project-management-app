import { Drawer, Flex } from '@mantine/core';
import React, { memo, useCallback } from 'react';
import cl from '../Header.module.css';
import sidebarLogo from '../../../assets/sidebar-logo.svg';
import rsLogo from '../../../assets/rs-logo.svg';
import LoginButtons from '../LoginButtons/LoginButtons';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setMenuState } from 'store/menuSlice';

interface DrawerComponentProps {
  items: JSX.Element[];
}

const DrawerComponent = memo(({ items }: DrawerComponentProps) => {
  const dispatch = useAppDispatch();
  const isOpened = useAppSelector((state) => state.menu.isOpened);

  const closeMenuHandler = useCallback(() => {
    dispatch(setMenuState(false));
  }, []);

  return (
    <Drawer
      opened={isOpened}
      onClose={closeMenuHandler}
      padding="md"
      title={<img src={sidebarLogo} />}
      className={`${cl.hiddenDesktop} ${cl.menuDrawer}`}
      zIndex={1000000}
      styles={() => ({
        closeButton: {
          color: '#fff',
        },
      })}
    >
      <div className={cl.drawerMenuWrapper}>
        <div className={cl.drawerMenu}>{items}</div>
        <Flex gap={12} justify="center">
          <LoginButtons />
        </Flex>
        <div className={cl.drawerFooter}>
          <div className={cl.footerTop}>
            <a href="https://rs.school/">
              <img src={rsLogo} className={cl.logo} alt="RSschool" />
            </a>
          </div>
          <div className={cl.footerCopyright}>
            © 2022. <a href="https://rs.school/react/">React 2022Q1</a>
          </div>
        </div>
      </div>
    </Drawer>
  );
});

export default DrawerComponent;
