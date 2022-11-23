import { Menu, Center, Header, Container, Group, Burger } from '@mantine/core';
import { useDisclosure, useWindowEvent } from '@mantine/hooks';
import React, { memo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import cl from './Header.module.css';
import logo from '../../assets/logo.svg';
import DrawerComponent from './Drawer/Drawer';
import LoginButtons from './LoginButtons/LoginButtons';
import MenuComponent from './Menu/Menu';
import i18n from 'i18n';
import { IconChevronDown } from '@tabler/icons';
import { useTranslation } from 'react-i18next';
interface IHeaderProps {
  links: {
    link: string;
    label: string;
    links?: { link: string; label: string }[];
  }[];
}

const HeaderAction = memo(({ links }: IHeaderProps) => {
  const { t } = useTranslation();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [sticky, setSticky] = useState(false);
  const language = localStorage.getItem('i18nextLng') || 'English';

  const stickyHeader = sticky ? cl.sticky : '';
  const trackScroll = () => {
    setSticky(window.scrollY >= 120);
  };
  useWindowEvent('scroll', trackScroll);

  const handleChangeLang = (language: string) => {
    i18n.changeLanguage(language);
  };

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

    return (
      <NavLink key={link.label} to={link.link} className={cl.link}>
        {t(link.label)}
      </NavLink>
    );
  });

  return (
    <>
      <Header className={`${cl.header} ${stickyHeader}`} height={64}>
        <Container size={1200} className={cl.inner}>
          <Group>
            <Burger
              color="#fff"
              opened={drawerOpened}
              onClick={toggleDrawer}
              className={cl.hiddenDesktop}
            />
            <NavLink className={cl.logoWrapper} end to="/">
              <img src={logo} alt="Logo" />
              <h1 className={cl.logo}>RollingBoard</h1>
            </NavLink>
          </Group>
          <MenuComponent items={menuItems} />
          <LoginButtons />
        </Container>
      </Header>
      <DrawerComponent drawerOpened={drawerOpened} items={menuItems} closeDrawer={closeDrawer} />
    </>
  );
});

export default HeaderAction;
