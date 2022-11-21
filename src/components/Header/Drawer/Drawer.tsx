import { Group, ScrollArea, Drawer, Button } from '@mantine/core';
import React, { memo } from 'react';
import { useStyles } from '../HeaderStyles';

interface DrawerComponentProps {
  items: JSX.Element[];
  drawerOpened: boolean;
  closeDrawer: () => void;
}

const DrawerComponent = memo(({ items, drawerOpened, closeDrawer }: DrawerComponentProps) => {
  const { classes } = useStyles();

  return (
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
  );
});

export default DrawerComponent;
