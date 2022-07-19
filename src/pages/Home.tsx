import React from 'react';
import { Header } from '../components/Header';
import { Flex } from '@chakra-ui/react';
import { SearchBar } from '../components/SearchBar';
import { CardList } from '../components/CardList';
import { useSearch } from '../context/SearchContext';

export function Home() {
  const {
    users,
    isLoading,
    error,
    loadingSearch,
    requestUsersError,
    isOpen,
    onClose,
  } = useSearch();

  return (
    <Flex
      w="100%"
      maxW={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      direction="column"
    >
      <Header />
      <SearchBar />
      <CardList
        results={users}
        isLoading={isLoading}
        error={error}
        loadingSearchFilter={loadingSearch}
        requestUsersError={requestUsersError}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Flex>
  );
}
