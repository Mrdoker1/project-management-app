import { Group } from '@mantine/core';
import React, { memo } from 'react';
import { useStyles } from '../HeaderStyles';

interface MenuProps {
  items: JSX.Element[];
}

const MenuComponent = memo(({ items }: MenuProps) => {
  const { classes } = useStyles();

  return (
    <Group spacing={15} className={classes.links}>
      {items}
    </Group>
  );
});

export default MenuComponent;
