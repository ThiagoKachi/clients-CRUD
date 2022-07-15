import React from 'react';
import { InfoIcon } from '@chakra-ui/icons';
import { Box, Heading, Text } from '@chakra-ui/react';

export function NotResultsFound() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <InfoIcon boxSize={'50px'} color={'blue.500'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Nenhum usuário encontrado!
      </Heading>
      <Text color={'gray.500'}>
        Tente fazer sua busca novamente com outros termos
      </Text>
    </Box>
  );
}
