import { Menu, Center, Header, Container, Group, Burger } from '@mantine/core';
import { useWindowEvent } from '@mantine/hooks';
import React, { memo, useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import cl from './Header.module.css';
import logo from '../../assets/logo.svg';
import DrawerComponent from './Drawer/Drawer';
import LoginButtons from './LoginButtons/LoginButtons';
import MenuComponent from './Menu/Menu';
import i18n from 'i18n';
import { IconChevronDown } from '@tabler/icons';
import { t } from 'i18next';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setMenuState } from 'store/menuSlice';
import { setLang } from 'store/settingsSlice';
import { setProfileMenuState } from 'store/profileMenuSlice';
interface IHeaderProps {
  links: {
    link: string;
    label: string;
    links?: { link: string; label: string }[];
  }[];
}

const HeaderAction = memo(({ links }: IHeaderProps) => {
  const dispatch = useAppDispatch();
  const isOpened = useAppSelector((state) => state.menu.isOpened);
  const language = useAppSelector((state) => state.settings.lang);
  const [sticky, setSticky] = useState(false);
  const stickyHeader = sticky ? cl.sticky : '';

  const trackScroll = useCallback(() => {
    setSticky(window.scrollY > 120);
  }, []);
  useWindowEvent('scroll', trackScroll);

  const handleChangeLang = useCallback((lng: string) => {
    dispatch(setLang(lng));
    i18n.changeLanguage(lng);
  }, []);

  const openMenuHandler = useCallback(() => {
    dispatch(setMenuState(true));
  }, []);

  const openProfileHandler = useCallback(() => {
    dispatch(setMenuState(false));
    dispatch(setProfileMenuState(true));
  }, []);

  const closeMenuHandler = useCallback(() => {
    dispatch(setMenuState(false));
  }, []);

  const menuItems = links.map((link) => {
    const items = link.links?.map((item) => (
      <Menu.Item key={item.link} onClick={() => handleChangeLang(item.label)}>
        {item.label}
      </Menu.Item>
    ));

    if (items) {
      return (
        <Menu key={link.label} trigger="hover" exitTransitionDuration={0}>
          <Menu.Target>
            <Center>
              <span className={cl.linkLabel}>{language}</span>
              <IconChevronDown size={12} stroke={1.5} />
            </Center>
          </Menu.Target>
          <Menu.Dropdown>{items}</Menu.Dropdown>
        </Menu>
      );
    }

    if (link.label === 'Profile') {
      return (
        <span key={link.label} className={cl.link} onClick={openProfileHandler}>
          {t(link.label)}
        </span>
      );
    } else {
      return (
        <NavLink key={link.label} to={link.link} className={cl.link} onClick={closeMenuHandler}>
          {t(link.label)}
        </NavLink>
      );
    }
  });

  return (
    <>
      <Header className={`${cl.header} ${stickyHeader}`} height={64}>
        <Container size={1920} className={cl.inner}>
          <Group>
            <Burger
              color="#fff"
              opened={isOpened}
              onClick={openMenuHandler}
              className={cl.hiddenDesktop}
            />
            <NavLink className={cl.logoWrapper} end to="/">
              <img src={logo} alt="Logo" />
              <h1 className={cl.logo}>RollingBoard</h1>
            </NavLink>
          </Group>
          <MenuComponent items={menuItems} />
          <Group spacing={10} className={cl.hiddenMobile}>
            <LoginButtons />
          </Group>
        </Container>
      </Header>
      <DrawerComponent items={menuItems} />
    </>
  );
});

export default HeaderAction;
