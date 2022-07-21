import React from 'react';
import {
  Box,
  SimpleGrid,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react';

export function SkeletonLoading() {
  const skeletonLength = [1, 2, 3, 4];

  return (
    <SimpleGrid spacing={20} mt="14" pb="14" minChildWidth="240px">
      {skeletonLength.map((e, i) => (
        <div key={i}>
          <Box
            key={i}
            padding="8"
            pb="36"
            boxShadow="lg"
            bg="gray.700"
            w="320px"
            borderRadius={'6'}
          >
            <SkeletonCircle size="16" mb="20" m="auto" />
            <SkeletonText mt="14" noOfLines={4} spacing="6" />
          </Box>
        </div>
      ))}
    </SimpleGrid>
  );
}
