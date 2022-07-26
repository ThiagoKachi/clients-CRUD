import React from 'react';
import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { ButtonAction } from '../Button';
import { useSearch } from '../../context/SearchContext';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import { usePostPutUser } from '../../context/PostPutContext';

export function SearchBar() {
  const { handleSearch, search, setSearch, onOpen } = useSearch();
  const { setIsEdit } = usePostPutUser();

  function handleCreateUser() {
    onOpen();
    setIsEdit(false);
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
        <ButtonAction
          title="Novo"
          icon={<AiOutlinePlus />}
          type="button"
          onclick={handleCreateUser}
        />
      </Flex>
    </Flex>
  );
}
