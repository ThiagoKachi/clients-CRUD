import React from 'react';
import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { ButtonAction } from '../Button';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';

export function SearchBar() {
  return (
    <Flex
      as="form"
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
          onChange={() => console.log('deu')}
          color="white"
        />
        <InputLeftElement pointerEvents="none" fontSize="24" mr="2">
          <AiOutlineSearch color="white" />
        </InputLeftElement>
      </InputGroup>
      <ButtonAction title="Buscar" icon={<AiOutlineSearch />} type="submit" />
      <ButtonAction title="Novo" icon={<AiOutlinePlus />} type="button" />
    </Flex>
  );
}
