import React, { useEffect } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { useUsersInfinit } from '../../services/hooks/useUsers';

export function Pagination() {
  const { hasNextPage, fetchNextPage } = useUsersInfinit();

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;

    if (bottom) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Flex margin="auto" pb="8">
      <Text color={'blue.300'} fontWeight="bold" fontSize={'lg'}>
        {hasNextPage ? 'Carregando usuários..' : 'Não existem mais usuários'}
      </Text>
    </Flex>
  );
}
