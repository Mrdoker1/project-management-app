import {
  createStyles,
  Menu,
  Center,
  Header,
  Container,
  Group,
  Button,
  Burger,
  Drawer,
  ScrollArea,
  Box,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { api } from 'store/api';
import { setToken } from 'store/authSlice';
import cl from './Header.module.css';

const Logo = () => (
  <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="3.79412" cy="3.74407" r="3.29412" fill="#50ADBB" />
    <circle cx="3.79412" cy="11.65" r="3.29412" fill="#50ADBB" fillOpacity="0.6" />
    <ellipse cx="3.79412" cy="19.5558" rx="3.29412" ry="3.29412" fill="#50ADBB" fillOpacity="0.3" />
    <ellipse cx="11.7" cy="3.74407" rx="3.29412" ry="3.29412" fill="#50ADBB" fillOpacity="0.01" />
    <ellipse cx="11.7" cy="11.65" rx="3.29412" ry="3.29412" fill="#50ADBB" fillOpacity="0.9" />
    <ellipse cx="11.7" cy="19.5558" rx="3.29412" ry="3.29412" fill="#50ADBB" fillOpacity="0.6" />
    <circle cx="19.6059" cy="3.74407" r="3.29412" fill="#50ADBB" fillOpacity="0.01" />
    <circle cx="19.6059" cy="11.65" r="3.29412" fill="#50ADBB" fillOpacity="0.01" />
    <ellipse cx="19.6059" cy="19.5558" rx="3.29412" ry="3.29412" fill="#50ADBB" />
  </svg>
);

const HEADER_HEIGHT = 64;

const useStyles = createStyles((theme) => ({
  header: {
    background: '#000',
    borderBottom: '1px solid #25262B',
  },

  inner: {
    height: HEADER_HEIGHT,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.md,
    fontWeight: 600,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

interface HeaderActionProps {
  links: { link: string; label: string; links?: { link: string; label: string }[] }[];
}

export function HeaderAction({ links }: HeaderActionProps) {
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  function clickHandler(e: React.MouseEvent) {
    e.preventDefault();
    dispatch(setToken(''));
    dispatch(api.util.resetApiState());
  }

  const { classes } = useStyles();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" exitTransitionDuration={0}>
          <Menu.Target>
            <NavLink to={link.link} className={classes.link}>
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                {/* <IconChevronDown size={12} stroke={1.5} /> */}
              </Center>
            </NavLink>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <>
        <NavLink to={link.link} className={classes.link}>
          {link.label}
        </NavLink>
      </>
    );
  });

  return (
    <Box>
      <Header className={classes.header} height={HEADER_HEIGHT}>
        <Container size={1200} className={classes.inner}>
          <Group>
            <Burger
              color="#fff"
              opened={drawerOpened}
              onClick={toggleDrawer}
              className={classes.hiddenDesktop}
            />
            <NavLink className={cl.logoWrapper} end to="/">
              <Logo />
              <h1 className={cl.logo}>RollingBoard</h1>
            </NavLink>
          </Group>
          <Group spacing={15} className={classes.links}>
            {items}
          </Group>
          {token ? (
            <Group spacing={10} className={classes.hiddenMobile}>
              <Link to="/" onClick={clickHandler}>
                <Button
                  className="button button--subtle"
                  variant="subtle"
                  radius={8}
                  sx={{ height: 39 }}
                >
                  Sign Out
                </Button>
              </Link>
            </Group>
          ) : (
            <Group spacing={10} className={classes.hiddenMobile}>
              <Link to="/login">
                <Button
                  className="button button--subtle"
                  variant="subtle"
                  radius={8}
                  sx={{ height: 39 }}
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  className="button button--outline"
                  radius={8}
                  variant="outline"
                  sx={{ height: 39 }}
                >
                  Sign up
                </Button>
              </Link>
            </Group>
          )}
        </Container>
      </Header>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: 'calc(100vh - 60px)' }} mx="-md">
          <Group spacing={5}>{items}</Group>
          <Group position="center" grow pb="xl" px="md">
            <Button>Log in</Button>
            <Button variant="outline">Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
