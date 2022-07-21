import React from 'react';
import { FormHelperText } from '@chakra-ui/react';

interface InputErrorProps {
  message: any;
}

export function InputError({ message }: InputErrorProps) {
  return (
    <FormHelperText color="red.400" ml="1">
      {message}
    </FormHelperText>
  );
}
