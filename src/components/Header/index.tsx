import React from 'react';
import { Flex } from '@chakra-ui/react';
import { Logo } from './Logo';
import Profile from './Profile';

export function Header() {
  return (
    <Flex
      as="header"
      align="center"
      direction="row"
      justify="space-between"
      w="100%"
    >
      <Logo />
      <Profile />
    </Flex>
  );
}
