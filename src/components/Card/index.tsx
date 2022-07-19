import React from 'react';
import { Heading, Avatar, Box, Text, Stack } from '@chakra-ui/react';
import { ButtonAction } from '../Button';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

type CardProps = {
  image: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  city: string;
};

export function Card({
  image,
  name,
  lastName,
  email,
  phone,
  city,
  state,
}: CardProps) {
  return (
    <Box
      maxW={'450px'}
      w={'320px'}
      bg={'gray.700'}
      boxShadow={'2xl'}
      rounded={'lg'}
      p={6}
      textAlign={'center'}
    >
      <Avatar
        size={'xl'}
        src={image}
        mb={4}
        pos={'relative'}
        _after={{
          content: '""',
          w: 4,
          h: 4,
          bg: 'green.300',
          border: '2px solid white',
          rounded: 'full',
          pos: 'absolute',
          bottom: 0,
          right: 3,
        }}
      />
      <Heading fontSize={'2xl'} fontFamily={'body'} color={'gray.300'} mb="1">
        {name} {lastName}
      </Heading>
      <Text fontWeight={600} color={'gray.400'} mb={4}>
        {email}
      </Text>
      <Stack mt={4} direction={'row'} spacing={2}>
        <Heading fontSize={'xl'} color={'gray.500'}>
          Telefone:
        </Heading>
        <Text color={'gray.300'} fontWeight="medium">
          {phone}
        </Text>
      </Stack>
      <Stack mt={4} direction={'row'} spacing={2}>
        <Heading fontSize={'xl'} color={'gray.500'}>
          Estado:
        </Heading>
        <Text color={'gray.300'} fontWeight="medium">
          {state}
        </Text>
      </Stack>
      <Stack mt={4} direction={'row'} spacing={2}>
        <Heading fontSize={'xl'} color={'gray.500'}>
          Cidade:
        </Heading>
        <Text color={'gray.300'} fontWeight="medium">
          {city}
        </Text>
      </Stack>

      <Stack mt={8} direction={'row'} spacing={4} ml="-2">
        <ButtonAction
          icon={<AiOutlineEdit />}
          type="button"
          title="Editar"
          color="green"
        />
        <ButtonAction
          icon={<AiOutlineDelete />}
          type="button"
          title="Excluir"
          color="red"
        />
      </Stack>
    </Box>
  );
}
