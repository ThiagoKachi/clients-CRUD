import React, { FormEvent, useEffect, useState } from 'react';
import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { ButtonAction } from '../Button';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import { CardList } from '../CardList';
import { UsersProps } from '../../models/users';
import { useUsers } from '../../services/hooks/useUsers';
import { api } from '../../services/api';

export function SearchBar() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<UsersProps[] | undefined>([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [requestUsersError, setRequestUsersError] = useState(false);

  const { data, isLoading, error, isFetching } = useUsers();

  useEffect(() => {
    setUsers(data);
  }, [data]);

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    setLoadingSearch(true);
    try {
      const response = await api.get(`/users?name_like=${search}`);
      setUsers(response.data);
      setRequestUsersError(false);
    } catch (err) {
      setRequestUsersError(true);
      console.log(err);
    } finally {
      setLoadingSearch(false);
    }
  }

  return (
    <Flex direction="column">
      <Flex
        as="form"
        onSubmit={handleSearch}
        flex="1"
        w="100%"
        color="gray.700"
        position="relative"
        bg="gray.800"
        borderRadius="full"
        mt="14"
        ml="0"
      >
        <InputGroup>
          <Input
            type="text"
            placeholder="Buscar usuário"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            color="white"
          />
          <InputLeftElement pointerEvents="none" fontSize="24" mr="2">
            <AiOutlineSearch color="white" />
          </InputLeftElement>
        </InputGroup>
        <ButtonAction title="Buscar" icon={<AiOutlineSearch />} type="submit" />
        <ButtonAction title="Novo" icon={<AiOutlinePlus />} type="button" />
      </Flex>
      <CardList
        results={users}
        isLoading={isLoading}
        error={error}
        loadingSearchFilter={loadingSearch}
        requestUsersError={requestUsersError}
      />
    </Flex>
  );
}
