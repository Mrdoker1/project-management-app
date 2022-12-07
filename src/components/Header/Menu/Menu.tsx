import { Group } from '@mantine/core';
import React, { memo } from 'react';
import cl from '../Header.module.css';

interface MenuProps {
  items: JSX.Element[];
}

const MenuComponent = memo(({ items }: MenuProps) => {
  return (
    <Group spacing={15} className={cl.links}>
      {items}
    </Group>
  );
});

export default MenuComponent;
