import { Menu, Center, Header, Container, Group, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { memo, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import cl from './Header.module.css';
import { useStyles } from './HeaderStyles';
import logo from '../../assets/logo.svg';
import DrawerComponent from './Drawer/Drawer';
import LoginButtons from './LoginButtons/LoginButtons';
import MenuComponent from './Menu/Menu';
import i18n from 'i18n';

interface HeaderActionProps {
  links: {
    link: string;
    label: string;
    links?: { link: string; label: string }[];
  }[];
}

const HeaderAction = memo(({ links }: HeaderActionProps) => {
  const { classes } = useStyles();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [language, setLanguage] = useState('English');

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const menuItems = links.map((link) => {
    const items = link.links?.map((item) => (
      <Menu.Item key={item.link} onClick={() => setLanguage(item.label)}>
        {item.label}
      </Menu.Item>
    ));

    if (items) {
      return (
        <Menu key={link.label} trigger="hover" exitTransitionDuration={0}>
          <Menu.Target>
            <Center>
              <span className={classes.linkLabel}>{language}</span>
              {/* <IconChevronDown size={12} stroke={1.5} /> */}
            </Center>
          </Menu.Target>
          <Menu.Dropdown>{items}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <NavLink key={link.label} to={link.link} className={classes.link}>
        {link.label}
      </NavLink>
    );
  });

  return (
    <>
      <Header className={classes.header} height={64}>
        <Container size={1200} className={classes.inner}>
          <Group>
            <Burger
              color="#fff"
              opened={drawerOpened}
              onClick={toggleDrawer}
              className={classes.hiddenDesktop}
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
