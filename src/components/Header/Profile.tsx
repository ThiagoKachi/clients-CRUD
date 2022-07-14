import React from 'react';
import { Flex, Text, Box, Avatar } from '@chakra-ui/react';

export default function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Thiago Kachinsky</Text>
        <Text color="gray.300" fontSize="small">
          tjk091@gmail.com
        </Text>
      </Box>
      <Avatar
        size="md"
        name="Thiago Kachinsky"
        src="https://github.com/thiagokachi.png"
      />
    </Flex>
  );
}
